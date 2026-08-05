import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing, Typography } from "../theme";
import AppTextInput from "../components/AppTextInput";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../navigation/AppNavigator";

export default function LoginScreen() {
  const navigation = useNavigation<AppNavigation>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>🛍️</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>

        <AppTextInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
        />

        <PrimaryButton
          title="Login"
          onPress={() => navigation.navigate("Home")}
        />

        <Text style={styles.link}>
          Forgot Password?
        </Text>

        <Text style={styles.link}>
          Create Account
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
    textAlign: "center",
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  link: {
    marginTop: Spacing.md,
    textAlign: "center",
    color: Colors.primary,
    fontSize: Typography.caption,
  },
});