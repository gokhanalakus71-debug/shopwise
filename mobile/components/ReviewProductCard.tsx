import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Shadows, Spacing, Typography } from "../theme";

type Props = {
  onPress?: () => void;
};

export default function ReviewProductCard({ onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📷</Text>
      </View>

      <Text style={styles.title}>Review Product</Text>

      <Text style={styles.subtitle}>
        Take a photo of the{"\n"}ingredients list
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    ...Shadows.card,
  },

  iconContainer: {
    marginBottom: Spacing.lg,
  },

  icon: {
    fontSize: 56,
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    textAlign: "center",
    fontSize: Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});