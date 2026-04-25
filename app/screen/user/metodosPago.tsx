import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import HeaderConfig from "../../../components/Confi/HeaderConfi";
import FormCard from "../../../components/Confi/FormCard";
import InfoCard from "../../../components/Confi/InfoCard";
import { obtenerUsuarioGuardado } from "../../../utils/api/login-registrar/authStorage";
import {
  guardarMetodosPagoUsuario,
  MetodoPagoItem,
  obtenerMetodosPagoUsuario,
} from "../../../utils/api/configuracion/configuracionStorage";

const emptyForm = {
  alias: "",
  banco: "",
  referencia: "",
};

export default function MetodosPagoScreen() {
  const [userId, setUserId] = useState("");
  const [metodos, setMetodos] = useState<MetodoPagoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const cargarDatos = useCallback(async () => {
    const sesion = await obtenerUsuarioGuardado();
    if (!sesion?.id) return;

    setUserId(sesion.id);
    const data = await obtenerMetodosPagoUsuario(sesion.id);
    setMetodos(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [cargarDatos])
  );

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const guardar = async () => {
    if (!userId) return;

    if (!form.alias.trim() || !form.banco.trim() || !form.referencia.trim()) {
      Alert.alert("Campos obligatorios", "Completa alias, banco y referencia");
      return;
    }

    let nuevosMetodos: MetodoPagoItem[];

    if (editingId) {
      nuevosMetodos = metodos.map((item) =>
        item.id === editingId
          ? { ...item, alias: form.alias.trim(), banco: form.banco.trim(), referencia: form.referencia.trim() }
          : item
      );
    } else {
      nuevosMetodos = [
        ...metodos,
        {
          id: `${Date.now()}`,
          alias: form.alias.trim(),
          banco: form.banco.trim(),
          referencia: form.referencia.trim(),
        },
      ];
    }

    await guardarMetodosPagoUsuario(userId, nuevosMetodos);
    setMetodos(nuevosMetodos);
    resetForm();
    Alert.alert("Exito", editingId ? "Metodo actualizado" : "Metodo agregado");
  };

  const editar = (item: MetodoPagoItem) => {
    setEditingId(item.id);
    setForm({
      alias: item.alias,
      banco: item.banco,
      referencia: item.referencia,
    });
  };

  const eliminar = async (id: string) => {
    if (!userId) return;

    const nuevosMetodos = metodos.filter((item) => item.id !== id);
    await guardarMetodosPagoUsuario(userId, nuevosMetodos);
    setMetodos(nuevosMetodos);

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderConfig />
        <FormCard
          title="Metodos de pago"
          subtitle="Aqui puedes dejar guardados tus datos de pago. Por ahora se almacenan localmente para dejar la base funcional lista."
          fields={[
            {
              key: "alias",
              label: "Alias",
              value: form.alias,
              onChangeText: (text) => setForm((prev) => ({ ...prev, alias: text })),
              placeholder: "Ej. Tarjeta principal",
            },
            {
              key: "banco",
              label: "Banco",
              value: form.banco,
              onChangeText: (text) => setForm((prev) => ({ ...prev, banco: text })),
              placeholder: "Nombre del banco",
            },
            {
              key: "referencia",
              label: "Referencia",
              value: form.referencia,
              onChangeText: (text) => setForm((prev) => ({ ...prev, referencia: text })),
              placeholder: "CLABE, cuenta o referencia",
            },
          ]}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={guardar}>
          <Text style={styles.primaryButtonText}>
            {editingId ? "Guardar cambios" : "Agregar metodo"}
          </Text>
        </TouchableOpacity>

        {editingId ? (
          <TouchableOpacity style={styles.secondaryButton} onPress={resetForm}>
            <Text style={styles.secondaryButtonText}>Cancelar edicion</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.sectionTitle}>Mis metodos</Text>

        {!metodos.length ? (
          <InfoCard
            title="No tienes metodos guardados"
            description="Agrega uno para tener esta seccion lista mientras conectamos el backend especifico de metodos de pago."
          />
        ) : (
          metodos.map((item) => (
            <View key={item.id} style={styles.methodCard}>
              <Text style={styles.methodTitle}>{item.alias}</Text>
              <Text style={styles.methodText}>{item.banco}</Text>
              <Text style={styles.methodText}>{item.referencia}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => editar(item)}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => eliminar(item.id)}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  methodCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  methodText: {
    color: "#6b7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  editText: {
    color: "#1d4ed8",
    fontWeight: "700",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#b91c1c",
    fontWeight: "700",
  },
});
