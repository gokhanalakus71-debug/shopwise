import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ReviewProductScreen from "../screens/ReviewProductScreen";
import AddProfileScreen from "../screens/AddProfileScreen";
import AddHealthConsiderationScreen from "../screens/AddHealthConsiderationScreen";

export type RootStackParamList = {
  Welcome: undefined;

  Login: undefined;

  Home: {
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
  };

  ReviewProduct: undefined;

  AddProfile: {
    profile?: string;
  };

  AddHealthConsideration: {
    consideration?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="ReviewProduct"
          component={ReviewProductScreen}
        />

        <Stack.Screen
          name="AddProfile"
          component={AddProfileScreen}
        />

        <Stack.Screen
          name="AddHealthConsideration"
          component={AddHealthConsiderationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type AppNavigation =
  NativeStackNavigationProp<RootStackParamList>;