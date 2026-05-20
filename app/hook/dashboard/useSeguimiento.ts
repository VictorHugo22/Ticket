'use client';
import { useState } from "react";

export function useSeguimiento() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const agregarComentario = async (
        id_ticket: number,
        id_usuario: number,
        comentario: string,
    ) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/dashboard/GuardarComentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_ticket, id_usuario, comentario }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                return null;
            }

            return data.seguimiento;
        } catch (err) {
            console.error(err);
            setError("Error al enviar el comentario");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { agregarComentario, loading, error };
}