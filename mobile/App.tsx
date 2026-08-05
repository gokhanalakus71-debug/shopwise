import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography, Radius } from "./theme";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

    <View style={styles.content}>
      <Text style={styles.title}>ShopWise</Text>

      <Text style={styles.subtitle}>
        Smart shopping powered by science and AI
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Version 1</Text>
      </View>
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
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    marginTop: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  badge: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
  },
  badgeText: {
    fontSize: Typography.caption,
    fontWeight: Typography.weightMedium,
    color: Colors.textPrimary,
  },
});