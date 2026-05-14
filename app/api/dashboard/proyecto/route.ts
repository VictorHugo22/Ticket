import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabase
        .from("proyecto")
        .select("id_proyecto, nombre")
        .order("nombre", { ascending: true });

    if (error) {
        console.error("Error al consultar proyectos:", error);
        return NextResponse.json({
            success: false,
            message: "Error al consultar proyectos",
        });
    }

    return NextResponse.json({
        success: true,
        proyectos: data,
    });
}