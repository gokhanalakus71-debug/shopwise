import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Alert,
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

import PrimaryButton from "../components/PrimaryButton";

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

  const {
    verdict,
    summary,
    profiles,
    healthConsiderations,
  } = route.params;

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
    .join("\n");

  async function handleShareWhy() {
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
      <View style={styles.content}>
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
            Based on your considerations, if any
          </Text>

          {profiles.length > 0 && (
            <>
              <Text style={styles.heading}>
                For
              </Text>

              <Text style={styles.item}>
                {profiles.join(" • ")}
              </Text>
            </>
          )}

          {healthConsiderations.length > 0 && (
            <>
              <Text style={styles.heading}>
                Considerations
              </Text>

              <Text style={styles.item}>
                {healthConsiderations.join(" • ")}
              </Text>
            </>
          )}

          <Text style={styles.heading}>
            Why?
          </Text>

          <Text style={styles.why}>
            {whyText}
          </Text>

          <View style={styles.shareContainer}>
            <PrimaryButton
              title="Copy / Share Why"
              onPress={handleShareWhy}
            />
          </View>
        </View>

        <View style={styles.reviewAgain}>
          <PrimaryButton
            title="Review Another Product"
            onPress={handleReviewAnother}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
  },

  resultCard: {
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
    marginBottom: Spacing.md,
  },

  heading: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  item: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  why: {
    fontSize: Typography.body,
    lineHeight: 24,
    color: Colors.textSecondary,
  },

  shareContainer: {
    marginTop: Spacing.lg,
  },

  reviewAgain: {
    marginTop: Spacing.lg,
  },
});