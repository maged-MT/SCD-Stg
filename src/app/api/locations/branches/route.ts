import { NextResponse } from "next/server";
import { CUSTOMER_API_BASE_URL, readJson } from "@/lib/customerApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  const url = new URL(`${CUSTOMER_API_BASE_URL}/locations/branches`);
  if (city) url.searchParams.set("city", city);

  const res = await fetch(url, { next: { revalidate: 1800 } });
  const json = await readJson(res);
  return NextResponse.json(json ?? [], { status: res.status });
}
