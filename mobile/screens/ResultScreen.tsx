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
  const navigation = useNavigation<AppNavigation>();

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

  const isNotRecommended =
    verdict === "NOT RECOMMENDED";

  const title = isRecommended
    ? "Looks Good"
    : isNotRecommended
    ? "Be Cautious"
    : "Worth Considering";

  const indicator = isRecommended
    ? "🟢"
    : isNotRecommended
    ? "🔴"
    : "🟠";

  const titleColor = isRecommended
    ? Colors.success
    : isNotRecommended
    ? Colors.danger
    : Colors.warning;

  const contextText =
    "Based on the information we could read from the product image.";

  async function handleShare() {
    try {
      const shareMessage = [
        `ShopWise — ${title}`,
        "",
        "Why?",
        "",
        ...summary.map((item) => `• ${item}`),
      ].join("\n");

      await Share.share({
        message: shareMessage,
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
            {contextText}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.heading}>
            Why?
          </Text>

          <View style={styles.reasonList}>
            {summary.length > 0 ? (
              summary.map((item, index) => (
                <View
                  key={`${item}-${index}`}
                  style={styles.reasonRow}
                >
                  <Text
                    style={[
                      styles.reasonBullet,
                      {
                        color: titleColor,
                      },
                    ]}
                  >
                    •
                  </Text>

                  <Text style={styles.reasonText}>
                    {item}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.reasonText}>
                ShopWise could not provide a detailed
                explanation for this result.
              </Text>
            )}
          </View>

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
    marginBottom: Spacing.md,
  },

  reasonList: {
    gap: Spacing.md,
  },

  reasonRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  reasonBullet: {
    width: 20,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    lineHeight: 24,
  },

  reasonText: {
    flex: 1,
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