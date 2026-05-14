'use client';
import { useState, useEffect } from "react";

export type Ticket = {
    id_ticket: number;
    id_prioridad: number;
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechainicio: string;
    Prioridad:{
        nombre: string;
    } | null;
    Proyecto:{
        nombre: string;
    } | null;
    Estado:{
        nombree: string;
    } | null;

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