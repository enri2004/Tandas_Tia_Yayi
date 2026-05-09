import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
  "1013318565134-p27ksi15bik78pqcdusfg4h7qtiij0lb.apps.googleusercontent.com";
const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ||
  "1013318565134-m1k6sfpoa20jt925u3142h0detaoa2g5.apps.googleusercontent.com";
const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
  "1013318565134-gi4n2qn8920baus0bpdhbgurv1kaa8gv.apps.googleusercontent.com";

export default function GoogleLogin(onSuccess: (user: any) => void) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
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
    onSuccess(user);
  };

  const promptSelectAccount = React.useCallback(
    (options?: Parameters<typeof promptAsync>[0]) =>
      promptAsync({
        ...options,
        prompt: "select_account",
      } as Parameters<typeof promptAsync>[0]),
    [promptAsync]
  );

  return { promptAsync: promptSelectAccount, request };
}
