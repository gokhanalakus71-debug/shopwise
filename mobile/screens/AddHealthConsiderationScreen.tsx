import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import PrimaryButton from "../components/PrimaryButton";
import { Colors, Radius, Spacing, Typography } from "../theme";
import {
  AppNavigation,
  RootStackParamList,
} from "../navigation/AppNavigator";

export default function AddHealthConsiderationScreen() {
  const navigation = useNavigation<AppNavigation>();

  const route =
    useRoute<
      import("@react-navigation/native").RouteProp<
        RootStackParamList,
        "AddHealthConsideration"
      >
    >();

  const editingConsideration =
    route.params?.consideration;

  const [name, setName] = useState(
    editingConsideration ?? ""
  );

  function handleSave() {
    const trimmed = name.trim();

    if (!trimmed) {
      Alert.alert(
        "Health consideration",
        "Please enter a consideration."
      );
      return;
    }

    if (editingConsideration) {
      navigation.navigate("Home", {
        editedHealthConsideration: {
          oldName: editingConsideration,
          newName: trimmed,
        },
      });
      return;
    }

    navigation.navigate("Home", {
      newHealthConsideration: trimmed,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {editingConsideration
            ? "Edit Health Consideration"
            : "Add Health Consideration"}
        </Text>

        <Text style={styles.subtitle}>
          {editingConsideration
            ? "Update the health consideration."
            : "Add a health consideration for product reviews."}
        </Text>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter consideration"
          autoFocus
        />

        <PrimaryButton
          title="Save"
          onPress={handleSave}
        />
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
    padding: Spacing.lg,
  },

  title: {
    fontSize: Typography.heading,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },

  label: {
    fontSize: Typography.body,
    fontWeight: Typography.weightBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
});