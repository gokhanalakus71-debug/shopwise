import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../components/PrimaryButton";
import { Colors, Radius, Spacing, Typography } from "../theme";

export default function AddProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  function handleSave() {
    const trimmed = name.trim();

    if (!trimmed) {
      Alert.alert("Profile name", "Please enter a profile name.");
      return;
    }

    // Saving will be added in the next step

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Profile</Text>

        <Text style={styles.subtitle}>
          Create a profile for someone you shop for.
        </Text>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter profile name"
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