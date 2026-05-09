import React from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v19.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v19.0/oauth/access_token",
};

const FACEBOOK_APP_ID =
  process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || "2260600137805168";
const FACEBOOK_REDIRECT_URI =
  process.env.EXPO_PUBLIC_FACEBOOK_REDIRECT_URI ||
  "https://auth.expo.io/@enri12/Tandas-app";

export type FacebookUser = {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
};

type UseFacebookAuthParams = {
  onSuccess: (user: FacebookUser) => void | Promise<void>;
  onError?: (message: string) => void;
  onCancel?: () => void;
};

export default function useFacebookAuth({
  onSuccess,
  onError,
  onCancel,
}: UseFacebookAuthParams) {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: FACEBOOK_APP_ID,
      redirectUri: FACEBOOK_REDIRECT_URI,
      responseType: AuthSession.ResponseType.Token,
      scopes: ["public_profile", "email"],
    },
    discovery
  );

  React.useEffect(() => {
    console.log("[Facebook Auth] redirectUri usado:", FACEBOOK_REDIRECT_URI);
  }, []);

  React.useEffect(() => {
    const manejarRespuesta = async () => {
      if (!response) {
        return;
      }

      console.log("[Facebook Auth] respuesta cruda:", response);

      if (response.type === "dismiss" || response.type === "cancel") {
        console.log("[Facebook Auth] inicio de sesión cancelado por el usuario.");
        onCancel?.();
        return;
      }

      if (response.type !== "success") {
        onError?.("No se pudo completar el inicio de sesión con Facebook.");
        return;
      }

      const token =
        response.params?.access_token || response.authentication?.accessToken;

      if (!token) {
        onError?.("Facebook no devolvió un token de acceso válido.");
        return;
      }

      await getUserInfo(token);
    };

    manejarRespuesta().catch((error) => {
      console.log("[Facebook Auth] error procesando respuesta:", error);
      onError?.("Ocurrió un error al procesar la respuesta de Facebook.");
    });
  }, [onCancel, onError, response]);

  const getUserInfo = async (token: string) => {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
      );

      if (!res.ok) {
        throw new Error(`Facebook Graph respondió con estado ${res.status}`);
      }

      const user: FacebookUser = await res.json();
      console.log("[Facebook Auth] perfil Facebook:", user);
      await onSuccess(user);
    } catch (error) {
      console.log("[Facebook Auth] error obteniendo perfil:", error);
      onError?.("No se pudo obtener la información del perfil desde Facebook.");
    }
  };

  const iniciarFacebookAuth = React.useCallback(async () => {
    try {
      console.log("[Facebook Auth] iniciando prompt con redirectUri:", FACEBOOK_REDIRECT_URI);
      return await promptAsync();
    } catch (error) {
      console.log("[Facebook Auth] error lanzando prompt:", error);
      onError?.("No se pudo abrir la autenticación con Facebook.");
      return null;
    }
  }, [onError, promptAsync]);

  return {
    promptAsync: iniciarFacebookAuth,
    request,
    redirectUri: FACEBOOK_REDIRECT_URI,
  };
}
