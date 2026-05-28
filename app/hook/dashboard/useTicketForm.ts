'use client';

import { useEffect, useState } from "react";

export type Proyecto = {
    id_proyecto: number;
    nombre: string;
};

export type Prioridad = {
    id_prioridad: number;
    nombrep: string;
};

export function useTicketForm() {
    const [ticketProyectos, setTicketProyectos] = useState<Proyecto[]>([]);
    const [loadingProyectos, setLoadingProyectos] = useState(true);
    const [errorProyectos, setError] = useState<string | null>(null);

    const [ticketPrioridad, setTicketPrioridad] = useState<Prioridad[]>([]);
    const [loadingPrioridad, setLoadingPrioridad] = useState(true);
    const [errorPrioridad, setErrorPrioridad] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProyectos() {
            try {
                const res = await fetch("/api/dashboard/proyecto");
                const result = await res.json();

                if (!result.success) {
                    setError(result.message);
                    setTicketProyectos([]);
                    return;
                }

                setTicketProyectos(result.proyectos || []);

            } catch (err) {
                console.error("Error al cargar proyectos:", err);
                setError("Error al cargar proyectos");
                setTicketProyectos([]);

            } finally {
                setLoadingProyectos(false);
            }
        }


        async function fetchPrioridades() {
            try{
                const res = await fetch("/api/dashboard/Prioridad");
                const result = await res.json();

                if(!result.success) {
                    setErrorPrioridad(result.message);
                    setTicketPrioridad([]);
                    return;
                }

                setTicketPrioridad(result.prioridad || [] );
            } catch (err){
                setErrorPrioridad("Error al cargar prioridades");
                setTicketPrioridad([]);
                console.error(err);
            } finally {
                setLoadingPrioridad(false);
            }
        }

        fetchProyectos();
        fetchPrioridades();
    }, []);

    return {
        ticketProyectos,
        loadingProyectos,
        errorProyectos,
        ticketPrioridad,
        loadingPrioridad,
        errorPrioridad,
    };
}