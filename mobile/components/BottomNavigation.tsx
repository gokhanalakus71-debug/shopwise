import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../theme";

export default function BottomNavigation() {
  return (
    <View style={styles.container}>

      <Pressable style={styles.item}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.activeText}>Home</Text>
      </Pressable>

      <Pressable style={styles.item}>
        <Text style={styles.icon}>📜</Text>
        <Text style={styles.text}>History</Text>
      </Pressable>

      <Pressable style={styles.item}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.text}>Account</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  item: {
    alignItems: "center",
  },

  icon: {
    fontSize: 22,
    marginBottom: 4,
  },

  text: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
  },

  activeText: {
    fontSize: Typography.small,
    color: Colors.primary,
    fontWeight: Typography.weightBold,
  },
});