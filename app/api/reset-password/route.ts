import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { usuario, password } = await req.json();

  if (!usuario || !password) {
    return NextResponse.json({ success: false, message: "Faltan datos" });
  }

  const { error } = await supabase
    .from("usuario")
    .update({ contrasenia: password })
    .eq("correo", usuario);

  if (error) {
    return NextResponse.json({ success: false, message: "Error al actualizar la contraseña" });
  }

  return NextResponse.json({ success: true, message: "Contraseña actualizada correctamente" });
}