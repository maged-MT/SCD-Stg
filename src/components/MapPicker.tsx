"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (coordinates: [number, number], address: string) => void;
  initialCoordinates?: [number, number] | null;
  initialAddress?: string;
}

const MapPicker = ({ onLocationSelect, initialCoordinates, initialAddress }: MapPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState(initialAddress || "");

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en`
      );
      const data = await res.json();
      if (data?.display_name) {
        return data.display_name.split(", ").slice(0, 4).join(", ");
      }
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const getCurrentLocation = (): Promise<[number, number]> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
        reject,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      try {
        setLoading(true);
        setError(null);

        const L = await import("leaflet");
        if (cancelled) return;

        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        let center: [number, number] = [25.2048, 55.2708];
        let initCoords = initialCoordinates;

        try {
          const userLocation = await getCurrentLocation();
          if (cancelled) return;
          center = userLocation;
          if (!initCoords) initCoords = userLocation;
        } catch {
          if (cancelled) return;
          setError("Could not get your current location. Click anywhere on the map to set it.");
        }

        if (cancelled) return;

        const map = L.map(mapRef.current!).setView(center, 13);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const markerIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="background:linear-gradient(135deg,#2B6CF5 0%,#1a4fcc 100%);width:40px;height:40px;border-radius:50%;border:4px solid white;box-shadow:0 4px 16px rgba(43,108,245,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;">📍</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        if (initCoords) {
          const marker = L.marker(initCoords, { icon: markerIcon }).addTo(map);
          markerRef.current = marker;
          if (!initialAddress || initialAddress.trim() === "") {
            const geocoded = await reverseGeocode(initCoords[0], initCoords[1]);
            if (cancelled) return;
            setAddress(geocoded);
            onLocationSelect(initCoords, geocoded);
          } else {
            setAddress(initialAddress);
          }
        }

        map.on("click", async (e) => {
          const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
          if (markerRef.current) map.removeLayer(markerRef.current);
          const marker = L.marker(coords, { icon: markerIcon }).addTo(map);
          markerRef.current = marker;
          const newAddress = await reverseGeocode(coords[0], coords[1]);
          setAddress(newAddress);
          onLocationSelect(coords, newAddress);
        });

        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Failed to load map. Please refresh the page.");
          setLoading(false);
        }
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUseMyLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const coords = await getCurrentLocation();

      if (mapInstanceRef.current) {
        if (markerRef.current) mapInstanceRef.current.removeLayer(markerRef.current);
        const L = await import("leaflet");
        const markerIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="background:linear-gradient(135deg,#2B6CF5 0%,#1a4fcc 100%);width:40px;height:40px;border-radius:50%;border:4px solid white;box-shadow:0 4px 16px rgba(43,108,245,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;">📍</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
        const marker = L.marker(coords, { icon: markerIcon }).addTo(mapInstanceRef.current);
        markerRef.current = marker;
        mapInstanceRef.current.setView(coords, 15);
        const newAddress = await reverseGeocode(coords[0], coords[1]);
        setAddress(newAddress);
        onLocationSelect(coords, newAddress);
      }
    } catch {
      setError("Could not get your current location. Please select on the map.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-light-bg border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-blue" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-navy">Select Inspection Location</p>
            <p className="text-xs text-gray-text">Click on the map or use your current location</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-blue text-blue text-xs font-bold hover:bg-blue/5 transition-colors disabled:opacity-50"
        >
          <Navigation size={13} />
          Use My Location
        </button>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        style={{ height: 350 }}
        className="w-full"
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-[1000] gap-3">
          <div className="w-9 h-9 border-4 border-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-text font-semibold">Loading map…</p>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="absolute top-[60px] left-3 right-3 bg-red-50 border border-red-200 rounded-xl p-2.5 z-[1000]">
          <p className="text-xs text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* Selected address pill */}
      {address && !loading && (
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 border border-border rounded-xl px-3 py-2 z-[1000] flex items-center gap-2 shadow-sm">
          <MapPin size={14} className="text-blue shrink-0" />
          <p className="text-xs font-semibold text-navy truncate">{address}</p>
        </div>
      )}
    </div>
  );
};

export default MapPicker;
