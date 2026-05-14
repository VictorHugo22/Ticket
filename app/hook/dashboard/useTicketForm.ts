'use client';

import { useEffect, useState } from "react";

export type Proyecto = {
    id_proyecto: number;
    nombre: string;
};

export function useTicketForm() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loadingProyectos, setLoadingProyectos] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        async function fetchProyectos() {
            try {
                const res = await fetch("/api/dashboard/proyecto");
                const result = await res.json();

                console.log("Proyectos recibidos:", result);

                if (!result.success) {
                    setError(result.message);
                    setProyectos([]);
                    return;
                }

                setProyectos(result.proyectos || []);

            } catch (err) {
                console.error("Error al cargar proyectos:", err);
                setError("Error al cargar proyectos");
                setProyectos([]);

            } finally {
                setLoadingProyectos(false);
            }
        }

        fetchProyectos();
    }, []);

    return {
        proyectos,
        loadingProyectos,
        error,
    };
}