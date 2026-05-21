'use client'
import { useState, useEffect } from "react";

export type Comentario = {
    id_seguimiento: number;
    id_ticket: number;
    id_usuario: number;
    comentario: string;
    FechaC: string;
};

export function useHistorialComments(id_ticket: number) {
    const [comentarioH, setComentarioH] = useState<Comentario[]>([]);
    const [loadingH, setLoadingH] = useState(true);
    const [errorH, setErrorH] = useState<string | null>(null);

    useEffect(() => {
        async function fetchComentarios() {
            if (!id_ticket) return;

            try {
                const res = await fetch(`/api/dashboard/HistorialComentarios?id_ticket=${id_ticket}`);
                const data = await res.json();

                if (!data.success) {
                    setErrorH(data.message); 
                    setComentarioH([]);
                    return;
                }
                console.log("lista de comentaros.........", data);
                setComentarioH(data.comentarios || []);
            } catch (err) {
                console.error(err);
                setErrorH("Error al cargar comentarios");
                setComentarioH([]);
            } finally {
                setLoadingH(false); 
            }
        }

        fetchComentarios();
    }, [id_ticket]);

    return { comentarioH, loadingH, errorH };
}
