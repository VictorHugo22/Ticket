'use client';

import { useEffect, useState } from "react";

export type Proyecto = {
    id_proyecto: number;
    nombre: string;
};

export function useTicketForm() {
    const [ticketProyectos, setTicketProyectos] = useState<Proyecto[]>([]);
    const [loadingProyectos, setLoadingProyectos] = useState(true);
    const [errorProyectos, setError] = useState<string | null>(null);
    

    useEffect(() => {
        async function fetchProyectos() {
            try {
                const res = await fetch("/api/dashboard/proyecto");
                const result = await res.json();

                console.log("Proyectos recibidos:", result);

                if (!result.success) {
                    setError(result.message);
                    setTicketProyectos([]);
                    return;
                }

                setTicketProyectos(result.proyectos || []);
                console.log("Datos guardados del proyecto en setProyectos", setTicketProyectos);
                console.log("Corroborar datos guardados en ticketProyectos", ticketProyectos);

            } catch (err) {
                console.error("Error al cargar proyectos:", err);
                setError("Error al cargar proyectos");
                setTicketProyectos([]);

            } finally {
                setLoadingProyectos(false);
            }
        }

        fetchProyectos();
    }, []);

    return {
        ticketProyectos,
        loadingProyectos,
        errorProyectos,
    };
}