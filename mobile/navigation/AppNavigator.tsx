import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ResultScreen from "../screens/ResultScreen";
import AddProfileScreen from "../screens/AddProfileScreen";
import AddHealthConsiderationScreen from "../screens/AddHealthConsiderationScreen";
import PremiumScreen from "../screens/PremiumScreen";
import FreeReviewLimitScreen from "../screens/FreeReviewLimitScreen";

export type RootStackParamList = {
  Welcome: undefined;

  Login: undefined;

  Register: undefined;

  Home:
    | {
        newProfile?: string;
        editedProfile?: {
          oldName: string;
          newName: string;
        };
        newHealthConsideration?: string;
        editedHealthConsideration?: {
          oldName: string;
          newName: string;
        };
      }
    | undefined;

  Result: {
    verdict: "RECOMMENDED" | "MIXED" | "NOT RECOMMENDED";
    summary: string[];
    profiles: string[];
    healthConsiderations: string[];
  };

  AddProfile: {
    profile?: string;
  };

  AddHealthConsideration: {
    consideration?: string;
  };

  Premium: undefined;

  FreeReviewLimit: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
        />

        <Stack.Screen
          name="AddProfile"
          component={AddProfileScreen}
        />

        <Stack.Screen
          name="AddHealthConsideration"
          component={AddHealthConsiderationScreen}
        />

        <Stack.Screen
          name="Premium"
          component={PremiumScreen}
        />

        <Stack.Screen
          name="FreeReviewLimit"
          component={FreeReviewLimitScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type AppNavigation =
  NativeStackNavigationProp<RootStackParamList>;