import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from "../theme";

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
        name="search-outline"
        size={46}
        color={Colors.primary}
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <PrimaryButton
        title={primaryTitle}
        onPress={onPrimaryPress}
      />

      <View style={styles.divider}>
        <View style={styles.line} />

        <Text style={styles.or}>OR</Text>

        <View style={styles.line} />
      </View>

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
    marginBottom: Spacing.lg,
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: Typography.body,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.lg,
    width: "100%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  or: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
    fontSize: Typography.small,
    fontWeight: Typography.weightMedium,
  },
});