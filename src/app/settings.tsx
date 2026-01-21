import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { useSettingsStore } from "../store/settingsStore";
import { useTheme } from "../styles/ThemeContext";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const {
    soundEnabled,
    toggleSound,
    vibrationEnabled,
    toggleVibration,
    errorHighlight,
    toggleErrorHighlight,
    setTheme,
    theme: currentThemeMode,
    resetSettings,
  } = useSettingsStore();

  const styles = createStyles(theme);

  const SettingsItem = ({ label, icon, value, onToggle }: any) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>
        <ThemedText variant="body" weight="bold">
          {label}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="সেটিংস" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        <Card padding="lg">
          <SettingsItem
            label="শব্দ"
            icon="volume-high"
            value={soundEnabled}
            onToggle={toggleSound}
          />
          <View style={styles.divider} />
          <SettingsItem
            label="ভাইব্রেশন"
            icon="phone-portrait-outline"
            value={vibrationEnabled}
            onToggle={toggleVibration}
          />
          <View style={styles.divider} />
          <SettingsItem
            label="ভুল হাইলাইট"
            icon="alert-circle-outline"
            value={errorHighlight}
            onToggle={toggleErrorHighlight}
          />
        </Card>

        <ThemedText variant="label" style={styles.sectionLabel}>
          থিম
        </ThemedText>
        <Card padding="lg" style={styles.themeCard}>
          <View style={styles.themeOptions}>
            <Button
              title="লাইট"
              variant={currentThemeMode === "light" ? "primary" : "ghost"}
              onPress={() => setTheme("light")}
              size="sm"
            />
            <Button
              title="ডার্ক"
              variant={currentThemeMode === "dark" ? "primary" : "ghost"}
              onPress={() => setTheme("dark")}
              size="sm"
            />
            <Button
              title="সিস্টেম"
              variant={currentThemeMode === "system" ? "primary" : "ghost"}
              onPress={() => setTheme("system")}
              size="sm"
            />
          </View>
        </Card>

        <View style={{ marginTop: 40 }}>
          <Button
            title="অগ্রগতি রিসেট করুন"
            variant="outline"
            onPress={resetSettings}
            style={{ borderColor: theme.colors.error }}
            textStyle={{ color: theme.colors.error }}
          />
          <ThemedText
            variant="caption"
            align="center"
            style={{ marginTop: 10, opacity: 0.5 }}
          >
            ভার্সন ১.০.০
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    iconBox: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.selection,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.sm,
    },
    sectionLabel: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
      color: theme.colors.textSecondary,
    },
    themeCard: {},
    themeOptions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
