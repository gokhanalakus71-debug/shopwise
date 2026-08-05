import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

export default function ResultScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.verdict}>
          🟢 Recommended
        </Text>

        <Text style={styles.heading}>
          Suitable for
        </Text>

        <Text style={styles.item}>✓ Me</Text>
        <Text style={styles.item}>✓ Pregnancy</Text>

        <Text style={styles.heading}>
          Why?
        </Text>

        <Text style={styles.item}>
          • Pregnancy-safe ingredients
        </Text>

        <Text style={styles.item}>
          • Low irritation risk
        </Text>

        <Text style={styles.item}>
          • Contains fragrance
        </Text>

        <PrimaryButton
          title="Review Another Product"
        />

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

  verdict: {
    fontSize: 34,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },

  heading: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  item: {
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
});