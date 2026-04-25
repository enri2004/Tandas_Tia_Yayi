import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { obtenerUsuarioGuardado } from "../utils/api/login-registrar/authStorage";
import { obtenerResumenDashboardAdmin } from "../utils/api/admin/adminApi";
import { AdminDashboardResponse } from "../utils/api/admin/adminTypes";

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const usuario = await obtenerUsuarioGuardado();

      if (!usuario?.id) {
        setData(null);
        setError("No se encontro la sesion del administrador.");
        return;
      }

      const respuesta = await obtenerResumenDashboardAdmin(usuario.id);
      setData(respuesta);
    } catch (error: any) {
      setData(null);
      setError(error?.response?.data?.mensaje || "No se pudo cargar el dashboard del admin.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  return {
    data,
    loading,
    error,
    recargar: cargar,
  };
};
