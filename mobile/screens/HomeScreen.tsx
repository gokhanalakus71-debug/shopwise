import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SectionCard from "../components/SectionCard";
import SectionHeader from "../components/SectionHeader";
import ActionCard from "../components/ActionCard";
import { Colors, Spacing, Typography } from "../theme";
import SelectionChip from "../components/SelectionChip";
import ReviewProductCard from "../components/ReviewProductCard";
import BottomNavigation from "../components/BottomNavigation";
import { AppNavigation } from "../navigation/AppNavigator";

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigation>();

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
          icon="📷"
          title="Review this product for"
        />

        <Text style={styles.groupTitle}>People</Text>

        <View style={styles.chipContainer}>
          <SelectionChip title="Me" selected />
          <SelectionChip title="Child 1" />
          <SelectionChip title="Husband" />
        </View>

        <Text style={styles.groupTitle}>
          Health considerations
        </Text>

        <View style={styles.chipContainer}>
          <SelectionChip title="Pregnancy" />
          <SelectionChip title="Gluten Intolerance" />
          <SelectionChip title="+ Add consideration" />
        </View>

        <ActionCard
          title="Review a Product"
          description="Take a clear photo of the ingredient list or choose one from your gallery."
          primaryTitle="📸 Take Photo"
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

  sectionTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
  },

  groupTitle: {
    marginBottom: Spacing.sm,
    fontSize: Typography.caption,
    fontWeight: Typography.weightBold,
    color: Colors.textSecondary,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.lg,
  },

  reviewCard: {
    marginVertical: Spacing.lg,
  },

  review: {
    marginBottom: Spacing.sm,
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
});