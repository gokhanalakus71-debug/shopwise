import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  getOfferings,
  purchasePremium,
  restorePurchases,
  getCustomerInfo,
  isPremium,
} from "../services/subscription/subscriptionService";

import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Premium"
>;

export default function PremiumScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [premium, setPremium] = useState(false);
  const [offering, setOffering] = useState<any>(null);

  useEffect(() => {
    loadPremium();
  }, []);

  async function loadPremium() {
    try {
      const customerInfo = await getCustomerInfo();
      setPremium(isPremium(customerInfo));

      const currentOffering = await getOfferings();
      setOffering(currentOffering);
    } catch (error) {
      console.error("Premium loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase() {
    if (!offering) {
      Alert.alert(
        "Premium unavailable",
        "The Premium subscription is currently unavailable."
      );
      return;
    }

    try {
      setPurchasing(true);

      const customerInfo = await purchasePremium(offering);

      const active = isPremium(customerInfo);
      setPremium(active);

      if (active) {
        Alert.alert(
          "Welcome to ShopWise Premium!",
          "Your Premium subscription is now active."
        );
      }
    } catch (error: any) {
      if (!error?.userCancelled) {
        Alert.alert(
          "Purchase unsuccessful",
          error?.message || "Unable to complete the purchase."
        );
      }
    } finally {
      setPurchasing(false);
    }
  }

  async function handleRestore() {
    try {
      setPurchasing(true);

      const customerInfo = await restorePurchases();
      const active = isPremium(customerInfo);

      setPremium(active);

      if (active) {
        Alert.alert(
          "Purchase restored",
          "Your ShopWise Premium subscription is active."
        );
      } else {
        Alert.alert(
          "No Premium subscription found",
          "We could not find an active Premium purchase."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Restore unsuccessful",
        error?.message || "Unable to restore purchases."
      );
    } finally {
      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading ShopWise Premium...
        </Text>
      </View>
    );
  }

  const monthlyPackage = offering?.monthly;
  const price =
    monthlyPackage?.product?.priceString || "$9.99";

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛍️</Text>

      <Text style={styles.title}>ShopWise Premium</Text>

      {premium ? (
        <>
          <Text style={styles.activeTitle}>
            Premium is active
          </Text>

          <Text style={styles.description}>
            You have full access to ShopWise Premium.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Get more from ShopWise with Premium.
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              ShopWise Premium
            </Text>

            <Text style={styles.price}>
              {price}
              <Text style={styles.period}> / month</Text>
            </Text>

            <Text style={styles.feature}>
              ✓ AI-powered product reviews
            </Text>

            <Text style={styles.feature}>
              ✓ Personalized recommendations
            </Text>

            <Text style={styles.feature}>
              ✓ Health consideration analysis
            </Text>
          </View>

          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handlePurchase}
            disabled={purchasing}
          >
            {purchasing ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.subscribeText}>
                Subscribe
              </Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.restoreButton}
        onPress={handleRestore}
        disabled={purchasing}
      >
        <Text style={styles.restoreText}>
          Restore Purchases
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
  },

  icon: {
    fontSize: 48,
    marginBottom: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
  },

  activeTitle: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: "700",
    color: "#16803c",
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 23,
  },

  card: {
    width: "100%",
    marginTop: 28,
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#f5f7f5",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
  },

  price: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: "700",
    color: "#16803c",
  },

  period: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666666",
  },

  feature: {
    marginTop: 16,
    fontSize: 15,
    color: "#333333",
  },

  subscribeButton: {
    width: "100%",
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#16803c",
    alignItems: "center",
  },

  subscribeText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },

  restoreButton: {
    marginTop: 22,
    padding: 10,
  },

  restoreText: {
    color: "#16803c",
    fontSize: 15,
    fontWeight: "600",
  },

  backButton: {
    marginTop: 8,
    padding: 10,
  },

  backText: {
    color: "#777777",
    fontSize: 15,
  },
});
