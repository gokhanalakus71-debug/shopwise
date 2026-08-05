import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../theme";

type Props = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function SelectionChip({
  title,
  selected = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.selectedContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {selected ? "✓ " : ""}
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.round,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  selectedContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  text: {
    color: Colors.textPrimary,
    fontSize: Typography.body,
    fontWeight: Typography.weightMedium,
  },

  selectedText: {
    color: "#FFFFFF",
    fontWeight: Typography.weightBold,
  },
});