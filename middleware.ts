import { NextResponse } from "next/server";

export function middleware(req:any) {
  const res = NextResponse.next();
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  return res;
}