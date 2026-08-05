import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Colors, Typography } from "../theme";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
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
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
});