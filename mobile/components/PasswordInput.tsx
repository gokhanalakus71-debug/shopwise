import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../theme";

type Props = {
  label: string;
  placeholder: string;
};

export default function PasswordInput({
  label,
  placeholder,
}: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={hidden}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
        />

        <Pressable onPress={() => setHidden(!hidden)}>
          <Text style={styles.show}>
            {hidden ? "Show" : "Hide"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.sm,
    color: Colors.textPrimary,
    fontSize: Typography.caption,
    fontWeight: Typography.weightMedium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: 54,
    color: Colors.textPrimary,
    fontSize: Typography.body,
  },
  show: {
    color: Colors.primary,
    fontWeight: Typography.weightBold,
  },
});