import { useCallback, useEffect, useMemo, useState } from "react";
import { obtenerUsuarioGuardado } from "../utils/api/login-registrar/authStorage";
import { cargarListaAmigos } from "../utils/api/amigos/amigosService";
import { Amigo } from "../utils/api/amigos/amigosTypes";
import { crearTandaAdmin } from "../utils/api/admin/adminApi";

type FormularioCrearTanda = {
  nombre: string;
  monto: string;
  participantes: string;
  frecuencia: string;
  fecha: string;
  descripcion: string;
  estado: boolean;
  imagenUri: string;
};

const formInicial: FormularioCrearTanda = {
  nombre: "",
  monto: "",
  participantes: "2",
  frecuencia: "quincenal",
  fecha: "",
  descripcion: "",
  estado: true,
  imagenUri: "",
};

const moverElemento = (lista: string[], fromIndex: number, toIndex: number) => {
  const copia = [...lista];
  const [item] = copia.splice(fromIndex, 1);
  copia.splice(toIndex, 0, item);
  return copia;
};

export function useCrearTandaAdmin() {
  const [admin, setAdmin] = useState<Amigo | null>(null);
  const [amigosDisponibles, setAmigosDisponibles] = useState<Amigo[]>([]);
  const [seleccionadosIds, setSeleccionadosIds] = useState<string[]>([]);
  const [formulario, setFormulario] = useState<FormularioCrearTanda>(formInicial);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargandoInicial(true);
        setErrorCarga("");

        const sesion = await obtenerUsuarioGuardado();
        if (!sesion?.id) {
          throw new Error("No se encontro la sesion del administrador");
        }

        const adminActual: Amigo = {
          id: sesion.id,
          nombre: sesion.nombre,
          correo: sesion.correo,
          usuario: sesion.usuario || "",
          imagen: sesion.imagen,
          rol: sesion.rol,
          tipoUsuario: sesion.tipoUsuario,
        };

        setAdmin(adminActual);
        setSeleccionadosIds([sesion.id]);

        const amigos = await cargarListaAmigos(sesion.id);
        const disponibles = [adminActual, ...amigos].filter(
          (item, index, arr) => arr.findIndex((otro) => otro.id === item.id) === index
        );

        setAmigosDisponibles(disponibles);
      } catch (error: any) {
        setErrorCarga(error?.response?.data?.mensaje || error?.message || "No se pudo cargar la informacion inicial");
      } finally {
        setCargandoInicial(false);
      }
    };

    cargar();
  }, []);

  const integrantesOrdenados = useMemo(
    () =>
      seleccionadosIds
        .map((id) => amigosDisponibles.find((item) => item.id === id))
        .filter(Boolean) as Amigo[],
    [amigosDisponibles, seleccionadosIds]
  );

  const actualizarCampo = useCallback(
    <K extends keyof FormularioCrearTanda>(campo: K, valor: FormularioCrearTanda[K]) => {
      setFormulario((actual) => ({
        ...actual,
        [campo]: valor,
      }));
    },
    []
  );

  const toggleIntegrante = useCallback(
    (userId: string) => {
      if (!admin || userId === admin.id) {
        return;
      }

      setSeleccionadosIds((actual) =>
        actual.includes(userId)
          ? actual.filter((id) => id !== userId)
          : [...actual, userId]
      );
    },
    [admin]
  );

  const moverArriba = useCallback((index: number) => {
    if (index <= 0) {
      return;
    }

    setSeleccionadosIds((actual) => moverElemento(actual, index, index - 1));
  }, []);

  const moverAbajo = useCallback((index: number) => {
    setSeleccionadosIds((actual) => {
      if (index < 0 || index >= actual.length - 1) {
        return actual;
      }

      return moverElemento(actual, index, index + 1);
    });
  }, []);

  const crearTanda = useCallback(async () => {
    if (!admin?.id) {
      throw new Error("No se encontro el administrador autenticado");
    }

    if (!formulario.nombre.trim()) {
      throw new Error("Escribe el nombre de la tanda");
    }

    if (!formulario.monto.trim() || Number(formulario.monto) <= 0) {
      throw new Error("Ingresa un monto valido");
    }

    if (!formulario.participantes.trim() || Number(formulario.participantes) <= 0) {
      throw new Error("Ingresa un numero valido de participantes");
    }

    if (!formulario.fecha.trim()) {
      throw new Error("Ingresa la fecha de inicio");
    }

    if (seleccionadosIds.length > Number(formulario.participantes)) {
      throw new Error("La cantidad de integrantes seleccionados supera el limite de participantes");
    }

    try {
      setGuardando(true);

      const response = await crearTandaAdmin({
        nombre: formulario.nombre.trim(),
        pago: Number(formulario.monto),
        participantes: Number(formulario.participantes),
        fecha: formulario.fecha.trim(),
        frecuencia: formulario.frecuencia,
        descripcion: formulario.descripcion.trim(),
        estado: formulario.estado,
        pagoRealizados: 0,
        turno: 1,
        creador: admin.id,
        integrantes: seleccionadosIds,
        imagenUri: formulario.imagenUri || undefined,
      });

      setFormulario(formInicial);
      setSeleccionadosIds([admin.id]);

      return response;
    } finally {
      setGuardando(false);
    }
  }, [admin, formulario, seleccionadosIds]);

  return {
    admin,
    formulario,
    actualizarCampo,
    amigosDisponibles,
    seleccionadosIds,
    integrantesOrdenados,
    toggleIntegrante,
    moverArriba,
    moverAbajo,
    crearTanda,
    cargandoInicial,
    guardando,
    errorCarga,
  };
}
