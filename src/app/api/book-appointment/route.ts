import { NextResponse } from "next/server";
import { CUSTOMER_API_BASE_URL, readJson } from "@/lib/customerApi";

interface BookingRequest {
  appointmentDate: string;
  appointmentTime: string;
  name?: string;
  locationMode: "home" | "branch";
  cityId?: number;
  citySlug?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  branchId?: number;
  makeName?: string;
  modelName?: string;
  year?: string;
  km?: string;
}

// Best-effort: the site collects make/model as free text, but the platform's
// appointment endpoint only accepts numeric ids. Resolve them against the
// public vehicle catalogue; if nothing matches, the appointment is still
// booked without a vehicle attached.
async function resolveVehicleIds(makeName?: string, modelName?: string) {
  if (!makeName) return {};

  const makesRes = await fetch(`${CUSTOMER_API_BASE_URL}/vehicle-data/makes`, { cache: "no-store" });
  const makesJson = await readJson(makesRes);
  const makes = Array.isArray(makesJson) ? makesJson : [];
  const make = makes.find(
    (m: { id: number; name: string }) => m.name.localeCompare(makeName, undefined, { sensitivity: "base" }) === 0
  );
  if (!make) return {};

  if (!modelName) return { makeId: make.id };

  const modelsRes = await fetch(`${CUSTOMER_API_BASE_URL}/vehicle-data/makes/${make.id}/models`, { cache: "no-store" });
  const modelsJson = await readJson(modelsRes);
  const models = Array.isArray(modelsJson) ? modelsJson : [];
  const model = models.find(
    (m: { id: number; name: string }) => m.name.localeCompare(modelName, undefined, { sensitivity: "base" }) === 0
  );

  return model ? { makeId: make.id, modelId: model.id } : { makeId: make.id };
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ error: "Please verify your phone number first" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as BookingRequest | null;
  if (!body?.appointmentDate || !body?.appointmentTime) {
    return NextResponse.json({ error: "appointmentDate and appointmentTime are required" }, { status: 400 });
  }
  if (body.locationMode === "branch" && !body.branchId) {
    return NextResponse.json({ error: "A branch visit needs branchId" }, { status: 400 });
  }
  if (body.locationMode === "home" && (!body.cityId && !body.citySlug)) {
    return NextResponse.json({ error: "A home visit needs cityId or citySlug" }, { status: 400 });
  }

  const { makeId, modelId } = await resolveVehicleIds(body.makeName, body.modelName);

  const payload: Record<string, unknown> = {
    appointmentDate: body.appointmentDate,
    appointmentTime: body.appointmentTime,
    locationMode: body.locationMode,
    ...(body.name && { name: body.name }),
    ...(makeId && { makeId }),
    ...(modelId && { modelId }),
    ...(body.year && { year: Number(body.year) }),
    ...(body.km && { km: body.km }),
  };

  if (body.locationMode === "branch") {
    payload.branchId = body.branchId;
  } else {
    if (body.cityId) payload.cityId = body.cityId;
    if (body.citySlug) payload.citySlug = body.citySlug;
    payload.address = body.address;
    payload.latitude = body.latitude;
    payload.longitude = body.longitude;
  }

  const res = await fetch(`${CUSTOMER_API_BASE_URL}/users/me/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const json = await readJson(res);
  return NextResponse.json(json ?? {}, { status: res.status });
}
