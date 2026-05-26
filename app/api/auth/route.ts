import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const sessionCookie = cookieStore.get("session_user");

        if (!sessionCookie) {
            return NextResponse.json({
                success: false,
                user: null,
                message: "No hay sesión activa",
            });
        }

        const user = JSON.parse(sessionCookie.value);

        return NextResponse.json({
            success: true,
            user,
        });

    } catch (err) {
        console.error("Error leyendo sesión:", err);

        return NextResponse.json({
            success: false,
            user: null,
            message: "Error al leer la sesión",
        });
    }
}