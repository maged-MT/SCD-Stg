"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUtmParams } from "@/lib/utm";

export default function UtmTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams(searchParams.toString());
  }, [pathname, searchParams]);

  return null;
}
