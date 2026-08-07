import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Spacing, Typography } from "../theme";
import { AppNavigation } from "../navigation/AppNavigator";

import BottomNavigation from "../components/BottomNavigation";
import SelectionChip from "../components/SelectionChip";
import SectionHeader from "../components/SectionHeader";
import ActionCard from "../components/ActionCard";

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigation>();

  const [profiles] = useState([
    "Me",
    "Child 1",
    "Husband",
  ]);

  const [healthConsiderations] = useState([
    "Pregnancy",
    "Gluten Intolerance",
  ]);

  const [selectedProfiles, setSelectedProfiles] = useState([
    "Me",
  ]);

  const [selectedHealth, setSelectedHealth] = useState([
    "Pregnancy",
  ]);

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
            />
          ))}

          <SelectionChip
            title="+ Add"
            onPress={() => {
              // Coming soon
            }}
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
            />
          ))}

          <SelectionChip
            title="+ Add"
            onPress={() => {
              // Coming soon
            }}
          />
        </View>

        <ActionCard
          title="Review Product"
          description="Take a clear photo of the ingredient list or choose one from your gallery."
          primaryTitle="📷 Take Photo"
          secondaryTitle="🖼️ Choose From Gallery"
          onPrimaryPress={() => navigation.navigate("ReviewProduct")}
          onSecondaryPress={() => navigation.navigate("ReviewProduct")}
        />

        <Text style={styles.sectionTitle}>
          Recently Reviewed
        </Text>

        <Text style={styles.review}>🟢 Dove Shampoo</Text>
        <Text style={styles.review}>🟡 Nutella</Text>
        <Text style={styles.review}>🔴 Kinder Chocolate</Text>
      </ScrollView>

      <BottomNavigation />
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

  sectionTitle: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.xl,
  },

  review: {
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
});