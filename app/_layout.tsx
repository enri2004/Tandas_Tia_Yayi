import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react"; 
import { useColorScheme } from "../hooks/use-color-scheme"
import Splash from "@/components/ui/Splash"

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
 const [appReady, setAppReady] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true); 
    }, 3000); // duración (3 segundos)

    return () => clearTimeout(timer);
  }, []);


  if (!appReady) {
    return <Splash/>; 
  }


  return (
  <GestureHandlerRootView>
  {//<ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
  }
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
  {//</ThemeProvider>
    }
    </GestureHandlerRootView>
  );
}
