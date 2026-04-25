import { useCallback, useEffect, useState } from "react";
import { obtenerUsuarioGuardado } from "@/utils/api/login-registrar/authStorage";
import { cargarMiPerfil } from "@/utils/api/amigos/amigosService";
import { Usuario } from "@/utils/api/amigos/amigosTypes";
import {
  AdminPreferencias,
  guardarPreferenciasAdmin,
  obtenerPreferenciasAdmin,
} from "@/utils/api/admin/adminConfigStorage";

export const useAdminConfig = () => {
  const [adminId, setAdminId] = useState("");
  const [perfil, setPerfil] = useState<Partial<Usuario> | null>(null);
  const [preferencias, setPreferencias] = useState<AdminPreferencias | null>(null);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      const sesion = await obtenerUsuarioGuardado();

      if (!sesion?.id) {
        setPerfil(null);
        setPreferencias(null);
        return;
      }

      setAdminId(sesion.id);

      const [perfilActual, preferenciasActuales] = await Promise.all([
        cargarMiPerfil(sesion.id),
        obtenerPreferenciasAdmin(sesion.id),
      ]);

      setPerfil(perfilActual);
      setPreferencias(preferenciasActuales);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const actualizarPreferencias = useCallback(
    async (partial: Partial<AdminPreferencias>) => {
      if (!adminId) return;

      const base = preferencias || (await obtenerPreferenciasAdmin(adminId));
      const nuevas = {
        ...base,
        ...partial,
      };

      await guardarPreferenciasAdmin(adminId, nuevas);
      setPreferencias(nuevas);
    },
    [adminId, preferencias]
  );

  return {
    adminId,
    perfil,
    preferencias,
    loading,
    recargar: cargar,
    actualizarPreferencias,
  };
};
