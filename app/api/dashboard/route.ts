import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("ticket") 
      .select(`
        sucursal,
        departamento,
        reporteproblema,
        fechainicio,
        fechafin,
        id_prioridad,
        Prioridad:prioridad(nombrep), 
        Estado:estado(nombree),
        Creador:fk_ticket_usuario(nombre, apellido),
        Desarr:ticket_id_desarrollador_fkey(nombre, apellido),
        Proyecto:proyecto(nombre)
        `)
      .order("id_ticket", { ascending: true });

    if (error) throw error;
    console.log(data);

    return NextResponse.json({ 
        success: true,
        tickets: data 
    });
  } catch (err) {
    return NextResponse.json({ 
        success: false,
        message: "Error al obtener tickets"
    });
  }
}
