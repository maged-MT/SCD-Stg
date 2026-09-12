export const UTM_STORAGE_KEY = "scd_utm_params";
export const UTM_KEYS = ["utm_source", "utm_campaign", "utm_medium", "utm_term"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

// Last-touch attribution: whenever a landing URL carries any utm_* param we merge
// it over what's already stored, so direct/repeat visits never wipe attribution.
export function captureUtmParams(search: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  const incoming: UtmParams = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) incoming[key] = value;
  });
  if (!Object.keys(incoming).length) return;
  try {
    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify({ ...getStoredUtmParams(), ...incoming }));
  } catch {}
}
