"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  Home,
  Building2,
  Calendar,
  Clock,
  ChevronRight,
  Car,
  TrendingUp,
  Lock,
  CheckCircle2,
  UserRound,
} from "lucide-react";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { ssr: false });

const SUBMIT_URL = "https://smartcardeals.net/apitestnew/submit_lead.php";

interface MarketValue {
  adjustedPrice?: { min: number; max: number; average: number };
  minPrice?: number;
  maxPrice?: number;
  averagePrice?: number;
  confidence?: "high" | "medium" | "low";
  similarListings?: number;
}

interface SavedProfile {
  name?: string;
  email?: string;
  cityId?: number;
}

interface City {
  id: number;
  name: string;
  slug: string;
  branchCount: number;
}

interface Branch {
  id: number;
  name: string;
  slug: string;
  cityId: number;
  address: string;
  openingHours?: string;
}

function useMarketValue(
  makeName: string,
  modelName: string,
  year: string,
  mileage: string,
  spec: string,
  trimId: string
) {
  const [data, setData] = useState<MarketValue | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!makeName || !modelName || !year) return;
    setLoading(true);
    const params = new URLSearchParams({
      makeName,
      modelName,
      year,
      mileage,
      spec,
      ...(trimId && { trimId }),
    });
    fetch(`/api/market-value?${params}`)
      .then((r) => r.json())
      .then((json) => {
        const mv = json?.data?.marketValue ?? json?.marketValue ?? null;
        setData(mv);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [makeName, modelName, year, mileage, spec, trimId]);

  return { data, loading };
}

function maskPrice(fmt: string) {
  return fmt.replace(/\d/g, "•");
}

function profileKey(phone: string) {
  return `scd_profile_971${phone}`;
}

