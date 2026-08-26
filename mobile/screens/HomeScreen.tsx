import { useEffect, useRef, useState } from "react";
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
import UserDataService from "../services/firebase/UserDataService";

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

  const [isUserDataLoaded, setIsUserDataLoaded] =
    useState(false);

  const isSaving = useRef(false);

  async function persistUserData(
    nextProfiles: string[],
    nextHealthConsiderations: string[],
    nextSelectedProfiles: string[],
    nextSelectedHealth: string[]
  ) {
    isSaving.current = true;

    try {
      await UserDataService.saveUserData({
        profiles: nextProfiles,
        healthConsiderations:
          nextHealthConsiderations,
        selectedProfiles: nextSelectedProfiles,
        selectedHealth: nextSelectedHealth,
      });
    } catch (error) {
      console.error(
        "Failed to save user data:",
        error
      );

      Alert.alert(
        "Unable to Save",
        "Your changes could not be saved. Please try again."
      );
    } finally {
      isSaving.current = false;
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const data =
          await UserDataService.initializeUserData();

        setProfiles(data.profiles);
        setHealthConsiderations(
          data.healthConsiderations
        );
        setSelectedProfiles(
          data.selectedProfiles
        );
        setSelectedHealth(
          data.selectedHealth
        );

        setIsUserDataLoaded(true);
      } catch (error) {
        console.error(
          "Failed to load user data:",
          error
        );

        Alert.alert(
          "Unable to Load Data",
          "We couldn't load your ShopWise data. Please try again."
        );
      }
    }

    loadUserData();
  }, []);

  useEffect(() => {
    if (!isUserDataLoaded) {
      return;
    }

    const newProfile = route.params?.newProfile;

    if (!newProfile) {
      return;
    }

    const trimmedProfile = newProfile.trim();

    if (!trimmedProfile) {
      navigation.setParams({
        newProfile: undefined,
      });
      return;
    }

    if (profiles.includes(trimmedProfile)) {
      navigation.setParams({
        newProfile: undefined,
      });
      return;
    }

    const nextProfiles = [
      ...profiles,
      trimmedProfile,
    ];

    const nextSelectedProfiles =
      selectedProfiles.includes(trimmedProfile)
        ? selectedProfiles
        : [
            ...selectedProfiles,
            trimmedProfile,
          ];

    setProfiles(nextProfiles);
    setSelectedProfiles(nextSelectedProfiles);

    navigation.setParams({
      newProfile: undefined,
    });

    persistUserData(
      nextProfiles,
      healthConsiderations,
      nextSelectedProfiles,
      selectedHealth
    );
  }, [
    isUserDataLoaded,
    route.params?.newProfile,
  ]);

  useEffect(() => {
    if (!isUserDataLoaded) {
      return;
    }

    const editedProfile =
      route.params?.editedProfile;

    if (!editedProfile) {
      return;
    }

    const nextProfiles = profiles.includes(
      editedProfile.oldName
    )
      ? profiles.map((profile) =>
          profile === editedProfile.oldName
            ? editedProfile.newName
            : profile
        )
      : [
          ...profiles,
          editedProfile.newName,
        ];

    const nextSelectedProfiles =
      selectedProfiles.includes(
        editedProfile.oldName
      )
        ? selectedProfiles.map((profile) =>
            profile === editedProfile.oldName
              ? editedProfile.newName
              : profile
          )
        : selectedProfiles.includes(
              editedProfile.newName
            )
          ? selectedProfiles
          : [
              ...selectedProfiles,
              editedProfile.newName,
            ];

    setProfiles(nextProfiles);
    setSelectedProfiles(
      nextSelectedProfiles
    );

    navigation.setParams({
      editedProfile: undefined,
    });

    persistUserData(
      nextProfiles,
      healthConsiderations,
      nextSelectedProfiles,
      selectedHealth
    );
  }, [
    isUserDataLoaded,
    route.params?.editedProfile,
  ]);

  useEffect(() => {
    if (!isUserDataLoaded) {
      return;
    }

    const newHealthConsideration =
      route.params?.newHealthConsideration;

    if (!newHealthConsideration) {
      return;
    }

    const trimmedConsideration =
      newHealthConsideration.trim();

    if (!trimmedConsideration) {
      navigation.setParams({
        newHealthConsideration:
          undefined,
      });
      return;
    }

    if (
      healthConsiderations.includes(
        trimmedConsideration
      )
    ) {
      navigation.setParams({
        newHealthConsideration:
          undefined,
      });
      return;
    }

    const nextHealthConsiderations = [
      ...healthConsiderations,
      trimmedConsideration,
    ];

    const nextSelectedHealth =
      selectedHealth.includes(
        trimmedConsideration
      )
        ? selectedHealth
        : [
            ...selectedHealth,
            trimmedConsideration,
          ];

    setHealthConsiderations(
      nextHealthConsiderations
    );
    setSelectedHealth(
      nextSelectedHealth
    );

    navigation.setParams({
      newHealthConsideration:
        undefined,
    });

    persistUserData(
      profiles,
      nextHealthConsiderations,
      selectedProfiles,
      nextSelectedHealth
    );
  }, [
    isUserDataLoaded,
    route.params?.newHealthConsideration,
  ]);

  useEffect(() => {
    if (!isUserDataLoaded) {
      return;
    }

    const editedHealthConsideration =
      route.params?.editedHealthConsideration;

    if (!editedHealthConsideration) {
      return;
    }

    const nextHealthConsiderations =
      healthConsiderations.includes(
        editedHealthConsideration.oldName
      )
        ? healthConsiderations.map((item) =>
            item ===
            editedHealthConsideration.oldName
              ? editedHealthConsideration.newName
              : item
          )
        : [
            ...healthConsiderations,
            editedHealthConsideration.newName,
          ];

    const nextSelectedHealth =
      selectedHealth.includes(
        editedHealthConsideration.oldName
      )
        ? selectedHealth.map((item) =>
            item ===
            editedHealthConsideration.oldName
              ? editedHealthConsideration.newName
              : item
          )
        : selectedHealth.includes(
              editedHealthConsideration.newName
            )
          ? selectedHealth
          : [
              ...selectedHealth,
              editedHealthConsideration.newName,
            ];

    setHealthConsiderations(
      nextHealthConsiderations
    );
    setSelectedHealth(
      nextSelectedHealth
    );

    navigation.setParams({
      editedHealthConsideration:
        undefined,
    });

    persistUserData(
      profiles,
      nextHealthConsiderations,
      selectedProfiles,
      nextSelectedHealth
    );
  }, [
    isUserDataLoaded,
    route.params?.editedHealthConsideration,
  ]);

  function toggleProfile(profile: string) {
    if (!isUserDataLoaded) {
      return;
    }

    const nextSelectedProfiles =
      selectedProfiles.includes(profile)
        ? selectedProfiles.filter(
            (item) => item !== profile
          )
        : [
            ...selectedProfiles,
            profile,
          ];

    setSelectedProfiles(
      nextSelectedProfiles
    );

    persistUserData(
      profiles,
      healthConsiderations,
      nextSelectedProfiles,
      selectedHealth
    );
  }

  function toggleHealth(
    consideration: string
  ) {
    if (!isUserDataLoaded) {
      return;
    }

    const nextSelectedHealth =
      selectedHealth.includes(
        consideration
      )
        ? selectedHealth.filter(
            (item) =>
              item !== consideration
          )
        : [
            ...selectedHealth,
            consideration,
          ];

    setSelectedHealth(
      nextSelectedHealth
    );

    persistUserData(
      profiles,
      healthConsiderations,
      selectedProfiles,
      nextSelectedHealth
    );
  }

  function deleteProfile(
    profile: string
  ) {
    if (!isUserDataLoaded) {
      return;
    }

    const nextProfiles =
      profiles.filter(
        (item) => item !== profile
      );

    const nextSelectedProfiles =
      selectedProfiles.filter(
        (item) => item !== profile
      );

    setProfiles(nextProfiles);
    setSelectedProfiles(
      nextSelectedProfiles
    );

    persistUserData(
      nextProfiles,
      healthConsiderations,
      nextSelectedProfiles,
      selectedHealth
    );
  }

  function editProfile(
    profile: string
  ) {
    navigation.navigate("AddProfile", {
      profile,
    });
  }

  function deleteHealthConsideration(
    consideration: string
  ) {
    if (!isUserDataLoaded) {
      return;
    }

    const nextHealthConsiderations =
      healthConsiderations.filter(
        (item) => item !== consideration
      );

    const nextSelectedHealth =
      selectedHealth.filter(
        (item) => item !== consideration
      );

    setHealthConsiderations(
      nextHealthConsiderations
    );
    setSelectedHealth(
      nextSelectedHealth
    );

    persistUserData(
      profiles,
      nextHealthConsiderations,
      selectedProfiles,
      nextSelectedHealth
    );
  }

  function editHealthConsideration(
    consideration: string
  ) {
    navigation.navigate(
      "AddHealthConsideration",
      {
        consideration,
      }
    );
  }

  async function processImage(
    uri: string
  ) {
    setIsProcessing(true);

    try {
      const review =
        await ReviewService.review({
          imageUri: uri,
          people: selectedProfiles,
          healthConsiderations:
            selectedHealth,
        });

      navigation.navigate("Result", {
        verdict: review.verdict,
        summary: review.summary,
        profiles: selectedProfiles,
        healthConsiderations:
          selectedHealth,
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
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text style={styles.brand}>
          ShopWise
        </Text>

        <Text style={styles.subtitle}>
          Your AI shopping assistant
        </Text>

        <SectionHeader
          icon=""
          title="Choose profiles"
        />

        <Text
          style={
            styles.sectionDescription
          }
        >
          Select who you're shopping for.
        </Text>

        <View
          style={styles.chipContainer}
        >
          {profiles.map((profile) => (
            <SelectionChip
              key={profile}
              title={profile}
              selected={selectedProfiles.includes(
                profile
              )}
              onPress={() =>
                toggleProfile(profile)
              }
              onLongPress={() => {
                Alert.alert(
                  profile,
                  "What would you like to do?",
                  [
                    {
                      text: "Edit",
                      onPress: () => {
                        editProfile(
                          profile
                        );
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
                        deleteProfile(
                          profile
                        );
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
                "AddProfile",
                {}
              )
            }
          />
        </View>

        <SectionHeader
          icon=""
          title="Health considerations"
        />

        <Text
          style={
            styles.sectionDescription
          }
        >
          Select any that apply.
        </Text>

        <View
          style={styles.chipContainer}
        >
          {healthConsiderations.map(
            (item) => (
              <SelectionChip
                key={item}
                title={item}
                selected={selectedHealth.includes(
                  item
                )}
                onPress={() =>
                  toggleHealth(item)
                }
                onLongPress={() => {
                  Alert.alert(
                    item,
                    "What would you like to do?",
                    [
                      {
                        text: "Edit",
                        onPress: () => {
                          editHealthConsideration(
                            item
                          );
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
                          deleteHealthConsideration(
                            item
                          );
                        },
                      },
                    ]
                  );
                }}
              />
            )
          )}

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
          title="ShopWise Premium"
          description="Unlock Premium access and get more from ShopWise."
          primaryTitle="⭐ View Premium"
          secondaryTitle=""
          onPrimaryPress={() =>
            navigation.navigate("Premium")
          }
          onSecondaryPress={() => {}}
        />
        <ActionCard
          title="Review Product"
          description="Take a clear photo of the ingredient list or choose one from your gallery."
          primaryTitle="📷 Take Photo"
          secondaryTitle="🖼️ Choose From Gallery"
          onPrimaryPress={
            handleTakePhoto
          }
          onSecondaryPress={
            handleChooseFromGallery
          }
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
    backgroundColor:
      Colors.background,
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
    fontWeight:
      Typography.weightBold,
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