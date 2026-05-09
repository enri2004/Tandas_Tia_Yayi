import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { router, useSegments } from "expo-router";
import {
  cerrarSesion as borrarSesionLocal,
  guardarSesion,
  obtenerToken,
  obtenerUsuarioGuardado,
  type UsuarioGuardado,
} from "@/utils/api/login-registrar/authStorage";
import { obtenerUsuarioActual } from "@/utils/api/login-registrar/userapi";

type SessionPayload = {
  token: string;
  usuario: UsuarioGuardado;
};

type AuthContextValue = {
  usuario: UsuarioGuardado | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  signIn: (payload: SessionPayload) => Promise<void>;
  updateUser: (usuario: UsuarioGuardado) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<UsuarioGuardado | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const esRutaPublica = (segments: string[]) => {
  if (segments.length === 0) {
    return true;
  }

  return segments[0] === "screen" && segments[1] === "Login-registre";
};

const esRutaAdmin = (segments: string[]) =>
  segments[0] === "admin" || (segments[0] === "screen" && segments[1] === "admin");

const esRutaUser = (segments: string[]) =>
  segments[0] === "User" || (segments[0] === "screen" && segments[1] === "user");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const [usuario, setUsuario] = useState<UsuarioGuardado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  const signIn = async (payload: SessionPayload) => {
    await guardarSesion(payload);
    setToken(payload.token);
    setUsuario(payload.usuario);
  };

  const updateUser = async (nuevoUsuario: UsuarioGuardado) => {
    const tokenActual = token || (await obtenerToken());

    if (!tokenActual) {
      setUsuario(null);
      setToken(null);
      return;
    }

    await guardarSesion({
      token: tokenActual,
      usuario: nuevoUsuario,
    });

    setUsuario(nuevoUsuario);
    setToken(tokenActual);
  };

  const logout = async () => {
    await borrarSesionLocal();
    setUsuario(null);
    setToken(null);
    router.replace("/");
  };

  const refreshSession = async () => {
    const tokenGuardado = await obtenerToken();

    if (!tokenGuardado) {
      await borrarSesionLocal();
      setUsuario(null);
      setToken(null);
      return null;
    }

    try {
      const respuesta = await obtenerUsuarioActual();
      const usuarioActual = respuesta?.usuario || null;

      if (!usuarioActual) {
        throw new Error("No se recibió el usuario actual");
      }

      await guardarSesion({
        token: tokenGuardado,
        usuario: usuarioActual,
      });

      setToken(tokenGuardado);
      setUsuario(usuarioActual);
      return usuarioActual;
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        await borrarSesionLocal();
      }

      setUsuario(null);
      setToken(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const tokenGuardado = await obtenerToken();
        const usuarioGuardado = await obtenerUsuarioGuardado();

        if (mounted && tokenGuardado && usuarioGuardado) {
          setToken(tokenGuardado);
          setUsuario(usuarioGuardado);
        }

        await refreshSession();
      } finally {
        if (mounted) {
          setIsHydrating(false);
        }
      }
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    const enRutaPublica = esRutaPublica(segments);
    const enRutaAdmin = esRutaAdmin(segments);
    const enRutaUser = esRutaUser(segments);

    if (!usuario) {
      if (enRutaAdmin || enRutaUser) {
        router.replace("/");
      }
      return;
    }

    if (!usuario.rol) {
      if (!enRutaPublica) {
        router.replace("/");
      }
      return;
    }

    if (enRutaPublica) {
      router.replace(usuario.rol === "admin" ? "/admin/(tabs)" : "/User/(tabs)");
      return;
    }

    if (usuario.rol === "admin" && enRutaUser) {
      router.replace("/admin/(tabs)");
      return;
    }

    if (usuario.rol === "usuario" && enRutaAdmin) {
      router.replace("/User/(tabs)");
    }
  }, [isHydrating, segments, usuario]);

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      token,
      isAuthenticated: Boolean(usuario && token),
      isHydrating,
      signIn,
      updateUser,
      logout,
      refreshSession,
    }),
    [isHydrating, token, usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};
