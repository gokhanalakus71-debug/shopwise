import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import { Colors, Spacing, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

export default function ReviewProductScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function handleTakePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Camera Permission",
        "ShopWise needs camera access to review product ingredients."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Review Product</Text>

        <Text style={styles.subtitle}>
          Take a clear photo of the ingredients list.
        </Text>

        <PrimaryButton
          title="Take Photo"
          onPress={handleTakePhoto}
        />

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.preview}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    textAlign: "center",
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  preview: {
    marginTop: Spacing.xl,
    width: 250,
    height: 350,
    borderRadius: 12,
  },
});