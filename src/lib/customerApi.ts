// Base URL for the CarMarketHub Customer API (see CUSTOMER_API.md).
export const CUSTOMER_API_BASE_URL = (
  process.env.CUSTOMER_API_BASE_URL || "https://scd.nabilio.com/api"
).replace(/\/+$/, "");

export async function readJson(response: Response) {
  return response.json().catch(() => null);
}
