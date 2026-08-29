import { NextResponse } from "next/server";

const CARHUB_BASE_URL =
  process.env.CARHUB_BASE_URL || "https://carmarkethub.com";
const CARHUB_API_KEY =
  process.env.CARHUB_API_KEY || "dev_int_v1_7KqP2mX9Lr4Nz8WaE6TyU";

// Server-side proxy — API key never reaches the browser
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const year = searchParams.get("year");

  if (!make || !model || !year) {
    return NextResponse.json(
      { error: "make, model and year are required" },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({ make, model, year });
    const res = await fetch(
      `${CARHUB_BASE_URL}/api/public/vehicle-specs?${params}`,
      {
        headers: { "X-API-Key": CARHUB_API_KEY },
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("vehicle-specs proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch vehicle specs" },
      { status: 500 }
    );
  }
}
