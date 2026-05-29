import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    const { 
        id_proyecto,
        sucursal,
        departamento,
        //problem,
        //fechainicio,
        id_usuario,
        id_prioridad,
        //comentarioProblema,
    } = await req.json();

    // console.log("Datos del probelma que se envian desde el componente", comentarioProblema);

    if (!id_proyecto || !sucursal || !departamento || !id_usuario || !id_prioridad) {
        return NextResponse.json({
            success: false,
            message: "Faltan datos obligatorios",
        });
    }

    const fechaInicio = new Date().toISOString(); // formato UTC "2026-05-15"

    // console.log("Datos recibidos en API:", {
    //     id_proyecto,
    //     sucursal,
    //     departamento,
    //     id_usuario
    // });

    const { data: ticket, error: ticketError } = await supabase
        .from("ticket")
        .insert({
            id_proyecto: id_proyecto,
            sucursal: sucursal,
            departamento: departamento,
            //reporteproblema: problem,
            id_usuario: id_usuario,
            fechainicio: fechaInicio,
            id_prioridad: id_prioridad,
            id_estado: 1
        })
        .select()
        .single();

    if (ticketError) {
        // console.log("Error al insertar en la DB", ticketError);
        return NextResponse.json({
            success: false,
            message: "Error al guardar el ticket",
            error: ticketError.message,
        });
    }

    // const id_ticket = ticket.id_ticket;

    // const { data: seguimiento, error: seguimientoError } = await supabase
    //     .from("seguimiento")
    //     .insert([{
    //         id_ticket: id_ticket,
    //         id_usuario: id_usuario,
    //         //comentario: comentario,
    //         fechaC: fechaInicio,
    //     }])
    //     .select()
    //     .single();

    // if (seguimientoError) {
    //     console.log("Error al insertar en la DB", seguimientoError);
    //     return NextResponse.json({
    //         success: false,
    //         message: "Error al guardar los comentarios en el ticket",
    //         error: seguimientoError.message,
    //     });
    // }


    // console.log("Ticket insertado en la DB", ticket);
    // console.log("Comentarios insertados en el Ticket", seguimiento);

    return NextResponse.json({
        success: true,
        message: "Ticket guardado correctamente",
        ticket: ticket,
        // seguimiento: seguimiento,
    });
}