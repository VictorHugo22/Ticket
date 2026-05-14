'use client';

import { useState } from "react";
import { useTicketForm } from "@/app/hook/dashboard/useTicketForm";
import { useCreateTicket } from "@/app/hook/dashboard/useCreateTicket";

type Props = {
    onTicketCreado?: () => void;
};

export default function TicketForm({ onTicketCreado }: Props) {
    const { proyectos, loadingProyectos, error } = useTicketForm();
    const {createTicket, loading, success} = useCreateTicket();
    const [idProyecto, setIdProyecto] = useState("");
    const [sucursal, setSucursal] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const datosTicket = {
            id_proyecto: Number(idProyecto),
            sucursal: sucursal,
        };

        console.log("Datos enviados desde TicketForm:", datosTicket);

        const ticketCreado = await createTicket(datosTicket);

        if (ticketCreado) {
            console.log("Ticket creado correctamente:", ticketCreado);

            setIdProyecto("");
            setSucursal("");

            if (onTicketCreado) {
                onTicketCreado();
            }
        }
    };

    if (loadingProyectos) {
        return <p className="text-gray-300">Cargando proyectos...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
                Proyecto
                <select
                    value={idProyecto}
                    onChange={(e) => setIdProyecto(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    required
                >
                    <option value="">Selecciona un proyecto</option>

                    {proyectos.map((proyecto) => (
                        <option
                            key={proyecto.id_proyecto}
                            value={proyecto.id_proyecto}
                        >
                            {proyecto.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1">
                Sucursal
                <input
                    type="text"
                    value={sucursal}
                    onChange={(e) => setSucursal(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe la sucursal"
                    required
                />
            </label>

            {/* <label className="flex flex-col gap-1">
                Departamento
                <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                />
            </label> */}

            {/* <label className="flex flex-col gap-1">
                Reporte del problema
                <textarea
                    value={reporteproblema}
                    onChange={(e) => setReporteproblema(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                />
            </label> */}

            <button
                type="submit"
                disabled={loading}
                className="bg-green-700 hover:bg-green-600 text-white p-2 rounded font-semibold"
            >
                {loading ? "Guardando..." : "Guardar ticket"}
            </button>

            {error && (
                <p className="text-red-500">{error}</p>
            )}
            {success && (
                <p className="text-green-500">{success}</p>
            )}
        </form>
    );
}