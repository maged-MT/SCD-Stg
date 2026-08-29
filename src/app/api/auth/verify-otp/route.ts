import { NextResponse } from "next/server";
import { CUSTOMER_API_BASE_URL, readJson } from "@/lib/customerApi";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.mobile || !body?.otp) {
    return NextResponse.json({ error: "mobile and otp are required" }, { status: 400 });
  }

  const res = await fetch(`${CUSTOMER_API_BASE_URL}/auth/user/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: body.mobile, otp: body.otp }),
    cache: "no-store",
  });
  const json = await readJson(res);
  return NextResponse.json(json ?? {}, { status: res.status });
}
