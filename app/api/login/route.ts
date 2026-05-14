import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import jwt from "jsonwebtoken";

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

    const jwtToken = jwt.sign({ id: data.id_usuario, rol: data.nombrer }, "MI_SECRET_KEY", { expiresIn: "1h" });


    return NextResponse.json(
        {
        success: true,
        message: "Login correcto",
        user: { nombre: data.nombre, rol: data.rol.nombrer }},
        {
            status: 200,
            headers: {
                'Set-Cookie': `token=${jwtToken}; HttpOnly; Path=/; Secure; SameSite=Strict`
            }
        }
        
    );
}