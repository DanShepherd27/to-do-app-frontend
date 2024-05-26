import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!cookies().has("user")) {
    return NextResponse.redirect(new URL("/new-user", request.url));
  } else if (path === "/") {
    return NextResponse.redirect(new URL("/my-todos", request.url));
  }
}

export const config = {
  matcher: ["/", "/my-todos"],
};
