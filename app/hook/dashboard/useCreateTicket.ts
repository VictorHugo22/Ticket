'use client';

import { useState } from "react";

export type CreateTicketData = {
    id_proyecto: number;
    sucursal: string;
    departamento: string;
    id_usuario: number;
    id_prioridad: number;
};

export function useCreateTicket() {
    const [loadingTicket, setLoading] = useState(false);
    const [errorTicket, setError] = useState<string | null>(null);
    const [successTicket, setSuccess] = useState<string | null>(null);

    const createTicket = async (data: CreateTicketData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);


        try {
            const res = await fetch("/api/dashboard/CrearTicket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_proyecto: data.id_proyecto,
                    sucursal: data.sucursal,
                    departamento: data.departamento,
                    id_usuario: data.id_usuario,
                    id_prioridad: data.id_prioridad,
                }),
            });

            const result = await res.json();

            if (!result.success) {
                setError(result.message);
                return null;
            }

            setSuccess("Ticket creado correctamente");
            return result.ticket;

        } catch (err) {
            setError("Error al crear el ticket");
            return null;

        } finally {
            setLoading(false);
        }
    };

    return {
        createTicket,
        loadingTicket,
        errorTicket,
        successTicket,
    };
}
