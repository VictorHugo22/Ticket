'use client';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function useTicketActions() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const id_desarrollador = user?.id_usuario;
  const IDEstado = async (id_ticket: number, id_estado: number) => {
    try {
      setError(null);

      const res = await fetch("/api/dashboard/ActualizarEstado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_ticket,
          id_estado,
          id_desarrollador
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return false;
      }

      return true;

    } catch (err) {
      console.error(err);
      setError("Error al validar solución");
      return false;
    }
  };

  return { IDEstado,error };
}