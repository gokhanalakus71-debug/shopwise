import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius, Spacing, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>🛍️</Text>

      <Text style={styles.title}>ShopWise</Text>

      <Text style={styles.subtitle}>
        Smart shopping powered by science and AI
      </Text>

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Get Started" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    fontSize: 72,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
  },
});