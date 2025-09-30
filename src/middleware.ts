import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/(.+)"],
};

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }
  return new NextResponse(null, { status: 404 });
}
