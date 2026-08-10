import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../theme";

import {
  AppNavigation,
  RootStackParamList,
} from "../navigation/AppNavigator";

export default function ResultScreen() {
  const navigation =
    useNavigation<AppNavigation>();

  const route =
    useRoute<
      import("@react-navigation/native").RouteProp<
        RootStackParamList,
        "Result"
      >
    >();

  const { verdict, summary } = route.params;

  const isRecommended =
    verdict === "RECOMMENDED";

  const isCautious =
    verdict === "NOT RECOMMENDED";

  const title = isRecommended
    ? "Looks Good"
    : isCautious
    ? "Be Cautious"
    : "Worth Considering";

  const indicator = isRecommended
    ? "🟢"
    : isCautious
    ? "🔴"
    : "🟠";

  const titleColor = isRecommended
    ? Colors.success
    : isCautious
    ? Colors.danger
    : Colors.warning;

  const whyText = summary
    .map((item) => `• ${item}`)
    .join("\n\n");

  async function handleShare() {
    try {
      await Share.share({
        message: `ShopWise — Why?\n\n${whyText}`,
      });
    } catch (error) {
      Alert.alert(
        "Unable to Share",
        "We couldn't open the sharing options."
      );
    }
  }

  function handleReviewAnother() {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.resultCard,
            {
              borderColor: titleColor,
            },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.verdict,
                {
                  color: titleColor,
                },
              ]}
            >
              {indicator} {title}
            </Text>

            <Text style={styles.context}>
              Based on your considerations, if any
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.heading}>
            Why?
          </Text>

          <Text style={styles.why}>
            {whyText}
          </Text>

          <Pressable
            style={[
              styles.shareButton,
              {
                backgroundColor: titleColor,
              },
            ]}
            onPress={handleShare}
          >
            <Text style={styles.shareButtonText}>
              Share
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.reviewButton}
          onPress={handleReviewAnother}
        >
          <Text style={styles.reviewButtonText}>
            Review Another Product
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  resultCard: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },

  header: {
    alignItems: "flex-start",
  },

  verdict: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    marginBottom: Spacing.sm,
  },

  context: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  heading: {
    fontSize: Typography.subheading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  why: {
    fontSize: Typography.body,
    lineHeight: 24,
    color: Colors.textSecondary,
  },

  shareButton: {
    marginTop: Spacing.lg,
    minHeight: 52,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
  },

  reviewButton: {
    marginTop: Spacing.lg,
    minHeight: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },

  reviewButtonText: {
    color: "#FFFFFF",
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
  },
});