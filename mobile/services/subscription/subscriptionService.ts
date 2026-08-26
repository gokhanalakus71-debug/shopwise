import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";
import { Platform } from "react-native";

const ENTITLEMENT_ID = "shopwise_premium";

export async function initializeSubscriptions(): Promise<void> {
  const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_TEST_KEY;

  if (!apiKey) {
    console.warn("RevenueCat API key is not configured.");
    return;
  }

  await Purchases.configure({
    apiKey,
  });
}

export async function identifyRevenueCatUser(
  uid: string
): Promise<CustomerInfo> {
  const result = await Purchases.logIn(uid);
  return result.customerInfo;
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  const offerings = await Purchases.getOfferings();
  return offerings.current ?? null;
}

export async function purchasePremium(
  offering: PurchasesOffering
): Promise<CustomerInfo> {
  const packageToPurchase =
    offering.monthly ??
    offering.availablePackages[0];

  if (!packageToPurchase) {
    throw new Error("No Premium subscription package is available.");
  }

  const result = await Purchases.purchasePackage(packageToPurchase);
  return result.customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  return await Purchases.restorePurchases();
}

export async function getCustomerInfo(): Promise<CustomerInfo> {
  return await Purchases.getCustomerInfo();
}

export function isPremium(customerInfo: CustomerInfo): boolean {
  return Boolean(
    customerInfo.entitlements.active[ENTITLEMENT_ID]
  );
}
