import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabase
        .from("prioridad")
        .select("id_prioridad, nombrep")
        .order("nombrep", { ascending: true });

    if (error) {
        console.error("Error al consultar prioridad:", error);
        return NextResponse.json({
            success: false,
            message: "Error al consultar proyectos",
        });
    }

    return NextResponse.json({
        success: true,
        prioridad: data,
    });
}