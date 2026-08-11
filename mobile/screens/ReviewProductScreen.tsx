import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors, Spacing, Typography } from "../theme";
import PrimaryButton from "../components/PrimaryButton";
import ProcessingOverlay from "../components/ProcessingOverlay";
import ReviewService from "../services/ReviewService";
import OCRService from "../services/OCRService";

import {
  AppNavigation,
  RootStackParamList,
} from "../navigation/AppNavigator";

export default function ReviewProductScreen() {
  const navigation = useNavigation<AppNavigation>();

  const route =
    useRoute<
      import("@react-navigation/native").RouteProp<
        RootStackParamList,
        "ReviewProduct"
      >
    >();

  const {
    profiles = [],
    healthConsiderations = [],
    mode,
  } = route.params ?? {};

  const [imageUri, setImageUri] =
    useState<string | null>(null);

  const [isProcessing, setIsProcessing] =
    useState(false);

  async function processImage(uri: string) {
    setImageUri(uri);
    setIsProcessing(true);

    try {
      const ocr =
        await OCRService.extractText(uri);

      if (!ocr.success) {
        setIsProcessing(false);
        return;
      }

      const review =
        await ReviewService.review({
          ingredients: ocr.text,
          people: profiles,
          healthConsiderations,
        });

      setIsProcessing(false);

      navigation.navigate("Result", {
        verdict: review.verdict,
        summary: review.summary,
        profiles,
        healthConsiderations,
      });
    } catch (error) {
      console.error(
        "Product review error:",
        error
      );

      setIsProcessing(false);
    }
  }

  async function handleTakePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

    if (result.canceled) {
      return;
    }

    await processImage(
      result.assets[0].uri
    );
  }

  async function handleChooseFromGallery() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

    if (result.canceled) {
      return;
    }

    await processImage(
      result.assets[0].uri
    );
  }

  useEffect(() => {
    if (mode === "camera") {
      handleTakePhoto();
    }

    if (mode === "gallery") {
      handleChooseFromGallery();
    }
  }, [mode]);

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

      <ProcessingOverlay
        visible={isProcessing}
      />
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