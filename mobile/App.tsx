import { useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { initializeSubscriptions } from "./services/subscription/subscriptionService";

export default function App() {
  useEffect(() => {
    initializeSubscriptions().catch((error) => {
      console.error("RevenueCat initialization failed:", error);
    });
  }, []);

  return <AppNavigator />;
}