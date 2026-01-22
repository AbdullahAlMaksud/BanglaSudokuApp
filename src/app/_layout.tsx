import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "../styles/ThemeContext";

function RootLayoutContent() {
  const { theme, themeName } = useTheme();
  const insets = useSafeAreaInsets();

  // Use consistent padding, accounting for safe areas
  const verticalPadding = 16;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top + verticalPadding,
        paddingBottom: insets.bottom + verticalPadding,
      }}
    >
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
