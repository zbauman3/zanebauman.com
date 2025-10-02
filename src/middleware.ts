import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }

  url.pathname = "/404";
  return NextResponse.rewrite(url);
}
