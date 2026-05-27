import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_user");
    if (!sessionCookie) {
      return NextResponse.json({
        success: false,
        message: "No hay sesión activa",
      });
    }

    const user = JSON.parse(sessionCookie.value);
    const idUsuario = user.id_usuario;
    console.log("este es el id_usuario en el back.......", idUsuario);

    const { data, error } = await supabase
      .from("ticket")
      .select(`
        id_ticket,
        sucursal,
        departamento,
        reporteproblema,
        fechainicio,
        fechafin,
        id_prioridad,
        Prioridad:prioridad(nombrep), 
        Estado:estado(id_estado, nombree),
        Creador:fk_ticket_usuario(nombre, apellido),
        Desarr:ticket_id_desarrollador_fkey(nombre, apellido),
        Proyecto:proyecto(nombre)
        `)
      // .eq("id_usuario", idUsuario)
      .order("id_ticket", { ascending: true });

    if (error) throw error;
    // console.log(data);

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
