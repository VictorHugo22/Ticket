import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const { id_ticket, id_estado, id_desarrollador } = await req.json();

        if (!id_ticket || !id_estado || !id_desarrollador) {
            return NextResponse.json({
                success: false,
                message: "Faltan datos obligatorios",
            });
        }

        const { data, error } = await supabase
            .from("ticket")
            .update({ id_estado, id_desarrollador })
            .eq("id_ticket", id_ticket)
            .select()
            .single();

        if (error || !data) {
            return NextResponse.json({
                success: false,
                message: error?.message || "Error al actualizar el ticket",
            });
        }

        return NextResponse.json({
            success: true,
            ticket: data,
            message: "Estado del ticket actualizado correctamente",
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Error inesperado al actualizar el estado",
        });
    }
}