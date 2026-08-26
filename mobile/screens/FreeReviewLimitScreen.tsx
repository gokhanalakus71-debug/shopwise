import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AppNavigation } from "../navigation/AppNavigator";

export default function FreeReviewLimitScreen() {
  const navigation =
    useNavigation<AppNavigation>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/free-review-limit.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable
        accessibilityLabel="View Premium"
        style={styles.premiumButton}
        onPress={() =>
          navigation.navigate("Premium")
        }
      />

      <Pressable
        accessibilityLabel="Maybe Later"
        style={styles.laterButton}
        onPress={() =>
          navigation.navigate("Home")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  premiumButton: {
    position: "absolute",
    left: "16%",
    right: "16%",
    top: "70.5%",
    height: "7.5%",
  },

  laterButton: {
    position: "absolute",
    left: "16%",
    right: "16%",
    top: "77.5%",
    height: "7.5%",
  },
});
