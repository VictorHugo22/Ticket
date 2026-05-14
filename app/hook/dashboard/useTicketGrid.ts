'use client';
import { useState, useEffect } from "react";

export type Ticket = {
    id: number;
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechaInicio: string;
    prioridad: string;
};

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTickets() {
            try {
                const res = await fetch("/api/dashboard");
                const data = await res.json();

                if (!data.success) {
                    setError(data.message);
                    setTickets([]);
                } else {
                    setTickets(data.tickets);
                }
            } catch (err) {
                setError("Error al cargar los tickets");
                setTickets([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTickets();
    }, []);

    return { tickets, loading, error };
}