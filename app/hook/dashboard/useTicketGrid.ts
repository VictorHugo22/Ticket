'use client';
import { useState, useEffect, useCallback } from "react";

export type Ticket = {
    id_ticket: number;
    id_prioridad: number;
    sucursal: string;
    departamento: string;
    reporteproblema: string;
    fechainicio: string;
    fechafin: string;
    Prioridad: {
        nombre: string;
    } | null;
    Proyecto: {
        nombre: string;
    } | null;
    Estado: {
        id_estado: string;
        nombree: string;
    } | null;
    Creador: {
        nombre: string;
        apellido: string;
    }
    Desarr: {
        nombre:string;
        apellido: string;
    }
};

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTickets = async () => {
        setLoading(true);
        setError(null);

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
            console.error(error);
            setError("Error al cargar los tickets");
            setTickets([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTickets();
    }, []);

    return { tickets, loading, error, reloadTickets: fetchTickets };
}