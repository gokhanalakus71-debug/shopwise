import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Radius, Shadows, Spacing, Typography } from "../theme";
import PrimaryButton from "./PrimaryButton";

type Props = {
  title: string;
  description: string;
  primaryTitle: string;
  secondaryTitle: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
};

export default function ActionCard({
  title,
  description,
  primaryTitle,
  secondaryTitle,
  onPrimaryPress,
  onSecondaryPress,
}: Props) {
  return (
    <View style={styles.card}>
      <Ionicons
        name="camera-outline"
        size={42}
        color={Colors.primary}
      />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <PrimaryButton
        title={primaryTitle}
        onPress={onPrimaryPress}
      />

      <View style={styles.spacing} />

      <PrimaryButton
        title={secondaryTitle}
        onPress={onSecondaryPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: "center",
    ...Shadows.card,
  },

  title: {
    marginTop: Spacing.md,
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  description: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: Typography.body,
  },

  spacing: {
    height: Spacing.md,
  },
});