'use client';

import { useState } from "react";
import { useTicketForm } from "@/app/hook/dashboard/useTicketForm";
import { useCreateTicket } from "@/app/hook/dashboard/useCreateTicket";

type Props = {
    onTicketCreado?: () => void;
};

export default function TicketForm({ onTicketCreado }: Props) {
    const { ticketProyectos,
        loadingProyectos, 
        errorProyectos, 
        ticketPrioridad, 
        loadingPrioridad, 
        errorPrioridad 
    } = useTicketForm();
    const { createTicket, loadingTicket, errorTicket, successTicket } = useCreateTicket();
    const [idProyecto, setIdProyecto] = useState("");
    const [idPrioridad, setIdPrioridad] = useState("");
    const [sucursal, setSucursal] = useState("");
    const [departamento, setDepartamento] = useState("");
    //const [problem, setProblem] = useState("");
    const [comentario, setComentario] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que el navegador recargue la página

        const idUsuarioString = localStorage.getItem("idUsuario");

        if (!idUsuarioString) {
            console.error("No hay usuario logueado en localStorage");
            return;
        }

        const idUsuario = Number(idUsuarioString);

        if (isNaN(idUsuario)) {
            console.error("idUsuario no es un número válido:", idUsuarioString);
            return;
        }

        const datosTicket = { // ----> construccion del objeto datosTicket
            id_proyecto: Number(idProyecto),
            sucursal: sucursal,
            departamento: departamento,
            //problem: problem,
            id_usuario: Number(idUsuario),
            id_prioridad: Number(idPrioridad),
            comentario: comentario
        }; // <-------

        console.log("Datos enviados desde TicketForm:", datosTicket);

        const ticketCreado = await createTicket(datosTicket);  // fetch al API useCreateTicket

        if (ticketCreado) {
            console.log("Ticket creado correctamente:", ticketCreado);

            //Limpiar datos
            setIdProyecto("");
            setSucursal("");
            setDepartamento("");
            //setProblem("");
            setComentario("");

            if (onTicketCreado) {
                onTicketCreado();
            }
        }
    };

    if (loadingProyectos) {
        return <p className="text-gray-300">Cargando proyectos...</p>;
    }

    if (errorProyectos) {
        return <p className="text-red-500">{errorProyectos}</p>;
    }

    console.log("Proyectos recibidos: (tikcetForm)", ticketProyectos);

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

                    {ticketProyectos.map((proyecto) => (
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

                Prioridad
                <select
                    value={idPrioridad}
                    onChange={(e) => setIdPrioridad(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    required
                >
                    <option value="">Selecciona una prioridad</option>

                    {ticketPrioridad.map((prioridad) => (
                        <option
                            key={prioridad.id_prioridad}
                            value={prioridad.id_prioridad}
                        >
                            {prioridad.nombrep}
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

            <label className="flex flex-col gap-1">
                Departamento
                <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe el departamento"
                    required
                />
            </label>

            <label className="flex flex-col gap-1">
                Reporte del problema
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Descripción del problema..."
                    required
                />
            </label>

            <button
                type="submit"
                disabled={loadingTicket}
                className="bg-green-700 hover:bg-green-600 text-white p-2 rounded font-semibold"
            >
                {loadingTicket ? "Guardando..." : "Guardar ticket"}
            </button>

            {errorTicket && (
                <p className="text-red-500">{errorTicket}</p>
            )}
            {successTicket && (
                <p className="text-green-500">{successTicket}</p>
            )}
        </form>
    );
}