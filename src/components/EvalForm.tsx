"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Check } from "lucide-react";
import {
  carData,
  makes,
  makeLogoUrl,
  mileageOptions,
  popularModelCount,
  specsOptions,
  yearOptions,
} from "@/lib/carData";

interface BodyType {
  id: number;
  name: string;
  label: string;
  available: boolean;
}

interface Trim {
  id: number;
  name: string;
}

interface VehicleSpecs {
  bodyTypes: BodyType[];
  engineSizes: string[];
  trims?: Trim[];
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

const STEPS = [
  { label: "Make" },
  { label: "Model" },
  { label: "Year" },
  { label: "Details" },
];

function initialsFor(make: string) {
  const letters = make.replace(/[^A-Za-z]/g, "");
  return (letters.slice(0, 2) || "?").toUpperCase();
}

function MakeLogo({ make }: { make: string }) {
  const [failed, setFailed] = useState(false);
  const url = makeLogoUrl(make);

  if (!url || failed) {
    return (
      <span className="w-14 h-14 rounded-full bg-light-bg border border-border flex items-center justify-center text-sm font-black text-navy shrink-0">
        {initialsFor(make)}
      </span>
    );
  }

  return (
    <span className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-2.5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={make}
        className="w-full h-full object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function StepHeader({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            {i < step ? (
              <span className="w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center shrink-0">
                <Check size={13} strokeWidth={3} />
              </span>
            ) : i === step ? (
              <span className="w-6 h-6 rounded-full border-2 border-blue flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-navy" />
              </span>
            ) : (
              <span className="w-6 h-6 rounded-full border border-border bg-white shrink-0" />
            )}
            {i < STEPS.length - 1 && (
              <span className={`h-[2px] flex-1 mx-2 rounded-full ${i < step ? "bg-blue" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-gray-text">
        Step {step + 1} of {STEPS.length} · {STEPS[step].label}
      </p>
    </div>
  );
}

function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs font-bold text-gray-text hover:text-blue transition-colors mb-4"
    >
      <ChevronLeft size={14} /> {label}
    </button>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative mb-4">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border-[1.5px] border-border rounded-[10px] font-[family-name:var(--font-jakarta)] text-sm text-navy bg-light-bg outline-none transition-all focus:border-blue focus:bg-white focus:shadow-[0_0_0_3px_rgba(43,108,245,0.1)]"
      />
    </div>
  );
}

function pillCls(active: boolean) {
  return `px-4 py-2.5 rounded-full border-[1.5px] text-sm font-bold transition-all ${
    active
      ? "bg-blue border-blue text-white shadow-[0_4px_14px_rgba(43,108,245,0.35)]"
      : "bg-white border-border text-navy hover:border-blue/40"
  }`;
}

export default function EvalForm() {
  const router = useRouter();

  const [step, setStep] = useState(0);

  // Vehicle selection
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  // Details
  const [mileage, setMileage] = useState("");
  const [specs, setSpecs] = useState("");
  const [trimId, setTrimId] = useState<number | null>(null);
  const [trimName, setTrimName] = useState("");

  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showMoreMileage, setShowMoreMileage] = useState(false);

  const models = useMemo(() => (make ? carData[make] || [] : []), [make]);

  // Reset dependent selections when an earlier one changes
  useEffect(() => {
    setModel("");
    setModelSearch("");
  }, [make]);

  useEffect(() => {
    setTrimId(null);
    setTrimName("");
  }, [make, model, year]);

  const { specs: vehicleSpecs, loading: specsLoading } = useVehicleSpecs(make, model, year);

  const trimOptions = (vehicleSpecs?.trims ?? []).filter((t) => t.name.trim());
  const showSpecsFields = !specsLoading && vehicleSpecs !== null;

  const filteredMakes = useMemo(
    () => makes.filter((m) => m.toLowerCase().includes(makeSearch.trim().toLowerCase())),
    [makeSearch]
  );
  const popCount = make ? (popularModelCount[make] ?? 0) : 0;
  const popularModels = useMemo(() => models.slice(0, popCount), [models, popCount]);
  const otherModels = useMemo(() => [...models.slice(popCount)].sort(), [models, popCount]);

  const searchTerm = modelSearch.trim().toLowerCase();
  const filteredPopular = useMemo(
    () => (searchTerm ? popularModels.filter((m) => m.toLowerCase().includes(searchTerm)) : popularModels),
    [popularModels, searchTerm]
  );
  const filteredOther = useMemo(
    () => (searchTerm ? otherModels.filter((m) => m.toLowerCase().includes(searchTerm)) : otherModels),
    [otherModels, searchTerm]
  );
  const filteredModels = useMemo(
    () => [...filteredPopular, ...filteredOther],
    [filteredPopular, filteredOther]
  );

  const visibleMileageOptions = showMoreMileage ? mileageOptions : mileageOptions.slice(0, 5);

  const canSubmit = Boolean(mileage && specs);

  const selectMake = (m: string) => {
    setMake(m);
    setStep(1);
  };
  const selectModel = (m: string) => {
    setModel(m);
    setStep(2);
  };
  const selectYear = (y: number) => {
    setYear(String(y));
    setStep(3);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const apptParams = new URLSearchParams({
      makeName: make,
      modelName: model,
      year,
      mileage,
      spec: specs,
      ...(trimId && { trimId: String(trimId) }),
      ...(trimName && { trim: trimName }),
    });
    router.push(`/appointment?${apptParams.toString()}`);
  };

  return (
    <div
      className="bg-white rounded-[32px] p-8 shadow-[0_40px_100px_rgba(43,108,245,0.15),0_4px_30px_rgba(0,0,0,0.06)] border border-blue/10 w-full max-w-[520px]"
      id="SELLMYCAR"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-extrabold text-navy tracking-tight mb-1">
          Get Your Instant Offer 🚀
        </h3>
        <p className="text-sm text-gray-text">Fill in your car details — it takes under 30 seconds</p>
      </div>

      <StepHeader step={step} />

      {/* Step 0 — Make */}
      {step === 0 && (
        <div>
          <SearchInput value={makeSearch} onChange={setMakeSearch} placeholder="Search makes" />
          <div className="grid grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredMakes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => selectMake(m)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-[1.5px] transition-all ${
                  make === m ? "border-blue bg-light-bg" : "border-border bg-white hover:border-blue/40"
                }`}
              >
                <MakeLogo make={m} />
                <span className="text-[11px] font-extrabold text-navy tracking-wide text-center">
                  {m.toUpperCase()}
                </span>
              </button>
            ))}
            {filteredMakes.length === 0 && (
              <p className="col-span-3 text-center text-sm text-gray-text py-8">No makes match your search.</p>
            )}
          </div>
        </div>
      )}

      {/* Step 1 — Model */}
      {step === 1 && (
        <div>
          <BackLink onClick={() => setStep(0)} label="Back to make" />
          <SearchInput value={modelSearch} onChange={setModelSearch} placeholder="Search models" />
          <div className="max-h-[420px] overflow-y-auto pr-1 space-y-4">
            {/* Popular models */}
            {filteredPopular.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-text uppercase tracking-wider mb-2">Popular Models</p>
                <div className="grid grid-cols-3 gap-3">
                  {filteredPopular.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => selectModel(m)}
                      className={`py-3 px-2 rounded-xl border-[1.5px] text-sm font-extrabold transition-all ${
                        model === m ? "border-blue bg-blue text-white" : "border-blue/20 text-navy bg-blue/[0.03] hover:border-blue/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            {filteredPopular.length > 0 && filteredOther.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="flex-1 h-px bg-border" />
                <span className="text-[11px] font-bold text-gray-text uppercase tracking-wider">All Models</span>
                <span className="flex-1 h-px bg-border" />
              </div>
            )}

            {/* Remaining models (alphabetical) */}
            {filteredOther.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {filteredOther.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => selectModel(m)}
                    className={`py-3 px-2 rounded-xl border-[1.5px] text-sm font-extrabold transition-all ${
                      model === m ? "border-blue bg-blue text-white" : "border-border text-navy hover:border-blue/40"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            {filteredModels.length === 0 && (
              <p className="text-center text-sm text-gray-text py-8">No models match your search.</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2 — Year */}
      {step === 2 && (
        <div>
          <BackLink onClick={() => setStep(1)} label="Back to model" />
          <div className="border border-border rounded-2xl p-5">
            <p className="text-center text-xs font-bold text-gray-text mb-1">
              {make} · {model}
            </p>
            <p className="text-center text-base font-extrabold text-navy mb-4">Select Year</p>
            <div className="grid grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {yearOptions.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => selectYear(y)}
                  className={`py-3 rounded-xl border-[1.5px] text-sm font-extrabold transition-all ${
                    year === String(y) ? "border-blue bg-blue text-white" : "border-border text-navy hover:border-blue/40"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Details */}
      {step === 3 && (
        <div>
          <BackLink onClick={() => setStep(2)} label="Back to year" />

          <div className="flex items-center gap-3 bg-light-bg rounded-xl px-4 py-3 mb-5">
            <p className="text-sm font-extrabold text-navy">
              {[year, make, model].filter(Boolean).join(" ")}
            </p>
          </div>

          <div className="space-y-5 max-h-[440px] overflow-y-auto pr-1 mb-5">
            {/* Odometer */}
            <div>
              <p className="text-sm font-extrabold text-navy mb-2">Odometer</p>
              <div className="grid grid-cols-2 gap-2.5">
                {visibleMileageOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMileage(m)}
                    className={pillCls(mileage === m) + " text-center"}
                  >
                    {m}
                  </button>
                ))}
                {mileageOptions.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowMoreMileage((v) => !v)}
                    className="px-4 py-2.5 rounded-full border-[1.5px] border-dashed border-blue/40 text-sm font-bold text-blue"
                  >
                    {showMoreMileage ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>

            {/* Vehicle specs loading indicator */}
            {specsLoading && (
              <div className="flex items-center gap-2 py-1">
                <svg className="animate-spin h-3.5 w-3.5 text-blue shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-xs text-blue font-medium">Fetching vehicle specs…</span>
              </div>
            )}

            {/* Trim — sourced from vehicle-specs */}
            {showSpecsFields && trimOptions.length > 0 && (
              <div>
                <p className="text-sm font-extrabold text-navy mb-2">Trim</p>
                <div className="flex flex-wrap gap-2.5">
                  {trimOptions.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTrimId(t.id);
                        setTrimName(t.name);
                      }}
                      className={pillCls(trimId === t.id)}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Regional specs */}
            <div>
              <p className="text-sm font-extrabold text-navy mb-2">Regional Specs</p>
              <div className="flex flex-wrap gap-2.5">
                {specsOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpecs(s)}
                    className={pillCls(specs === s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-extrabold text-[15px] tracking-[0.5px] shadow-[0_8px_24px_rgba(43,108,245,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(43,108,245,0.5)] active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
          >
            GET MY FREE OFFER →
          </button>

          <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-text">
            🔒 <span>Secure &amp; 100% Free — No hidden fees, ever</span>
          </p>
        </div>
      )}
    </div>
  );
}
