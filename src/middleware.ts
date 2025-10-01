import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).+)"],
};

export function middleware() {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }
  return new NextResponse(null, { status: 404 });
}
