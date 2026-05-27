import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session_user")?.value;
    const rutaActual = request.nextUrl.pathname;

    const esRutaProtegida = rutaActual.startsWith("/welcome");
    const publicRoute = rutaActual === "/";

    if (esRutaProtegida && !session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (publicRoute && session){
        return NextResponse.redirect(new URL("/welcome", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/welcome/:path*"],
};