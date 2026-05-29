import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        console.log("Esto es cookie Store...........", cookieStore);
        const sessionCookie = cookieStore.get("session_user");
        try {
            console.log("Sesion cookie.........", sessionCookie);
            if (!sessionCookie) {
            return NextResponse.json({
                success: false,
                user: null,
                message: "No hay sesión activa",
            });
        }
        } catch (err) {
            console.error("");
            
        }

        
        

        // const user = JSON.parse(sessionCookie.value);
        // const idUsuario = user.id_usuario;

        return NextResponse.json({
            success: true,
            // user,
            // idUsuario
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