import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { AdminDashboardResponse } from "./adminTypes";

const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(valor || 0));

const formatearFecha = (fecha: Date | string) => {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(fecha));
  } catch {
    return String(fecha);
  }
};

const construirFilasActividad = (data: AdminDashboardResponse) => {
  if (!data.actividadReciente?.length) {
    return `<tr><td colspan="3">Sin actividad reciente</td></tr>`;
  }

  return data.actividadReciente
    .slice(0, 8)
    .map(
      (item) => `
        <tr>
          <td>${item.titulo}</td>
          <td>${item.descripcion}</td>
          <td>${item.createdAt ? formatearFecha(item.createdAt) : ""}</td>
        </tr>
      `
    )
    .join("");
};

const construirFilasTandas = (data: AdminDashboardResponse) => {
  if (!data.tandas?.length) {
    return `<tr><td colspan="5">Sin tandas registradas</td></tr>`;
  }

  return data.tandas
    .slice(0, 12)
    .map(
      (item) => `
        <tr>
          <td>${item.nombre}</td>
          <td>${item.estadoTexto || (item.estado === false ? "Finalizada" : "Activa")}</td>
          <td>${item.totalIntegrantes}/${item.participantes}</td>
          <td>${formatearMoneda(item.pago)}</td>
          <td>${item.comprobantesPendientes}</td>
        </tr>
      `
    )
    .join("");
};

const construirHtml = (data: AdminDashboardResponse) => {
  const resumen = data.resumen;
  const generado = formatearFecha(new Date());

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #111827;
            padding: 24px;
          }
          .header {
            background: #f5f6fa;
            border-radius: 18px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .subtitle {
            color: #4b5563;
            font-size: 14px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
          }
          .metric {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            padding: 14px;
          }
          .metric-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .metric-value {
            font-size: 20px;
            font-weight: bold;
          }
          .section {
            margin-top: 18px;
            margin-bottom: 8px;
            font-size: 18px;
            font-weight: bold;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 10px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #f5f6fa;
          }
          .bars {
            margin-top: 12px;
          }
          .bar-row {
            margin-bottom: 10px;
          }
          .bar-label {
            font-size: 12px;
            margin-bottom: 4px;
            color: #4b5563;
          }
          .bar-track {
            width: 100%;
            height: 10px;
            background: #e5e7eb;
            border-radius: 999px;
            overflow: hidden;
          }
          .bar-fill {
            height: 10px;
            border-radius: 999px;
          }
          .footer {
            margin-top: 24px;
            color: #6b7280;
            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Reporte Administrativo de Tandas</div>
          <div class="subtitle">Administrador: ${data.admin.nombre}</div>
          <div class="subtitle">Fecha de generacion: ${generado}</div>
        </div>

        <div class="grid">
          <div class="metric"><div class="metric-label">Tandas activas</div><div class="metric-value">${resumen.tandasActivas}</div></div>
          <div class="metric"><div class="metric-label">Tandas finalizadas</div><div class="metric-value">${resumen.tandasFinalizadas}</div></div>
          <div class="metric"><div class="metric-label">Pagos pendientes</div><div class="metric-value">${resumen.pagosPendientes}</div></div>
          <div class="metric"><div class="metric-label">Pagos completos</div><div class="metric-value">${resumen.pagosCompletos}</div></div>
          <div class="metric"><div class="metric-label">Total recaudado</div><div class="metric-value">${formatearMoneda(resumen.dineroRecaudado)}</div></div>
          <div class="metric"><div class="metric-label">Total esperado</div><div class="metric-value">${formatearMoneda(resumen.totalEsperado)}</div></div>
        </div>

        <div class="section">Resumen visual</div>
        <div class="bars">
          <div class="bar-row">
            <div class="bar-label">Tandas activas (${resumen.tandasActivas})</div>
            <div class="bar-track"><div class="bar-fill" style="width:${resumen.totalTandas ? (resumen.tandasActivas / resumen.totalTandas) * 100 : 0}%; background:#22c55e;"></div></div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Tandas finalizadas (${resumen.tandasFinalizadas})</div>
            <div class="bar-track"><div class="bar-fill" style="width:${resumen.totalTandas ? (resumen.tandasFinalizadas / resumen.totalTandas) * 100 : 0}%; background:#3b82f6;"></div></div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Pagos pendientes (${resumen.pagosPendientes})</div>
            <div class="bar-track"><div class="bar-fill" style="width:${(resumen.pagosPendientes + resumen.pagosCompletos) ? (resumen.pagosPendientes / (resumen.pagosPendientes + resumen.pagosCompletos)) * 100 : 0}%; background:#f59e0b;"></div></div>
          </div>
        </div>

        <div class="section">Tandas del administrador</div>
        <table>
          <thead>
            <tr>
              <th>Tanda</th>
              <th>Estado</th>
              <th>Integrantes</th>
              <th>Pago</th>
              <th>Pendientes</th>
            </tr>
          </thead>
          <tbody>
            ${construirFilasTandas(data)}
          </tbody>
        </table>

        <div class="section">Actividad reciente</div>
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${construirFilasActividad(data)}
          </tbody>
        </table>

        <div class="footer">Tanda App - Reporte generado automaticamente</div>
      </body>
    </html>
  `;
};

export const exportarReporteAdminPdf = async (data: AdminDashboardResponse) => {
  const html = construirHtml(data);
  const { uri } = await Print.printToFileAsync({ html, base64: false });

  const sharingDisponible = await Sharing.isAvailableAsync();
  if (sharingDisponible) {
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Compartir reporte PDF",
      UTI: ".pdf",
    });
  }

  return uri;
};
