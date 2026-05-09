import React from "react";
import { Alert, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim() || "1013318565134-p27ksi15bik78pqcdusfg4h7qtiij0lb.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID?.trim() || "1013318565134-gi4n2qn8920baus0bpdhbgurv1kaa8gv.apps.googleusercontent.com";
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID?.trim() || 
"1013318565134-m1k6sfpoa20jt925u3142h0detaoa2g5.apps.googleusercontent.com";
const NATIVE_REDIRECT_URI = makeRedirectUri({
  scheme: "tandasapp",
  path: "oauthredirect",
});

export default function useGoogleAuth(onSuccess: (user: any) => void) {
  const clientId =
    Platform.OS === "android"
      ? ANDROID_CLIENT_ID
      : Platform.OS === "ios"
      ? IOS_CLIENT_ID
      : WEB_CLIENT_ID;

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID || undefined,
    androidClientId: ANDROID_CLIENT_ID || undefined,
    iosClientId: IOS_CLIENT_ID || undefined,
    redirectUri: Platform.OS === "web" ? undefined : NATIVE_REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    selectAccount: true,
  });

  React.useEffect(() => {
    console.log("Google Platform:", Platform.OS);
    console.log("Usando Android Client:", Platform.OS === "android");
    console.log("Client ID existe:", Boolean(clientId));
    console.log("Google redirectUri:", Platform.OS === "web" ? "web-managed" : NATIVE_REDIRECT_URI);
  }, [clientId]);

  React.useEffect(() => {
    const run = async () => {
      if (!response) {
        return;
      }

      if (response.type === "error") {
        console.log("Google auth error:", response.error);
        Alert.alert("Google", "No se pudo completar el acceso con Google.");
        return;
      }

      if (response.type !== "success") {
        return;
      }

      const token =
        response.authentication?.accessToken || response.params?.access_token;

      if (!token) {
        Alert.alert("Google", "No se recibio access token de Google.");
        return;
      }

      const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await res.json();
      onSuccess(user);
    };

    run().catch((error) => {
      console.log("Google userinfo error:", error);
      Alert.alert("Google", "No se pudo obtener la informacion de tu cuenta.");
    });
  }, [onSuccess, response]);

  const login = async () => {
    console.log("Google Platform:", Platform.OS);
    console.log("Usando Android Client:", Platform.OS === "android");
    console.log("Client ID existe:", Boolean(clientId));

    if (!clientId) {
      Alert.alert(
        "Google",
        Platform.OS === "android"
          ? "Falta GOOGLE_ANDROID_CLIENT_ID para esta APK."
          : Platform.OS === "web"
          ? "Falta GOOGLE_WEB_CLIENT_ID para web."
          : "Falta GOOGLE_IOS_CLIENT_ID para iOS."
      );
      return;
    }

    if (!request) {
      Alert.alert("Google", "La configuracion de Google aun no esta lista.");
      return;
    }

    await promptAsync();
  };

  return {
    promptAsync: login,
    request,
  };
}
