import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors, Spacing, Typography } from "../theme";
import {
  AppNavigation,
  RootStackParamList,
} from "../navigation/AppNavigator";

import BottomNavigation from "../components/BottomNavigation";
import SelectionChip from "../components/SelectionChip";
import SectionHeader from "../components/SectionHeader";
import ActionCard from "../components/ActionCard";
import ProcessingOverlay from "../components/ProcessingOverlay";

import ReviewService from "../services/ReviewService";
import OCRService from "../services/OCRService";

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigation>();

  const route =
    useRoute<
      import("@react-navigation/native").RouteProp<
        RootStackParamList,
        "Home"
      >
    >();

  const [profiles, setProfiles] = useState([
    "Me",
    "Child 1",
    "Husband",
  ]);

  const [healthConsiderations, setHealthConsiderations] =
    useState([
      "Pregnancy",
      "Gluten Intolerance",
    ]);

  const [selectedProfiles, setSelectedProfiles] = useState([
    "Me",
  ]);

  const [selectedHealth, setSelectedHealth] = useState([
    "Pregnancy",
  ]);

  const [isProcessing, setIsProcessing] =
    useState(false);

  useEffect(() => {
    const newProfile = route.params?.newProfile;

    if (newProfile && !profiles.includes(newProfile)) {
      setProfiles((current) => [...current, newProfile]);

      setSelectedProfiles((current) =>
        current.includes(newProfile)
          ? current
          : [...current, newProfile]
      );

      navigation.setParams({
        newProfile: undefined,
      });
    }
  }, [route.params?.newProfile]);

  useEffect(() => {
    const editedProfile = route.params?.editedProfile;

    if (editedProfile) {
      setProfiles((current) => {
        if (current.includes(editedProfile.oldName)) {
          return current.map((profile) =>
            profile === editedProfile.oldName
              ? editedProfile.newName
              : profile
          );
        }

        return [...current, editedProfile.newName];
      });

      setSelectedProfiles((current) => {
        if (current.includes(editedProfile.oldName)) {
          return current.map((profile) =>
            profile === editedProfile.oldName
              ? editedProfile.newName
              : profile
          );
        }

        return current.includes(editedProfile.newName)
          ? current
          : [...current, editedProfile.newName];
      });

      navigation.setParams({
        editedProfile: undefined,
      });
    }
  }, [route.params?.editedProfile]);

  useEffect(() => {
    const newHealthConsideration =
      route.params?.newHealthConsideration;

    if (
      newHealthConsideration &&
      !healthConsiderations.includes(newHealthConsideration)
    ) {
      setHealthConsiderations((current) => [
        ...current,
        newHealthConsideration,
      ]);

      setSelectedHealth((current) =>
        current.includes(newHealthConsideration)
          ? current
          : [...current, newHealthConsideration]
      );

      navigation.setParams({
        newHealthConsideration: undefined,
      });
    }
  }, [route.params?.newHealthConsideration]);

  useEffect(() => {
    const editedHealthConsideration =
      route.params?.editedHealthConsideration;

    if (editedHealthConsideration) {
      setHealthConsiderations((current) => {
        if (current.includes(editedHealthConsideration.oldName)) {
          return current.map((item) =>
            item === editedHealthConsideration.oldName
              ? editedHealthConsideration.newName
              : item
          );
        }

        return [
          ...current,
          editedHealthConsideration.newName,
        ];
      });

      setSelectedHealth((current) => {
        if (current.includes(editedHealthConsideration.oldName)) {
          return current.map((item) =>
            item === editedHealthConsideration.oldName
              ? editedHealthConsideration.newName
              : item
          );
        }

        return current.includes(
          editedHealthConsideration.newName
        )
          ? current
          : [
              ...current,
              editedHealthConsideration.newName,
            ];
      });

      navigation.setParams({
        editedHealthConsideration: undefined,
      });
    }
  }, [route.params?.editedHealthConsideration]);

  function toggleProfile(profile: string) {
    setSelectedProfiles((current) =>
      current.includes(profile)
        ? current.filter((item) => item !== profile)
        : [...current, profile]
    );
  }

  function toggleHealth(consideration: string) {
    setSelectedHealth((current) =>
      current.includes(consideration)
        ? current.filter((item) => item !== consideration)
        : [...current, consideration]
    );
  }

  function deleteProfile(profile: string) {
    setProfiles((current) =>
      current.filter((item) => item !== profile)
    );

    setSelectedProfiles((current) =>
      current.filter((item) => item !== profile)
    );
  }

  function editProfile(profile: string) {
    navigation.navigate("AddProfile", {
      profile,
    });
  }

  function deleteHealthConsideration(
    consideration: string
  ) {
    setHealthConsiderations((current) =>
      current.filter((item) => item !== consideration)
    );

    setSelectedHealth((current) =>
      current.filter((item) => item !== consideration)
    );
  }

  function editHealthConsideration(
    consideration: string
  ) {
    navigation.navigate("AddHealthConsideration", {
      consideration,
    });
  }

  async function processImage(uri: string) {
    setIsProcessing(true);

    try {
      const ocr =
        await OCRService.extractText(uri);

      if (!ocr.success) {
        Alert.alert(
          "Couldn't Read Ingredients",
          "Please try taking a clearer photo of the ingredient list."
        );
        return;
      }

      const review =
        await ReviewService.review({
          ingredients: ocr.text,
          people: selectedProfiles,
          healthConsiderations: selectedHealth,
        });

      navigation.navigate("Result", {
        verdict: review.verdict,
        summary: review.summary,
        profiles: selectedProfiles,
        healthConsiderations: selectedHealth,
      });
    } catch (error) {
      console.error(
        "Product review error:",
        error
      );

      Alert.alert(
        "Something Went Wrong",
        "We couldn't review this product. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleTakePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Camera Permission",
        "ShopWise needs camera access to photograph the ingredient list."
      );
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
      Alert.alert(
        "Gallery Permission",
        "ShopWise needs access to your photos so you can choose an ingredient list."
      );
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.brand}>ShopWise</Text>

        <Text style={styles.subtitle}>
          Your AI shopping assistant
        </Text>

        <SectionHeader
          icon=""
          title="Choose profiles"
        />

        <Text style={styles.sectionDescription}>
          Select who you're shopping for.
        </Text>

        <View style={styles.chipContainer}>
          {profiles.map((profile) => (
            <SelectionChip
              key={profile}
              title={profile}
              selected={selectedProfiles.includes(profile)}
              onPress={() => toggleProfile(profile)}
              onLongPress={() => {
                Alert.alert(
                  profile,
                  "What would you like to do?",
                  [
                    {
                      text: "Edit",
                      onPress: () => {
                        editProfile(profile);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        deleteProfile(profile);
                      },
                    },
                  ]
                );
              }}
            />
          ))}

          <SelectionChip
            title="+ Add"
            onPress={() =>
              navigation.navigate("AddProfile", {})
            }
          />
        </View>

        <SectionHeader
          icon=""
          title="Health considerations"
        />

        <Text style={styles.sectionDescription}>
          Select any that apply.
        </Text>

        <View style={styles.chipContainer}>
          {healthConsiderations.map((item) => (
            <SelectionChip
              key={item}
              title={item}
              selected={selectedHealth.includes(item)}
              onPress={() => toggleHealth(item)}
              onLongPress={() => {
                Alert.alert(
                  item,
                  "What would you like to do?",
                  [
                    {
                      text: "Edit",
                      onPress: () => {
                        editHealthConsideration(item);
                      },
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        deleteHealthConsideration(item);
                      },
                    },
                  ]
                );
              }}
            />
          ))}

          <SelectionChip
            title="+ Add"
            onPress={() =>
              navigation.navigate(
                "AddHealthConsideration",
                {}
              )
            }
          />
        </View>

        <ActionCard
          title="Review Product"
          description="Take a clear photo of the ingredient list or choose one from your gallery."
          primaryTitle="📷 Take Photo"
          secondaryTitle="🖼️ Choose From Gallery"
          onPrimaryPress={handleTakePhoto}
          onSecondaryPress={handleChooseFromGallery}
        />
      </ScrollView>

      <BottomNavigation />

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

  scrollView: {
    flex: 1,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  brand: {
    marginTop: Spacing.lg,
    fontSize: Typography.title,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  subtitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },

  sectionDescription: {
    marginTop: -Spacing.sm,
    marginBottom: Spacing.md,
    fontSize: Typography.small,
    color: Colors.textSecondary,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.xl,
  },
});