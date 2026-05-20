'use client';
import { useState } from "react";

export function useTicketActions() {
  const [error, setError] = useState<string | null>(null);

  const aceptarTicket = async (id_ticket: number) => {
    try {
      const idDesarrolladorString = localStorage.getItem("idUsuario");
      if (!idDesarrolladorString) return;

      const id_desarrollador = Number(idDesarrolladorString);

      const res = await fetch("/api/dashboard/ActualizarEstado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_ticket,
          id_estado: 2,
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
      setError("Error al actualizar el estado del ticket");
      return false;
    }
  };

  return { aceptarTicket, error };
}