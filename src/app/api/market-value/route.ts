import { NextResponse } from "next/server";

const CARHUB_BASE_URL =
  process.env.CARHUB_BASE_URL || "https://carmarkethub.com";
const CARHUB_API_KEY =
  process.env.CARHUB_API_KEY || "baddelha_live_pk_2024_a8f9c3e1d4b7";

const HEADERS = { "X-API-Key": CARHUB_API_KEY };

// Chains two CarMarketHub calls server-side so the API key never reaches the browser:
//   1. /api/public/vehicle-specs  → resolves makeName/modelName/year → trimId
//   2. /api/public/market-value   → fetches pricing with that trimId + extras
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const makeName = searchParams.get("makeName") || "";
  const modelName = searchParams.get("modelName") || "";
  const year = searchParams.get("year") || "";
  const mileage = searchParams.get("mileage") || "";
  const spec = searchParams.get("spec") || "";

  if (!makeName || !modelName || !year) {
    return NextResponse.json(
      { error: "makeName, modelName and year are required" },
      { status: 400 }
    );
  }

  try {
    // ── Step 1: resolve trims ──────────────────────────────────────────────
    const specsParams = new URLSearchParams({ make: makeName, model: modelName, year });
    const specsRes = await fetch(
      `${CARHUB_BASE_URL}/api/public/vehicle-specs?${specsParams}`,
      { headers: HEADERS, next: { revalidate: 3600 } }
    );
    const specsJson = await specsRes.json();

    const trims: { id: number; name: string }[] = specsJson?.data?.trims ?? [];
    const trimId = trims[0]?.id ?? 0;

    if (!trimId) {
      return NextResponse.json(
        { error: "Vehicle not found in database", noData: true },
        { status: 404 }
      );
    }

    // ── Step 2: fetch market value ─────────────────────────────────────────
    const mvParams = new URLSearchParams({
      trimId: String(trimId),
      year,
      make: makeName,
      model: modelName,
      ...(mileage && { mileage }),
      ...(spec && { specs: spec }),
    });
    const mvRes = await fetch(
      `${CARHUB_BASE_URL}/api/public/market-value?${mvParams}`,
      { headers: HEADERS, next: { revalidate: 1800 } }
    );
    const mvJson = await mvRes.json();

    return NextResponse.json(mvJson, { status: mvRes.status });
  } catch (err) {
    console.error("market-value proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch market value" },
      { status: 500 }
    );
  }
}
