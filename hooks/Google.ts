import React from "react";
import { View, Button, Text, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin({onSuccess}:any) {
  const [userInfo, setUserInfo] = React.useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "1013318565134-p27ksi15bik78pqcdusfg4h7qtiij0lb.apps.googleusercontent.com",
    iosClientId:
      "1013318565134-m1k6sfpoa20jt925u3142h0detaoa2g5.apps.googleusercontent.com",
    androidClientId:
      "1013318565134-gi4n2qn8920baus0bpdhbgurv1kaa8gv.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
      getUserInfo(token);
    }
  }, [response]);

  const getUserInfo = async (token?: string) => {
    if (!token) return;

    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await res.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));

    onSuccess(user);
  };

  return { promptAsync, request };
}