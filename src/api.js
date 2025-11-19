// src/api.js

// Base de la API (env o localhost)
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  `${window.location.protocol}//${window.location.hostname}:5000`;

// Función genérica para pedir a la API
async function request(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const headers = isForm ? {} : { "Content-Type": "application/json" };

  const res = await fetch(API_BASE + path, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.ok === false) {
    const msg = json.error || "Error en la API";
    throw new Error(msg);
  }

  return json;
}

export const api = {
  // Listado general de reportes (público / app ciudadana)
  async listReports({ status, limit } = {}) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (limit) params.set("limit", String(limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return request("/api/reports" + qs, { method: "GET" });
  },

  // Crear un nuevo reporte desde el móvil
  async createReport({ report_type, description, latitude, longitude, image, plate_text }) {
    const form = new FormData();
    form.append("report_type", report_type || "emergencia");
    form.append("description", description || "");
    form.append("latitude", String(latitude));
    form.append("longitude", String(longitude));
    if (plate_text) {
      form.append("plate_text", plate_text);
    }
    if (image) {
      form.append("image", image);
    }
    return request("/api/reports", {
      method: "POST",
      body: form,
    });
  },

  // Búsqueda de reportes cercanos por radio
  async nearbyReports({ lat, lng, radius_km = 0.5 }) {
    const params = new URLSearchParams({
      lat: String(lat),
      lng: String(lng),
      radius_km: String(radius_km),
    });
    return request(`/api/reports/nearby?${params.toString()}`, { method: "GET" });
  },

  // Enviar punto de tracking para un reporte (seguimiento en mapa)
  async sendTrackPoint(reportId, { latitude, longitude }) {
    return request(`/api/reports/${reportId}/track`, {
      method: "POST",
      body: JSON.stringify({ latitude, longitude }),
    });
  },

  // Obtener trazado de un reporte
  async getTrack(reportId) {
    return request(`/api/reports/${reportId}/track`, { method: "GET" });
  },

  // Heatmap general de incidentes
  async getHeatmap() {
    return request("/api/heatmap", { method: "GET" });
  },

  // --- Zona Admin ---

  async adminListReports({ status } = {}) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return request("/api/admin/reports" + qs, { method: "GET" });
  },

  async adminChangeStatus(reportId, status) {
    return request(`/api/admin/reports/${reportId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // --- Botón de pánico ---

  async panic({ latitude, longitude, underDuress = false, mode = "normal", userId = null }) {
    return request("/api/panic", {
      method: "POST",
      body: JSON.stringify({
        latitude,
        longitude,
        under_duress: underDuress,
        mode,
        user_id: userId,
      }),
    });
  },
};
