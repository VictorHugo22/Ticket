import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const { id_ticket, id_usuario, comentario} = await req.json();

        if (!id_ticket || !id_usuario || !comentario) {
            return NextResponse.json({
                success: false,
                message: "Faltan datos obligatorios",
            });
        }

        // const rolesDesarrollador = [1, 2];
        // if (!rolesDesarrollador.includes(id_rol)) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "No autorizado a registrar comentario",
        //     });
        // }

        const { data, error } = await supabase
            .from("seguimiento")
            .insert([{ comentario, id_ticket, id_usuario }])
            .select()
            .single();

        if (error || !data) {
            return NextResponse.json({
                success: false,
                message: error?.message || "Error al actualizar los comentarios",
            });
        }

        return NextResponse.json({
            success: true,
            ticket: data,
            message: "Comentarios agregados correctamente",
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Error inesperado al guardar los comentarios",
        });
    }
}