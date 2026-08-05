import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

export default function ReviewProductScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>
          Review Product
        </Text>

        <Text style={styles.subtitle}>
          Take a clear photo of the ingredients list.
        </Text>

        <PrimaryButton title="Open Camera" />

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
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    textAlign: "center",
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
});