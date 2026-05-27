'use client';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function useTicketActions() {
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const id_desarrollador = user?.id_usuario;

  // const aceptarTicket = async (id_ticket: number) => {
  //   try {
  //     // const idDesarrolladorString = localStorage.getItem("idUsuario");
  //     if (id_desarrollador) {
  //       // console.log("Valor de idUsuario:........", idDesarrolladorString);
  //       return;
  //     }



  //     const res = await fetch("/api/dashboard/ActualizarEstado", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id_ticket,
  //         id_estado: 2,
  //         id_desarrollador
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!data.success) {
  //       setError(data.message);
  //       return false;
  //     }

  //     return true;
  //   } catch (err) {
  //     console.error(err);
  //     setError("Error al actualizar el estado del ticket");
  //     return false;
  //   }
  // };

  // const validarSolucion = async (id_ticket: number) => {
  //   try {
  //     setError(null);

  //     const res = await fetch("/api/dashboard/ActualizarEstado", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id_ticket,
  //         id_estado: 4,
  //         id_desarrollador
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!data.success) {
  //       setError(data.message);
  //       return false;
  //     }

  //     return true;

  //   } catch (err) {
  //     console.error(err);
  //     setError("Error al validar solución");
  //     return false;
  //   }
  // };

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