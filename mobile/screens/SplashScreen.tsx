import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "../theme";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ShopWise</Text>
      <Text style={styles.subtitle}>
        Smart shopping powered by science and AI
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: 12,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
});