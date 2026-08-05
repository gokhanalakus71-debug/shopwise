import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing, Typography } from "../theme";
import AppTextInput from "../components/AppTextInput";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🛍️</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue using ShopWise
        </Text>

        <AppTextInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <AppTextInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />

        <PrimaryButton title="Login" />

        <Text style={styles.forgotPassword}>
          Forgot Password?
        </Text>
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
    padding: Spacing.lg,
  },
  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: Spacing.lg,
    textAlign: "center",
    color: Colors.primary,
    fontSize: Typography.caption,
  },
});