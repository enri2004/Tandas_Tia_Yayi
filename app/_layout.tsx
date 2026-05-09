import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { prewarmApi } from "@/servers/Axios";
import SplashAnimation from "@/src/components/SplashAnimation";

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

type AppContentProps = {
  appReady: boolean;
  customSplashDone: boolean;
  onCustomSplashFinish: () => void;
};

function RootNavigator() {
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

function AppContent({
  appReady,
  customSplashDone,
  onCustomSplashFinish,
}: AppContentProps) {
  const { isHydrating } = useAuth();

  if (!appReady || isHydrating || !customSplashDone) {
    return <SplashAnimation onFinish={onCustomSplashFinish} />;
  }

  return <RootNavigator />;
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [nativeSplashHidden, setNativeSplashHidden] = useState(false);
  const [customSplashDone, setCustomSplashDone] = useState(false);

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

  useEffect(() => {
    if (!appReady || nativeSplashHidden) {
      return;
    }

    SplashScreen.hideAsync()
      .then(() => setNativeSplashHidden(true))
      .catch(() => setNativeSplashHidden(true));
  }, [appReady, nativeSplashHidden]);

  if (!nativeSplashHidden) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <AuthProvider>
          <AppContent
            appReady={appReady}
            customSplashDone={customSplashDone}
            onCustomSplashFinish={() => setCustomSplashDone(true)}
          />
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
