import React from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v19.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v19.0/oauth/access_token",
};

type FacebookUser = {
  name: string;
  email?: string;
  picture?: any;
};

export default function useFacebookAuth(onSuccess: (user: FacebookUser) => void) {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "TU_APP_ID_FACEBOOK",
      redirectUri: AuthSession.makeRedirectUri(),
      scopes: ["public_profile", "email"],
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
      getUserInfo(token);
    }
  }, [response]);

  const getUserInfo = async (token?: string) => {
    if (!token) return;

    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
      );

      const user = await res.json();

      await AsyncStorage.setItem("@userFacebook", JSON.stringify(user));

      onSuccess(user);
    } catch (error) {
      console.log("Error Facebook:", error);
    }
  };

  return { promptAsync, request };
}