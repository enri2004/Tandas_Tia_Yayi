import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { AdminTanda } from "../../utils/api/admin/adminTypes";
import ListaTandas from "./ListaTandas";

type Props = {
  tandas: AdminTanda[];
  loading?: boolean;
  error?: string;
  maxHeight: number;
};

export default function TandasAdminPanel({
  tandas,
  loading = false,
  error = "",
  maxHeight,
}: Props) {
  const { tandasRowHeight } = useResponsive();
  const panelHeight =
    loading || error || !tandas.length
      ? Math.min(maxHeight, tandasRowHeight + 48)
      : tandas.length > 3
      ? maxHeight
      : tandas.length * tandasRowHeight + 24;

  return (
    <View style={[styles.panel, { height: panelHeight, maxHeight }]}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} bounces={false}>
        <ListaTandas tandas={tandas} loading={loading} error={error} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    overflow: "hidden",
  },
});
