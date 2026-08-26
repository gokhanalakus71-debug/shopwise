import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Spacing, Typography } from "../theme";
import { AppNavigation } from "../navigation/AppNavigator";
import {
  getCustomerInfo,
  isPremium,
} from "../services/subscription/subscriptionService";

export default function BottomNavigation() {
  const navigation = useNavigation<AppNavigation>();
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    async function checkPremium() {
      try {
        const customerInfo = await getCustomerInfo();
        setPremium(isPremium(customerInfo));
      } catch (error) {
        console.error("Premium status check failed:", error);
      }
    }

    checkPremium();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.item}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.activeText}>Home</Text>
      </Pressable>

      {!premium && (
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate("Premium")}
        >
          <Text style={styles.icon}>⭐</Text>
          <Text style={styles.text}>Premium</Text>
        </Pressable>
      )}

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
