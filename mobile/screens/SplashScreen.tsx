import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
    paddingHorizontal: 24,
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
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 40,
    width: "80%",
  },
});