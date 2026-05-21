import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id_ticket = searchParams.get("id_ticket");

        if (!id_ticket) {
            return NextResponse.json({
                success: false,
                message: "El ID del ticket es obligatorio"
            })
        }
        const ticketIdNum = Number(id_ticket);

        const { data, error } = await supabase
            .from("seguimiento")
            .select("*")
            .eq("id_ticket", ticketIdNum)
            .order("fechaC", { ascending: true });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.message
            });
        }

        return NextResponse.json({
            success: true,
            comentarios: data
        });


    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Error inesperado alconsultar comentarios"
        })
    }
}