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
import ReviewService from "../services/ReviewService";
import OCRService from "../services/OCRService";

export default function ReviewProductScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function processImage(uri: string) {
    setImageUri(uri);

    try {
      const ocr = await OCRService.extractText(uri);

      const review = await ReviewService.review({
        ingredients: ocr.text,
        people: ["Me"],
        healthConsiderations: ["Pregnancy"],
      });

      Alert.alert(
        review.verdict,
        review.summary.join("\n")
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Connection Error",
        "Unable to review this product."
      );
    }
  }

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

    if (result.canceled) return;

    await processImage(result.assets[0].uri);
  }

  async function handleChooseFromGallery() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Photo Library Permission",
        "ShopWise needs access to your photos to review product ingredients."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

    if (result.canceled) return;

    await processImage(result.assets[0].uri);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Review Product
        </Text>

        <Text style={styles.subtitle}>
          Take a clear photo of the ingredients list.
        </Text>

        <PrimaryButton
          title="Take Photo"
          onPress={handleTakePhoto}
        />

        <View style={styles.gap} />

        <PrimaryButton
          title="Choose from Gallery"
          onPress={handleChooseFromGallery}
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

  gap: {
    height: Spacing.md,
  },

  preview: {
    marginTop: Spacing.xl,
    width: 250,
    height: 350,
    borderRadius: 12,
  },
});