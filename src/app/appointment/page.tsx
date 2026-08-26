"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, Home, Building2, Calendar, Clock, ChevronRight, Car, TrendingUp } from "lucide-react";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

interface MarketValue {
  adjustedPrice?: { min: number; max: number; average: number };
  minPrice?: number;
  maxPrice?: number;
  averagePrice?: number;
  confidence?: "high" | "medium" | "low";
  similarListings?: number;
}

function useMarketValue(makeName: string, modelName: string, year: string, mileage: string, spec: string) {
  const [data, setData] = useState<MarketValue | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!makeName || !modelName || !year) return;
    setLoading(true);
    const params = new URLSearchParams({ makeName, modelName, year, mileage, spec });
    fetch(`/api/market-value?${params}`)
      .then((r) => r.json())
      .then((json) => {
        const mv = json?.data?.marketValue ?? json?.marketValue ?? null;
        setData(mv);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [makeName, modelName, year, mileage, spec]);

  return { data, loading };
}

const CONFIDENCE_LABEL: Record<string, string> = {
  high: "High Confidence",
  medium: "Medium Confidence",
  low: "Low Confidence",
};
const CONFIDENCE_COLOR: Record<string, string> = {
  high: "text-green-600 bg-green-50 border-green-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-gray-500 bg-gray-50 border-gray-200",
};

const CARMARKETHUB_URL = "https://www.carmarkethub.com/instant-sale";

const TIME_SLOTS = [
  { time: "9:00 AM - 11:00 AM", label: "Morning" },
  { time: "11:00 AM - 1:00 PM", label: "Late Morning" },
  { time: "1:00 PM - 3:00 PM", label: "Afternoon" },
  { time: "3:00 PM - 5:00 PM", label: "Late Afternoon" },
  { time: "5:00 PM - 7:00 PM", label: "Evening" },
];

function buildDays(count = 14) {
  const days: { iso: string; label: string; sub: string }[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString();
    days.push({
      iso,
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short" }),
      sub: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    });
  }
  return days;
}

