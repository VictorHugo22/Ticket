'use client';

import { useState } from "react";

export type CreateTicketData = {
    id_proyecto: number;
    sucursal: string;
};

export function useCreateTicket() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const createTicket = async (data: CreateTicketData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        console.log("Datos enviados desde useCreateTicket:", data);

        try {
            const res = await fetch("/api/dashboard/CrearTicket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_proyecto: data.id_proyecto,
                    sucursal: data.sucursal,
                }),
            });

            const result = await res.json();
            console.log("Respuesta de crear ticket:", result);

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
        loading,
        error,
        success,
    };
}
