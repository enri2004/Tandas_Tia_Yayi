import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  fecha: string;
  onPress?: () => void;
  onChangeText?: (value: string) => void;
  placeholder?: string;
};

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

const pad = (value: number) => String(value).padStart(2, "0");

const formatDate = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

const parseDate = (value: string) => {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  const slashMatch = normalized.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
};

export default function FechaSelector({
  fecha,
  onPress,
  onChangeText,
  placeholder = "DD/MM/AAAA",
}: Props) {
  const initialDate = parseDate(fecha) || new Date();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(initialDate.getMonth());
  const [displayYear, setDisplayYear] = useState(initialDate.getFullYear());

  const selectedDate = useMemo(() => parseDate(fecha), [fecha]);

  const daysInMonth = useMemo(() => {
    const firstDay = new Date(displayYear, displayMonth, 1);
    const totalDays = new Date(displayYear, displayMonth + 1, 0).getDate();
    const leadingBlanks = firstDay.getDay();
    const cells: (number | null)[] = [];

    for (let i = 0; i < leadingBlanks; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= totalDays; day += 1) {
      cells.push(day);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [displayMonth, displayYear]);

  const abrirCalendario = () => {
    const baseDate = parseDate(fecha) || new Date();
    setDisplayMonth(baseDate.getMonth());
    setDisplayYear(baseDate.getFullYear());
    setCalendarVisible(true);
    onPress?.();
  };

  const cerrarCalendario = () => setCalendarVisible(false);

  const cambiarMes = (direction: -1 | 1) => {
    if (direction === -1) {
      if (displayMonth === 0) {
        setDisplayMonth(11);
        setDisplayYear((current) => current - 1);
        return;
      }

      setDisplayMonth((current) => current - 1);
      return;
    }

    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear((current) => current + 1);
      return;
    }

    setDisplayMonth((current) => current + 1);
  };

  const seleccionarDia = (day: number) => {
    const date = new Date(displayYear, displayMonth, day);
    onChangeText?.(formatDate(date));
    cerrarCalendario();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de inicio</Text>

      <View style={styles.box}>
        <TextInput
          value={fecha}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        <Pressable onPress={abrirCalendario} hitSlop={10}>
          <Ionicons name="calendar-outline" size={22} color="#6b7280" />
        </Pressable>
      </View>

      <Modal transparent visible={calendarVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => cambiarMes(-1)} style={styles.navButton}>
                <Ionicons name="chevron-back" size={20} color="#111827" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>
                {MONTHS[displayMonth]} {displayYear}
              </Text>

              <TouchableOpacity onPress={() => cambiarMes(1)} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
              {DAYS.map((day) => (
                <Text key={day} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.grid}>
              {daysInMonth.map((day, index) => {
                const isSelected =
                  day !== null &&
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === displayMonth &&
                  selectedDate?.getFullYear() === displayYear;

                return (
                  <TouchableOpacity
                    key={`${displayMonth}-${displayYear}-${index}`}
                    disabled={day === null}
                    onPress={() => day && seleccionarDia(day)}
                    style={[
                      styles.dayCell,
                      day === null && styles.dayCellEmpty,
                      isSelected && styles.dayCellSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        day === null && styles.dayTextEmpty,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {day ?? ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={cerrarCalendario}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    color: "#000",
    marginBottom: 5,
  },
  box: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: "#000",
    flex: 1,
    paddingRight: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    color: "#6b7280",
    fontWeight: "700",
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.285%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderRadius: 18,
  },
  dayCellEmpty: {
    backgroundColor: "transparent",
  },
  dayCellSelected: {
    backgroundColor: "#4285f4",
  },
  dayText: {
    color: "#111827",
    fontSize: 14,
  },
  dayTextEmpty: {
    color: "transparent",
  },
  dayTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#4285f4",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
