import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { id_proyecto, sucursal, departamento, problem, fechainicio, id_usuario, id_prioridad } = await req.json();

    if (!id_proyecto || !sucursal || !departamento || !problem || !id_usuario || !id_prioridad) {
        return NextResponse.json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    const fechaInicio = new Date().toISOString(); // formato UTC "2026-05-15T15:30:00.000Z"

    console.log("Datos recibidos en API:", {
        id_proyecto,
        sucursal,
        departamento,
        problem,
        fechainicio,
        id_usuario
    });

    const { data, error } = await supabase
        .from("ticket")
        .insert({
            id_proyecto: id_proyecto,
            sucursal: sucursal,
            departamento: departamento,
            reporteproblema: problem,
            id_usuario: id_usuario,
            fechainicio: fechaInicio,
            id_prioridad: id_prioridad,
            id_estado: 1
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