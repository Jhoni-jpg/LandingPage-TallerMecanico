import { useEffect, useState } from "react";
import logoPage from "../assets/logo.png";

export default function MapUbication() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const lt = 10.99252;
      const lg = -74.78332;

      const map = L.map("map").setView([lt, lg], 13);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://maps.app.goo.gl/wB2Pfg5MiPGkRnet9">Ubicación directa</a>',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: logoPage.src,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([lt, lg], { icon: customIcon }).addTo(map);

      marker.bindPopup(
        `<b>AF | Tu taller automotriz de confianza</b><br>Barranquilla - Atlántico, Colombia`
      );

      // Evento: click → mostrar tarjeta flotante
      marker.on("click", () => {
        setSelected({
          title: "AF | Taller Automotriz",
          desc: "Barranquilla - Atlántico, Colombia. Mantenimiento, mecánica y más.",
        });
      });

      let userMarker = null;
      let routeLine = null;

      const btn = document.getElementById("btn-location");

      if (btn) {
        btn.addEventListener("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                if (userMarker) map.removeLayer(userMarker);
                if (routeLine) map.removeLayer(routeLine);

                userMarker = L.marker([lat, lng], {
                  icon: L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                    iconSize: [35, 35],
                    iconAnchor: [17, 35],
                  }),
                })
                  .addTo(map)
                  .bindPopup("📍 Tu ubicación actual")
                  .openPopup();

                routeLine = L.polyline(
                  [
                    [lat, lng],
                    [lt, lg],
                  ],
                  { color: "blue", weight: 3, dashArray: "5,5" }
                ).addTo(map);

                const bounds = L.latLngBounds([lat, lng], [lt, lg]);
                map.flyToBounds(bounds, { padding: [40, 40], duration: 1.5 });
              },
              () => alert("❌ No se pudo obtener tu ubicación")
            );
          } else {
            alert("⚠️ Tu navegador no soporta geolocalización.");
          }
        });
      }
    });
  }, []);

  return (
    <section className="bg-transparent mt-20 mb-40 relative">
      {/* Botón */}
      <button
        id="btn-location"
        className="ml-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        📍 Obtener mi ubicación
      </button>

      {/* Contenedor del mapa */}
      <div className="bg-transparent w-100 mx-20 mb-20 relative">
        <div
          className="bg-transparent z-0 rounded-20 w-full shadow-xl"
          id="map"
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        ></div>

        {/* Tarjeta flotante */}
        {selected && (
          <div
            className="
              absolute bottom-6 left-6
              bg-gray-900/80 backdrop-blur-md border border-white/20
              rounded-xl p-4 shadow-xl w-64 text-white
              animate-[fadein_.3s_ease-out]
            "
          >
            <h3 className="text-lg font-bold">{selected.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{selected.desc}</p>

            <button
              className="mt-3 text-sm text-red-300 hover:text-red-400"
              onClick={() => setSelected(null)}
            >
              Cerrar ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
