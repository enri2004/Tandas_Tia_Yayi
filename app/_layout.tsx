import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash from "@/components/ui/Splash";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { prewarmApi } from "@/servers/Axios";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const { isHydrating } = useAuth();

  if (isHydrating) {
    return <Splash />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" translucent={false} />
    </>
  );
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  usePushNotifications();

  useEffect(() => {
    let mounted = true;

    const prepararApp = async () => {
      await prewarmApi().catch(() => null);

      if (mounted) {
        setAppReady(true);
      }
    };

    prepararApp();

    return () => {
      mounted = false;
    };
  }, []);

  if (!appReady) {
    return <Splash />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});