import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash from "@/components/ui/Splash";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { prewarmApi } from "@/servers/Axios";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  usePushNotifications();

  useEffect(() => {
    prewarmApi().catch(() => null);

    const timer = setTimeout(() => {
      setAppReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    return <Splash />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" translucent={false} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
