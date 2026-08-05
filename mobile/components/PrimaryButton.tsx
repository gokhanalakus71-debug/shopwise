import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../theme";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
  },
});