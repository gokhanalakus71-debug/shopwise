import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { Colors, Radius, Spacing, Typography } from "../theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.welcome}>Welcome to ShopWise</Text>

        <Text style={styles.title}>
          Ready to review a product?
        </Text>

        <Text style={styles.sectionTitle}>
          Review this product for
        </Text>

        <View style={styles.profileContainer}>

          <Pressable style={styles.selectedChip}>
            <Text style={styles.selectedChipText}>✓ Me</Text>
          </Pressable>

          <Pressable style={styles.chip}>
            <Text style={styles.chipText}>Child 1</Text>
          </Pressable>

          <Pressable style={styles.chip}>
            <Text style={styles.chipText}>Pregnancy</Text>
          </Pressable>

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
    padding: Spacing.lg,
  },

  welcome: {
    marginTop: Spacing.lg,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  title: {
    marginTop: Spacing.sm,
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  sectionTitle: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  selectedChip: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Radius.round,
  },

  chip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: Radius.round,
  },

  selectedChipText: {
    color: "#FFFFFF",
    fontWeight: Typography.weightBold,
  },

  chipText: {
    color: Colors.textPrimary,
    fontWeight: Typography.weightMedium,
  },
});