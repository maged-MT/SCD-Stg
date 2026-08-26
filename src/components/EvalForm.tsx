"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  carData,
  makes,
  mileageOptions,
  specsOptions,
  emirateOptions,
  yearOptions,
} from "@/lib/carData";

const SUBMIT_URL = "https://smartcardeals.net/apitestnew/submit_lead.php";

interface BodyType {
  id: number;
  name: string;
  label: string;
  available: boolean;
}

interface VehicleSpecs {
  bodyTypes: BodyType[];
  engineSizes: string[];
}

function useVehicleSpecs(make: string, model: string, year: string) {
  const [specs, setSpecs] = useState<VehicleSpecs | null>(null);
  const [loading, setLoading] = useState(false);
  const prevKey = useRef("");

  useEffect(() => {
    const key = `${make}|${model}|${year}`;
    if (!make || !model || !year || key === prevKey.current) return;
    prevKey.current = key;

    setLoading(true);
    setSpecs(null);

    const params = new URLSearchParams({ make, model, year });
    fetch(`/api/vehicle-specs?${params}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.success && json?.data) setSpecs(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [make, model, year]);

  // Reset when vehicle selection clears
  useEffect(() => {
    if (!make || !model || !year) {
      setSpecs(null);
      prevKey.current = "";
    }
  }, [make, model, year]);

  return { specs, loading };
}

export default function EvalForm() {
  const router = useRouter();

  // Core fields
  const [make, setMake] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [specs, setSpecs] = useState("");
  const [emirate, setEmirate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Vehicle-specs enrichment
  const [bodyType, setBodyType] = useState("");
  const [engineSize, setEngineSize] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Populate model list when make changes
  useEffect(() => {
    if (make) {
      setModels(carData[make] || []);
      setModel("");
    } else {
      setModels([]);
    }
  }, [make]);

  // Reset body type / engine size when vehicle changes
  useEffect(() => {
    setBodyType("");
    setEngineSize("");
  }, [make, model, year]);

  const { specs: vehicleSpecs, loading: specsLoading } = useVehicleSpecs(make, model, year);

  const bodyTypeOptions = vehicleSpecs?.bodyTypes?.filter((bt) => bt.available) ?? [];
  const engineSizeOptions = vehicleSpecs?.engineSizes ?? [];
  const showSpecsFields = !specsLoading && (bodyTypeOptions.length > 0 || engineSizeOptions.length > 0);

  const handlePhoneInput = (val: string) => {
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("971")) digits = digits.slice(3);
    if (digits.startsWith("0")) digits = digits.slice(1);
    setPhone(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (phone.length < 9 || !phone.startsWith("5")) {
      setErrorMsg("⚠️ Please enter a valid UAE phone number (e.g. 5X XXX XXXX).");
      return;
    }

    setStatus("submitting");

    const payload = new URLSearchParams({
      company_name: name.trim(),
      phone: "971" + phone,
      email: email.trim(),
      make,
      model,
      year,
      mileage,
      specs,
      emirate,
      ...(bodyType && { body_type: bodyType }),
      ...(engineSize && { engine_size: engineSize }),
      owner_id: "1",
      lead_source_id: "1",
      lead_status_id: "1",
    });

    try {
      fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
        keepalive: true,
      }).catch(() => {});

      await new Promise((r) => setTimeout(r, 600));

      const apptParams = new URLSearchParams({
        makeName: make,
        modelName: model,
        year,
        mileage,
        spec: specs,
        emirate,
        ...(bodyType && { bodyType }),
        ...(engineSize && { engineSize }),
      });
      router.push(`/appointment?${apptParams.toString()}`);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or call us directly.");
    }
  };

  const selectCls =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-[10px] font-[family-name:var(--font-jakarta)] text-sm text-gray-text bg-light-bg appearance-none cursor-pointer outline-none transition-all focus:border-blue focus:bg-white focus:text-navy focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]";
  const inputCls =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-[10px] font-[family-name:var(--font-jakarta)] text-sm text-gray-text bg-light-bg outline-none transition-all focus:border-blue focus:bg-white focus:text-navy focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]";

  return (
    <div
      className="bg-white rounded-[32px] p-8 shadow-[0_40px_100px_rgba(43,108,245,0.15),0_4px_30px_rgba(0,0,0,0.06)] border border-blue/10 w-full max-w-[520px]"
      id="SELLMYCAR"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-extrabold text-navy tracking-tight mb-1">
          Get Your Instant Offer 🚀
        </h3>
        <p className="text-sm text-gray-text">Fill in your car details — it takes under 2 minutes</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 mb-4">

          {/* Make */}
          <div className="relative">
            <select className={selectCls} value={make} onChange={(e) => setMake(e.target.value)} required>
              <option value="" disabled>Select Car Make</option>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Model */}
          <div className="relative">
            <select className={selectCls} value={model} onChange={(e) => setModel(e.target.value)} required disabled={!make}>
              <option value="" disabled>Select Car Model</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Year */}
          <div className="relative">
            <select className={selectCls} value={year} onChange={(e) => setYear(e.target.value)} required>
              <option value="" disabled>Select Model Year</option>
              {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Mileage */}
          <div className="relative">
            <select className={selectCls} value={mileage} onChange={(e) => setMileage(e.target.value)} required>
              <option value="" disabled>Select Kilometers</option>
              {mileageOptions.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Vehicle Specs loading indicator */}
          {specsLoading && (
            <div className="col-span-2 flex items-center gap-2 py-1 px-1">
              <svg className="animate-spin h-3.5 w-3.5 text-blue shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs text-blue font-medium">Fetching vehicle specs…</span>
            </div>
          )}

          {/* Body Type — shown once vehicle-specs resolves */}
          {showSpecsFields && bodyTypeOptions.length > 0 && (
            <div className="relative">
              <select
                className={selectCls}
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">Body Type (optional)</option>
                {bodyTypeOptions.map((bt) => (
                  <option key={bt.name} value={bt.name}>{bt.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
            </div>
          )}

          {/* Engine Size — shown once vehicle-specs resolves */}
          {showSpecsFields && engineSizeOptions.length > 0 && (
            <div className="relative">
              <select
                className={selectCls}
                value={engineSize}
                onChange={(e) => setEngineSize(e.target.value)}
              >
                <option value="">Engine Size (optional)</option>
                {engineSizeOptions.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
            </div>
          )}

          {/* Specs */}
          <div className="relative">
            <select className={selectCls} value={specs} onChange={(e) => setSpecs(e.target.value)} required>
              <option value="" disabled>Car Specs</option>
              {specsOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Emirate */}
          <div className="relative">
            <select className={selectCls} value={emirate} onChange={(e) => setEmirate(e.target.value)} required>
              <option value="" disabled>Select Emirate</option>
              {emirateOptions.map((em) => <option key={em} value={em}>{em}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-text text-xs">▾</span>
          </div>

          {/* Name */}
          <div>
            <input
              type="text"
              className={inputCls}
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex border-[1.5px] border-border rounded-[10px] overflow-hidden bg-light-bg focus-within:border-blue focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(43,108,245,0.1)] transition-all">
            <span className="flex items-center gap-1 px-3 bg-blue/5 border-r border-border text-navy font-bold text-sm whitespace-nowrap shrink-0">
              🇦🇪 +971
            </span>
            <input
              type="tel"
              className="flex-1 px-3 py-3 bg-transparent text-sm text-gray-text outline-none font-[family-name:var(--font-jakarta)]"
              placeholder="5X XXX XXXX"
              value={phone}
              onChange={(e) => handlePhoneInput(e.target.value)}
              maxLength={10}
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <input
              type="email"
              className={inputCls}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-[10px] px-4 py-3 text-sm font-semibold mb-3">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-extrabold text-[15px] tracking-[0.5px] shadow-[0_8px_24px_rgba(43,108,245,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(43,108,245,0.5)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
        >
          {status === "submitting" ? "⏳ Submitting..." : "GET MY FREE OFFER →"}
        </button>

        <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-text">
          🔒 <span>Secure &amp; 100% Free — No hidden fees, ever</span>
        </p>
      </form>
    </div>
  );
}
