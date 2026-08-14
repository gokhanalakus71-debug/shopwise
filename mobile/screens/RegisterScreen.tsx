import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import AppTextInput from "../components/AppTextInput";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

import AuthService from "../services/AuthService";

import { Colors, Spacing, Typography } from "../theme";
import { AppNavigation } from "../navigation/AppNavigator";

export default function RegisterScreen() {
  const navigation = useNavigation<AppNavigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !confirmPassword) {
      Alert.alert(
        "Create Account",
        "Please complete all fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Create Account",
        "Passwords do not match."
      );
      return;
    }

    setIsLoading(true);

    try {
      await AuthService.register(
        trimmedEmail,
        password
      );

      Alert.alert(
        "Account Created",
        "Your ShopWise account has been created.",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.navigate("Home"),
          },
        ]
      );
    } catch (error: any) {
      console.error(
        "Registration error:",
        error
      );

      let message =
        "We couldn't create your account. Please try again.";

      if (error?.code === "auth/email-already-in-use") {
        message =
          "An account with this email already exists.";
      } else if (
        error?.code === "auth/invalid-email"
      ) {
        message =
          "Please enter a valid email address.";
      } else if (
        error?.code === "auth/weak-password"
      ) {
        message =
          "Your password is too weak. Please choose a stronger password.";
      }

      Alert.alert(
        "Create Account",
        message
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🛍️</Text>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Create your ShopWise account
        </Text>

        <AppTextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <PrimaryButton
          title={
            isLoading
              ? "Creating Account..."
              : "Create Account"
          }
          onPress={handleRegister}
        />

        <Text
          style={styles.link}
          onPress={() =>
            navigation.navigate("Login")
          }
        >
          Already have an account? Login
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
    marginTop: Spacing.lg,
    textAlign: "center",
    color: Colors.primary,
    fontSize: Typography.caption,
  },
});
