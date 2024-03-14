import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  if (pathname.includes("api/auth")) {
    return;
  }

  if (pathname.includes("/sign-in")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  const isApiPath = pathname.startsWith("/api");

  const administratorMatcher = [
    /^\/admin/,
    /^\/admin\/.*/,
    /^\/api\/admin\/.*/,
  ];

  const isAdminUrl = !!administratorMatcher.find((regex) =>
    regex.test(pathname),
  );

  const isAdmin = token?.roles.includes("admin");

  if (isAdminUrl) {
    if (!isAdmin && isApiPath) {
      return NextResponse.json(
        {
          errors: "Not Authorized!",
        },
        { status: 401 },
      );
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }
}
