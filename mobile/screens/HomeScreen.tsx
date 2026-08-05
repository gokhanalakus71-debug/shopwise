import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing, Typography } from "../theme";
import SelectionChip from "../components/SelectionChip";

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

        <Text style={styles.groupTitle}>People</Text>

        <View style={styles.chipContainer}>
          <SelectionChip title="Me" selected />
          <SelectionChip title="Child 1" />
          <SelectionChip title="Husband" />
        </View>

        <Text style={styles.groupTitle}>
          Health considerations
        </Text>

        <View style={styles.chipContainer}>
          <SelectionChip title="Pregnancy" />
          <SelectionChip title="Gluten Intolerance" />
          <SelectionChip title="+ Add" />
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

  groupTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    fontSize: Typography.caption,
    fontWeight: Typography.weightBold,
    color: Colors.textSecondary,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.md,
  },
});