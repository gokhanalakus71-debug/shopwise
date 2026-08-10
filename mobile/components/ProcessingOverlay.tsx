import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Typography } from "../theme";

type Props = {
  visible: boolean;
};

export default function ProcessingOverlay({ visible }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.characters}>🐝  🐜  🐇</Text>

          <Text style={styles.title}>
            We're working on it..!
          </Text>

          <Text style={styles.subtitle}>
            Our little helpers are checking the ingredients for you.
          </Text>

          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.spinner}
          />

          <Text style={styles.wait}>
            Just a moment...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  card: {
    width: "88%",
    maxWidth: 360,
    backgroundColor: Colors.background,
    borderRadius: 24,
    padding: Spacing.xl,
    alignItems: "center",
  },

  characters: {
    fontSize: 42,
    marginBottom: Spacing.md,
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    textAlign: "center",
  },

  subtitle: {
    marginTop: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },

  spinner: {
    marginTop: Spacing.lg,
  },

  wait: {
    marginTop: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
});