function appointmentTime(slot: string) {
  const [time, period] = slot.split(" ");
  const [rawHour, minute] = time.split(":").map(Number);
  const hour = period === "PM" && rawHour !== 12 ? rawHour + 12 : period === "AM" && rawHour === 12 ? 0 : rawHour;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

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
  const router = useRouter();
  const search = useSearchParams();

  const makeName = search.get("makeName") || "";
  const modelName = search.get("modelName") || "";
  const year = search.get("year") || "";
  const mileage = search.get("mileage") || "";
  const spec = search.get("spec") || "";
  const bodyType = search.get("bodyType") || "";
  const engineSize = search.get("engineSize") || "";
  const trimId = search.get("trimId") || "";

  const days = useMemo(() => buildDays(14), []);

  // Contact details — always usable, independent of price verification
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [contactError, setContactError] = useState("");
  const [booking, setBooking] = useState(false);

  // Phone verification — required to book, since booking is a customer-authenticated call
  const [otp, setOtp] = useState("");
  const [otpStage, setOtpStage] = useState<"idle" | "sent" | "verified">("idle");
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Booking details
  const [locationType, setLocationType] = useState<"home" | "branch">("home");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCoords, setLocationCoords] = useState<[number, number] | null>(null);
  const [selectedDate, setSelectedDate] = useState(days[0]?.iso || "");
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].time);

  // Cities (home visits) and branches (branch visits) — both are managed lists from the platform
  const [cities, setCities] = useState<City[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [branchId, setBranchId] = useState<number | null>(null);

  const { data: marketValue, loading: mvLoading } = useMarketValue(makeName, modelName, year, mileage, spec, trimId);
  const verified = otpStage === "verified" && !!accessToken;
  const selectedCity = useMemo(() => cities.find((c) => c.id === cityId) || null, [cities, cityId]);
  const selectedBranch = useMemo(() => branches.find((b) => b.id === branchId) || null, [branches, branchId]);

  useEffect(() => {
    fetch("/api/locations/cities")
      .then((r) => r.json())
      .then((json) => setCities(Array.isArray(json) ? json : []))
      .catch(() => setCities([]));
  }, []);

  useEffect(() => {
    if (locationType !== "branch" || !selectedCity) {
      setBranches([]);
      return;
    }
    setBranchesLoading(true);
    fetch(`/api/locations/branches?city=${encodeURIComponent(selectedCity.slug)}`)
      .then((r) => r.json())
      .then((json) => setBranches(Array.isArray(json) ? json : []))
      .catch(() => setBranches([]))
      .finally(() => setBranchesLoading(false));
  }, [locationType, selectedCity]);

  const handleLocationSelect = (coords: [number, number], address: string) => {
    setLocationCoords(coords);
    setLocationAddress(address);
  };

  const handlePhoneInput = (val: string) => {
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("971")) digits = digits.slice(3);
    if (digits.startsWith("0")) digits = digits.slice(1);
    setPhone(digits);
    // Changing the number invalidates any in-progress / completed verification for the old one.
    if (otpStage !== "idle") {
      setOtpStage("idle");
      setOtp("");
      setOtpError("");
      setAccessToken(null);
    }
  };

  // Prefill contact details from a previous visit — verification always starts fresh for a new booking.
  useEffect(() => {
    try {
      if (phone.length !== 9) return;
      const raw = window.localStorage.getItem(profileKey(phone));
      if (!raw) return;
      const saved: SavedProfile = JSON.parse(raw);
      setName((prev) => prev || saved.name || prev);
      setEmail((prev) => prev || saved.email || prev);
      setCityId((prev) => prev ?? saved.cityId ?? prev);
    } catch {}
  }, [phone]);

  const handleSendOtp = async () => {
    setOtpError("");
    if (phone.length < 9 || !phone.startsWith("5")) {
      setOtpError("⚠️ Please enter a valid UAE phone number (e.g. 5X XXX XXXX).");
      return;
    }
    setOtpSubmitting(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+971" + phone }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setOtpError(json?.message || "Could not send the code. Please try again.");
        return;
      }
      setOtpStage("sent");
    } catch {
      setOtpError("Could not send the code. Please try again.");
    } finally {
      setOtpSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    if (otp.length !== 6) {
      setOtpError("Enter the 6-digit code.");
      return;
    }
    setOtpSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: "+971" + phone, otp }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setOtpError(json?.message || "Incorrect code. Please try again.");
        return;
      }
      const token = json?.accessToken || json?.access_token || json?.token || json?.data?.accessToken || json?.data?.access_token;
      if (!token) {
        setOtpError("Verification succeeded but no token was returned. Please try again.");
        return;
      }
      setAccessToken(token);
      setOtpStage("verified");
    } catch {
      setOtpError("Incorrect code. Please try again.");
    } finally {
      setOtpSubmitting(false);
    }
  };

  const handleChangeNumber = () => {
    setOtpStage("idle");
    setOtp("");
    setOtpError("");
  };

  const handleConfirm = async () => {
    setContactError("");
    if (!name.trim() || phone.length < 9 || !phone.startsWith("5") || !email.trim() || !cityId) {
      setContactError("Please fill in your name, phone, email, and city to continue.");
      return;
    }
    if (!verified || !accessToken) {
      setContactError("Please verify your phone number above to book the appointment.");
      return;
    }
    if (locationType === "home" && (!locationAddress || !locationCoords)) {
      setContactError("Please set your inspection address on the map.");
      return;
    }
    if (locationType === "branch" && !branchId) {
      setContactError("Please select a branch.");
      return;
    }

    setBooking(true);
    try {
      const bookingResponse = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          appointmentDate: selectedDate.slice(0, 10),
          appointmentTime: appointmentTime(selectedTime),
          name: name.trim(),
          locationMode: locationType,
          ...(locationType === "home"
            ? { cityId, address: locationAddress, latitude: locationCoords?.[0], longitude: locationCoords?.[1] }
            : { branchId }),
          makeName: makeName || undefined,
          modelName: modelName || undefined,
          year: year || undefined,
          km: mileage || undefined,
        }),
      });
      const bookingResult = await bookingResponse.json().catch(() => null);
      if (!bookingResponse.ok) {
        if (bookingResponse.status === 401) {
          setAccessToken(null);
          setOtpStage("idle");
          throw new Error("Your verification expired. Please verify your phone number again.");
        }
        const message = Array.isArray(bookingResult?.error) ? bookingResult.error.join(", ") : bookingResult?.error || bookingResult?.message;
        throw new Error(message || "Unable to book your appointment. Please try again.");
      }
    } catch (error) {
      setContactError(error instanceof Error ? error.message : "Unable to book your appointment. Please try again.");
      setBooking(false);
      return;
    }

    const leadPayload = new URLSearchParams({
      company_name: name.trim(),
      phone: "971" + phone,
      email: email.trim(),
      make: makeName,
      model: modelName,
      year,
      mileage,
      specs: spec,
      emirate: selectedCity?.name || "",
      ...(bodyType && { body_type: bodyType }),
      ...(engineSize && { engine_size: engineSize }),
      owner_id: "1",
      lead_source_id: "1",
      lead_status_id: "1",
    });

    fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: leadPayload.toString(),
      keepalive: true,
    }).catch(() => {});

    try {
      window.localStorage.setItem(
        profileKey(phone),
        JSON.stringify({ name: name.trim(), email: email.trim(), cityId })
      );
    } catch {}

    router.push("/thank-you");
  };

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  const selectCls =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-[10px] text-sm text-gray-text bg-light-bg appearance-none cursor-pointer outline-none transition-all focus:border-blue focus:bg-white focus:text-navy focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]";
  const inputCls =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-[10px] text-sm text-gray-text bg-light-bg outline-none transition-all focus:border-blue focus:bg-white focus:text-navy focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 pt-[96px] pb-16">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Valuation Ready
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-navy tracking-tight mb-3">
            Your Car&apos;s Estimated Value
          </h1>
          <p className="text-gray-text leading-7">
            Book your free inspection below — verify your phone number to also see your exact offer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Market Value Card — the price stays masked until phone is verified */}
            <div>
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
            const fmt = (n: number) => `AED ${n.toLocaleString()}`;

            return (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(43,108,245,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp size={22} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-text font-semibold uppercase tracking-wide">Estimated Market Value</p>
                    <p className="font-black text-navy text-3xl leading-tight tracking-tight">
                      {verified ? fmt(avg) : maskPrice(fmt(avg))}
                    </p>
                    {verified ? (
                      <p className="text-xs text-blue font-semibold mt-0.5">Book Appointment now</p>
                    ) : (
                      <p className="text-xs text-blue font-semibold mt-0.5 flex items-center gap-1">
                        <Lock size={12} /> Verify your phone number below to unlock
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

            {/* Car summary pill */}
            {(makeName || modelName) && (
          <div className="flex items-center gap-3 bg-white border border-border rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(43,108,245,0.08)]">
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
          </aside>

          <main className="space-y-6 min-w-0">
            {/* Step 1 — Contact Details (phone verification here is optional, only unlocks the price above) */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">1</span>
              <UserRound size={16} className="text-blue" />
              Your Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone + optional verify-to-unlock-price flow */}
              <div className="sm:col-span-2">
                <div className="flex border-[1.5px] border-border rounded-[10px] overflow-hidden bg-light-bg focus-within:border-blue focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(43,108,245,0.1)] transition-all">
                  <span className="flex items-center gap-1 px-3 bg-blue/5 border-r border-border text-navy font-bold text-sm whitespace-nowrap shrink-0">
                    🇦🇪 +971
                  </span>
                  <input
                    type="tel"
                    className="flex-1 px-3 py-3 bg-transparent text-sm text-navy outline-none"
                    placeholder="5X XXX XXXX"
                    value={phone}
                    onChange={(e) => handlePhoneInput(e.target.value)}
                    maxLength={10}
                    required
                  />
                  {verified && (
                    <span className="flex items-center gap-1 px-3 text-green-600 text-xs font-bold shrink-0">
                      <CheckCircle2 size={14} /> Verified
                    </span>
                  )}
                </div>

                {!verified && otpStage === "idle" && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSubmitting}
                    className="mt-2 text-xs font-bold text-blue hover:underline disabled:opacity-60"
                  >
                    {otpSubmitting ? "Sending code…" : "Verify this number to unlock your exact offer and book →"}
                  </button>
                )}

                {otpStage === "sent" && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-text">Code sent to +971 {phone}:</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="w-28 px-3 py-2 border-[1.5px] border-border rounded-lg text-center text-sm tracking-[4px] font-bold text-navy bg-light-bg outline-none focus:border-blue transition-all"
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otpSubmitting}
                      className="text-xs font-bold text-white bg-blue px-3 py-2 rounded-lg hover:bg-blue-dark transition-colors disabled:opacity-60"
                    >
                      {otpSubmitting ? "Verifying…" : "Verify"}
                    </button>
                    <button
                      type="button"
                      onClick={handleChangeNumber}
                      className="text-xs text-gray-text hover:text-blue transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {otpError && <p className="text-red-600 text-xs font-semibold mt-2">{otpError}</p>}
              </div>

              <input
                type="text"
                className={inputCls}
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className={inputCls}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative sm:col-span-2">
                <select
                  className={selectCls}
                  value={cityId ?? ""}
                  onChange={(e) => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    setCityId(id);
                    setBranchId(null);
                    const city = cities.find((c) => c.id === id);
                    if (city && city.branchCount === 0) setLocationType("home");
                  }}
                  required
                >
                  <option value="" disabled>Select City</option>
                  {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* Step 2 — Location type */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">2</span>
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
                disabled={!!selectedCity && selectedCity.branchCount === 0}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
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
                  <p className="text-xs text-gray-text mt-0.5">
                    {selectedCity && selectedCity.branchCount === 0 ? "No branches in this city" : "Visit our office"}
                  </p>
                </div>
                {locationType === "branch" && (
                  <div className="w-5 h-5 rounded-full bg-blue flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Step 3 — Location: map for home visits, branch picker for branch visits */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">3</span>
              <MapPin size={16} className="text-blue" />
              Your Location
            </h2>
            {locationType === "home" ? (
              <>
                <MapPicker onLocationSelect={handleLocationSelect} />
                {!locationAddress && (
                  <p className="text-xs text-gray-text mt-3 text-center">
                    Allow location access or click on the map to set your inspection address
                  </p>
                )}
              </>
            ) : !selectedCity ? (
              <p className="text-sm text-gray-text text-center py-6">Select your city in Step 1 first</p>
            ) : branchesLoading ? (
              <p className="text-sm text-gray-text text-center py-6">Loading branches…</p>
            ) : branches.length === 0 ? (
              <p className="text-sm text-gray-text text-center py-6">No branches found in {selectedCity.name}.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBranchId(b.id)}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-all duration-200 ${
                      branchId === b.id ? "border-blue bg-blue/5" : "border-border hover:border-blue/40"
                    }`}
                  >
                    <p className={`font-extrabold ${branchId === b.id ? "text-blue" : "text-navy"}`}>{b.name}</p>
                    <p className="text-xs text-gray-text mt-0.5">{b.address}</p>
                    {b.openingHours && <p className="text-xs text-gray-text mt-0.5">{b.openingHours}</p>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 4 — Date */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">4</span>
              <Calendar size={16} className="text-blue" />
              Pick a Date
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {days.map((day) => (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => setSelectedDate(day.iso)}
                  className={`flex flex-col items-center py-3 rounded-xl border-2 text-sm transition-all duration-200 ${
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

          {/* Step 5 — Time */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h2 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue text-white text-xs flex items-center justify-center font-black">5</span>
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
          <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(43,108,245,0.06)]">
            <h3 className="font-extrabold text-lg text-navy mb-4">Appointment Summary</h3>
            <div className="space-y-3 mb-6 text-navy text-sm font-semibold">
              <p>{locationType === "home" ? "🏠 Home Visit" : "🏢 Branch Visit"}</p>
              <p className="truncate">
                {locationType === "home"
                  ? locationAddress
                    ? `📍 ${locationAddress}`
                    : "📍 Location not selected"
                  : selectedBranch
                    ? `📍 ${selectedBranch.name}`
                    : "📍 Branch not selected"}
              </p>
              <p>📅 {formattedDate}</p>
              <p>🕐 {selectedTime}</p>
            </div>

            {contactError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold mb-4">
                {contactError}
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              disabled={booking}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue text-white rounded-xl font-extrabold text-[15px] hover:-translate-y-0.5 hover:bg-blue-dark transition-all shadow-[0_8px_24px_rgba(43,108,245,0.4)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {booking ? "Booking Appointment…" : "Confirm Appointment"}
              {!booking && <ChevronRight size={18} />}
            </button>
            <p className="text-center text-gray-text text-xs mt-3">100% free, no obligation</p>
          </div>

            <div className="text-center">
              <Link href="/" className="text-gray-text text-sm hover:text-blue transition-colors">
                ← Go back to home
              </Link>
            </div>
          </main>
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
