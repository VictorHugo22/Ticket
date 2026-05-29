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
    const role = user.rol;

    let query = supabase
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
        `);
    // .eq("id_usuario", idUsuario)
    // .order("id_ticket", { ascending: true });

    // if (role !== "Administrador") {
    //   query = query.or(`id_usuario.eq.${idUsuario},id_desarrollador.eq.${idUsuario}`);
    // }  

    if (role === "Administrador") {

    } else if (role === "Tecnico-L1" || role === "Tecnico-L2") {
      query = query.eq("id_usuario", idUsuario);
    } else if (role === "Programador1" || role === "Programador2") {
      query = query.or(`id_estado.eq.1,id_desarrollador.eq.${idUsuario}`);
    }


    const { data, error } = await query.order("id_ticket", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
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