function AppointmentContent() {
  const search = useSearchParams();

  const makeName = search.get("makeName") || "";
  const modelName = search.get("modelName") || "";
  const year = search.get("year") || "";
  const mileage = search.get("mileage") || "";
  const spec = search.get("spec") || "";

  const days = useMemo(() => buildDays(14), []);

  const [locationType, setLocationType] = useState<"home" | "branch">("home");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCoords, setLocationCoords] = useState<[number, number] | null>(null);
  const [selectedDate, setSelectedDate] = useState(days[0]?.iso || "");
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].time);

  const { data: marketValue, loading: mvLoading } = useMarketValue(makeName, modelName, year, mileage, spec);

  const handleLocationSelect = (coords: [number, number], address: string) => {
    setLocationCoords(coords);
    setLocationAddress(address);
  };

  const handleConfirm = () => {
    const params = new URLSearchParams({
      makeName,
      modelName,
      year,
      mileage,
      spec,
      modelId: "0",
      trimId: "0",
      city: locationAddress || "UAE",
      date: selectedDate,
      time: selectedTime,
      type: locationType,
      ...(locationCoords ? { lat: String(locationCoords[0]), lng: String(locationCoords[1]) } : {}),
    });
    window.location.href = `${CARMARKETHUB_URL}?${params.toString()}`;
  };

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff]">
      <div className="max-w-[760px] mx-auto px-4 pt-[96px] pb-16">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Lead Received
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-navy tracking-tight mb-3">
            Book Your Free Inspection
          </h1>
          <p className="text-gray-text leading-7">
            Choose how and when you&apos;d like our expert to evaluate your car.
            <br />It takes under 30 minutes and is completely free.
          </p>
        </div>

        {/* Car summary pill */}
        {(makeName || modelName) && (
          <div className="flex items-center gap-3 bg-white border border-border rounded-2xl px-5 py-4 mb-8 shadow-[0_2px_16px_rgba(43,108,245,0.08)]">
            <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center shrink-0">
              <Car size={20} className="text-blue" />
            </div>
            <div>
              <p className="text-xs text-gray-text font-semibold uppercase tracking-wide">Your Car</p>
              <p className="font-extrabold text-navy">
                {[year, makeName, modelName].filter(Boolean).join(" ")}
                {mileage && <span className="font-normal text-gray-text ml-2">· {mileage}</span>}
              </p>
            </div>
          </div>
        )}

        {/* Market Value Card — single price */}
        <div className="mb-6">
          {mvLoading && (
            <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4 shadow-[0_2px_16px_rgba(43,108,245,0.06)] animate-pulse">
              <div className="w-10 h-10 bg-light-bg rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-light-bg rounded w-1/3" />
                <div className="h-5 bg-light-bg rounded w-1/2" />
              </div>
            </div>
          )}

          {!mvLoading && marketValue && (() => {
            const min = marketValue.adjustedPrice?.min ?? marketValue.minPrice ?? 0;
            const max = marketValue.adjustedPrice?.max ?? marketValue.maxPrice ?? 0;
            const avg = marketValue.adjustedPrice?.average ?? marketValue.averagePrice ?? Math.floor((min + max) / 2);
            const conf = marketValue.confidence ?? "medium";
            const listings = marketValue.similarListings;
            const fmt = (n: number) => `AED ${n.toLocaleString()}`;

            return (
              <div className="bg-white border border-border rounded-2xl p-5 shadow-[0_2px_16px_rgba(43,108,245,0.08)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center shrink-0">
                      <TrendingUp size={20} className="text-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-text font-semibold uppercase tracking-wide">Estimated Market Value</p>
                      <p className="font-black text-navy text-2xl leading-tight">{fmt(avg)}</p>
                      {listings != null && (
                        <p className="text-xs text-gray-text mt-0.5">Based on {listings} similar listings</p>
                      )}
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${CONFIDENCE_COLOR[conf]}`}>
                    {CONFIDENCE_LABEL[conf]}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="space-y-6">

          {/* Step 1 — Location type */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">1</span>
              Inspection Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setLocationType("home")}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all duration-200 ${
                  locationType === "home"
                    ? "border-blue bg-blue/5 shadow-[0_0_0_4px_rgba(43,108,245,0.08)]"
                    : "border-border hover:border-blue/40"
                }`}
              >
                <Home size={28} className={locationType === "home" ? "text-blue" : "text-gray-text"} />
                <div className="text-center">
                  <p className={`font-extrabold text-sm ${locationType === "home" ? "text-blue" : "text-navy"}`}>
                    Home Visit
                  </p>
                  <p className="text-xs text-gray-text mt-0.5">We come to you</p>
                </div>
                {locationType === "home" && (
                  <div className="w-5 h-5 rounded-full bg-blue flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setLocationType("branch")}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all duration-200 ${
                  locationType === "branch"
                    ? "border-blue bg-blue/5 shadow-[0_0_0_4px_rgba(43,108,245,0.08)]"
                    : "border-border hover:border-blue/40"
                }`}
              >
                <Building2 size={28} className={locationType === "branch" ? "text-blue" : "text-gray-text"} />
                <div className="text-center">
                  <p className={`font-extrabold text-sm ${locationType === "branch" ? "text-blue" : "text-navy"}`}>
                    Branch Visit
                  </p>
                  <p className="text-xs text-gray-text mt-0.5">Visit our office</p>
                </div>
                {locationType === "branch" && (
                  <div className="w-5 h-5 rounded-full bg-blue flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Step 2 — Map location picker */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">2</span>
              <MapPin size={16} className="text-blue" />
              Your Location
            </h2>
            <MapPicker onLocationSelect={handleLocationSelect} />
            {!locationAddress && (
              <p className="text-xs text-gray-text mt-3 text-center">
                Allow location access or click on the map to set your inspection address
              </p>
            )}
          </div>

          {/* Step 3 — Date */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">3</span>
              <Calendar size={16} className="text-blue" />
              Pick a Date
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((day) => (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => setSelectedDate(day.iso)}
                  className={`flex flex-col items-center shrink-0 w-[72px] py-3 rounded-xl border-2 text-sm transition-all duration-200 ${
                    selectedDate === day.iso
                      ? "border-blue bg-blue text-white shadow-[0_4px_12px_rgba(43,108,245,0.35)]"
                      : "border-border text-navy hover:border-blue/40"
                  }`}
                >
                  <span className={`text-[11px] font-semibold mb-1 ${selectedDate === day.iso ? "text-white/80" : "text-gray-text"}`}>
                    {day.label}
                  </span>
                  <span className="font-extrabold text-base leading-none">{day.sub.split(" ")[0]}</span>
                  <span className={`text-[11px] mt-0.5 ${selectedDate === day.iso ? "text-white/80" : "text-gray-text"}`}>
                    {day.sub.split(" ")[1]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4 — Time */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">4</span>
              <Clock size={16} className="text-blue" />
              Pick a Time
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all duration-200 ${
                    selectedTime === slot.time
                      ? "border-blue bg-blue/5"
                      : "border-border hover:border-blue/40"
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-extrabold ${selectedTime === slot.time ? "text-blue" : "text-navy"}`}>
                      {slot.time}
                    </p>
                    <p className="text-xs text-gray-text">{slot.label}</p>
                  </div>
                  {selectedTime === slot.time && (
                    <div className="w-5 h-5 rounded-full bg-blue flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Summary + Confirm */}
          <div className="bg-navy rounded-2xl p-6 text-white">
            <h3 className="font-extrabold text-lg mb-4">Appointment Summary</h3>
            <div className="space-y-2 mb-6 text-white/80 text-sm">
              <div className="flex justify-between">
                <span>Type</span>
                <span className="text-white font-semibold capitalize">{locationType === "home" ? "🏠 Home Visit" : "🏢 Branch Visit"}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Location</span>
                <span className="text-white font-semibold text-right truncate">
                  {locationAddress ? `📍 ${locationAddress}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span className="text-white font-semibold">📅 {formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span className="text-white font-semibold">🕐 {selectedTime}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue text-white rounded-xl font-extrabold text-[15px] hover:-translate-y-0.5 hover:bg-blue-dark transition-all shadow-[0_8px_24px_rgba(43,108,245,0.4)]"
            >
              Confirm Appointment
              <ChevronRight size={18} />
            </button>
            <p className="text-center text-white/50 text-xs mt-3">
              You&apos;ll complete the booking on CarMarketHub — 100% free, no obligation
            </p>
          </div>

          <div className="text-center">
            <Link href="/" className="text-gray-text text-sm hover:text-blue transition-colors">
              ← Go back to home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-text font-semibold">Loading appointment…</p>
        </div>
      </div>
    }>
      <AppointmentContent />
    </Suspense>
  );
}
