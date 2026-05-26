import { NextResponse } from "next/server";
import argon2 from "argon2";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const { usuario, password } = await req.json();

        if (!usuario || !password) {
            return NextResponse.json({
                success: false,
                message: "Correo y contraseña son obligatorios",
            });

        }

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

        // if (data.contrasenia !== password) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "Contraseña incorrecta",
        //     });
        // }

        let pssCorrecta = false;
        const pssGuardada = data.contrasenia;
        const pssHashing = pssGuardada.startsWith("$argon2id$");

        if (pssHashing) {
            pssCorrecta = await argon2.verify(
                pssGuardada,
                password
            );
        } else {
            pssCorrecta = pssGuardada === password;
            if (pssCorrecta) {
                const newHash = await argon2.hash(password);
                console.log("la contraseña hasheada......", newHash);
                const { error: updateError } = await supabase
                    .from("usuario")
                    .update({ contrasenia: newHash })
                    .eq("id_usuario", data.id_usuario);

                if (updateError) {
                    console.error("Error actualizando contraseña a hash:", updateError);
                }
            }
        }

        if (!pssCorrecta) {
            return NextResponse.json({
                success: false,
                message: "Usuario o contraseña incorrectos",
            });
        }

        const sessionUser = {
            id_usuario: data.id_usuario,
            nombre: data.nombre,
            rol: data.TablaRol?.nombrer,
        };

        // return NextResponse.json(
        //     {
        //         success: true,
        //         message: "Inicio de Sesión correcto",
        //         user: { 
        //             nombre: data.nombre, 
        //             rol: data.TablaRol.nombrer, 
        //             id_usuario: data.id_usuario }
        //     }
        // );

        const response = NextResponse.json({
            success: true,
            messgae: "Inicio de sesión correcto",
            user: {
                nombre: data.nombre,
                rol: data.TablaRol.nombrer,
                id_usuario: data.id_usuario
            }
        });

        response.cookies.set("session_user", JSON.stringify(sessionUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return response;

    } catch (err) {
        console.error("Error en el login:", err);

        return NextResponse.json({
            secces: false,
            message: "Error inesperado al inciar sesión",
        });
    }
}