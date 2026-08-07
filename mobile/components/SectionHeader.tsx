import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
  icon: string;
  title: string;
};

export default function SectionHeader({
  icon,
  title,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  icon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },

  title: {
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },
});