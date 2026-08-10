import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../theme";
import PrimaryButton from "../components/PrimaryButton";
import ReviewService, {
  ReviewResponse,
} from "../services/ReviewService";
import OCRService from "../services/OCRService";
import ProcessingOverlay from "../components/ProcessingOverlay";

export default function ReviewProductScreen() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [review, setReview] = useState<ReviewResponse | null>(null);

  function resetReview() {
    setReview(null);
  }

  async function processImage(uri: string) {
    setReview(null);
    setIsProcessing(true);

    try {
      const ocr = await OCRService.extractText(uri);

      if (!ocr.success) {
        return;
      }

      const result = await ReviewService.review({
        ingredients: ocr.text,
        people: ["Me"],
        healthConsiderations: ["Pregnancy"],
      });

      setReview(result);
    } catch (error) {
      console.error("Review error:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleTakePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    await processImage(result.assets[0].uri);
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

    await processImage(result.assets[0].uri);
  }

  const verdict = review?.verdict?.toUpperCase() ?? "";

  const isGood = verdict === "RECOMMENDED";
  const isCaution = verdict === "NOT RECOMMENDED";

  const statusLabel = isGood
    ? "Looks Good"
    : isCaution
      ? "Be Cautious"
      : "Worth Considering";

  const statusColor = isGood
    ? Colors.success
    : isCaution
      ? Colors.danger
      : Colors.warning;

  return (
    <SafeAreaView style={styles.container}>
      {!review ? (
        <View style={styles.captureContent}>
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
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.resultContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.resultTitle}>
            Product Review
          </Text>

          <View
            style={[
              styles.statusCard,
              { borderColor: statusColor },
            ]}
          >
            <Text
              style={[
                styles.statusLabel,
                { color: statusColor },
              ]}
            >
              {statusLabel}
            </Text>

            <Text style={styles.statusSubtitle}>
              Based on your considerations, if any
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Why?
            </Text>

            {review.summary.map((item, index) => (
              <View
                key={`${item}-${index}`}
                style={styles.summaryRow}
              >
                <Text
                  style={[
                    styles.summaryBullet,
                    { color: statusColor },
                  ]}
                >
                  •
                </Text>

                <Text style={styles.summaryText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Review Another Product"
              onPress={resetReview}
            />
          </View>
        </ScrollView>
      )}

      <ProcessingOverlay visible={isProcessing} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  captureContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  title: {
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    textAlign: "center",
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

  resultContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  resultTitle: {
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  statusCard: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
  },

  statusLabel: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    textAlign: "center",
  },

  statusSubtitle: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: Typography.body,
    textAlign: "center",
    lineHeight: 22,
  },

  section: {
    marginTop: Spacing.xl,
  },

  sectionTitle: {
    fontSize: Typography.subheading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },

  summaryBullet: {
    fontSize: 22,
    lineHeight: 23,
    marginRight: Spacing.sm,
  },

  summaryText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.body,
    lineHeight: 24,
  },

  buttonContainer: {
    marginTop: "auto",
    paddingTop: Spacing.xl,
    alignItems: "center",
  },
});
