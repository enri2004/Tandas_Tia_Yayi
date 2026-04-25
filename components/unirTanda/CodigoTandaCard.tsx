import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TandaItem } from "../../utils/api/Tandas/tandasTypes";

type Props = {
  tanda: TandaItem;
  currentUserId?: string;
  joining?: boolean;
  onJoin: (tandaId: string) => void;
};

export default function CodigoTandaCard({ tanda, currentUserId = "", joining = false, onJoin }: Props) {
  const integrantes = Array.isArray(tanda.integrantes) ? tanda.integrantes : [];
  const yaEsIntegrante = integrantes.some((integrante) =>
    typeof integrante === "string" ? integrante === currentUserId : integrante?._id === currentUserId
  );
  const lugaresDisponibles = Math.max((Number(tanda.participantes || 0) - integrantes.length), 0);

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Invitacion detectada</Text>
      <Text style={styles.title}>{tanda.nombre}</Text>
      {tanda.codigoInvitacion ? <Text style={styles.code}>{tanda.codigoInvitacion}</Text> : null}
      {tanda.descripcion ? <Text style={styles.description}>{tanda.descripcion}</Text> : null}

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Pago: ${tanda.pago}</Text>
        <Text style={styles.metaText}>Participantes: {tanda.participantes}</Text>
      </View>

      <Pressable
        style={[styles.button, (yaEsIntegrante || lugaresDisponibles === 0 || joining) && styles.buttonDisabled]}
        onPress={() => onJoin(tanda._id)}
        disabled={yaEsIntegrante || lugaresDisponibles === 0 || joining}
      >
        <Text style={styles.buttonText}>
          {joining ? "Uniendo..." : yaEsIntegrante ? "Ya estas unido" : lugaresDisponibles === 0 ? "Sin cupo" : "Unirme a esta tanda"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
  },
  eyebrow: {
    color: "#3b82f6",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  code: {
    marginTop: 6,
    color: "#22c55e",
    fontWeight: "700",
  },
  description: {
    color: "#4b5563",
    marginTop: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  metaText: {
    color: "#4b5563",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
