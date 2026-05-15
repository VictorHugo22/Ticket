import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { usuario, password } = await req.json();

    const { data, error } = await supabase
        .from("usuario")
        .select(`*, TablaRol:rol(nombrer)`)
        .eq("correo", usuario)
        .single();

    if (error || !data) {
        return NextResponse.json({
            success: false,
            message: "Usuario no encontrado",
        });
    }

    if (data.contrasenia !== password) {
        return NextResponse.json({
            success: false,
            message: "Contraseña incorrecta",
        });
    }

    return NextResponse.json(
        {
            success: true,
            message: "Login correcto",
            user: { nombre: data.nombre, rol: data.TablaRol.nombrer, id_usuario: data.id_usuario }
        }
    );
}