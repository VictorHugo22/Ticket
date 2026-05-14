import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { id_proyecto, sucursal } = await req.json();

    console.log("Datos recibidos en API:", {
        id_proyecto,
        sucursal,
    })

    if (id_proyecto || !sucursal) {
        return NextResponse.json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    const { data, error } = await supabase
        .from("ticket")
        .insert({
            id_proyecto: id_proyecto,
            sucursal: sucursal,
        })
        .select()
        .single();

    if (error) {
        console.log("Error al insertar en la DB", error);
        return NextResponse.json({
            success: false,
            message: "Error al guardar el ticket",
            error: error.message,
        });
    }

    console.log("Ticket insertado en la DB", data);

    return NextResponse.json({
        success: true,
        message: "Ticket guardado correctamente",
        ticket: data,
    });
}