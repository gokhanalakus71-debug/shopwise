import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing, Typography } from "../theme";
import AppTextInput from "../components/AppTextInput";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import AuthService from "../services/AuthService";

import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../navigation/AppNavigator";

export default function LoginScreen() {
  const navigation = useNavigation<AppNavigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert(
        "Login",
        "Please enter your email and password."
      );
      return;
    }

    setIsLoading(true);

    try {
      await AuthService.login(
        trimmedEmail,
        password
      );

      navigation.navigate("Home");
    } catch (error: any) {
      console.error(
        "Login error:",
        error
      );

      let message =
        "We couldn't sign you in. Please try again.";

      if (
        error?.code === "auth/invalid-credential" ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/user-not-found"
      ) {
        message =
          "The email or password is incorrect.";
      } else if (
        error?.code === "auth/invalid-email"
      ) {
        message =
          "Please enter a valid email address.";
      }

      Alert.alert(
        "Login",
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
          Welcome Back
        </Text>

        <Text style={styles.subtitle}>
          Sign in to continue
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
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
        />

        <PrimaryButton
          title={
            isLoading
              ? "Logging In..."
              : "Login"
          }
          onPress={handleLogin}
        />

        <Pressable
          onPress={() =>
            Alert.alert(
              "Coming Next",
              "Password reset will be connected in the next authentication step."
            )
          }
        >
          <Text style={styles.link}>
            Forgot Password?
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate("Register")
          }
        >
          <Text style={styles.link}>
            Create Account
          </Text>
        </Pressable>
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
