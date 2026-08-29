import { NextResponse } from "next/server";
import { CUSTOMER_API_BASE_URL, readJson } from "@/lib/customerApi";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${CUSTOMER_API_BASE_URL}/vehicle-data/makes/${id}/models`, {
    next: { revalidate: 3600 },
  });
  const json = await readJson(res);
  return NextResponse.json(json ?? [], { status: res.status });
}
