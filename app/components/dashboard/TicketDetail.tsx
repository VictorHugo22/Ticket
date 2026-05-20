'use client';

import React, { useState } from "react";
import {Ticket} from "@/app/hook/dashboard/useTicketGrid"

type Props = {
    ticket: Ticket | null;
    showCommentsFor?: number | null;
};

export default function TicketDetail({ ticket, showCommentsFor }: Props) {

    // const [showSolution, setShowSolution] = useState(false);
    const [comentario, setComentario] = useState("");


    if (!ticket) {
        return <p className="text-gray-400">Selecciona un ticket para ver detalles</p>;
    }
    console.log("datos del ticket en ticketdetail", ticket);

    // const handleAcceptClick = () => {
    //     setShowSolution(true);
    // }
    const rolUsuario = localStorage.getItem("rolUsuario");
    const isDeveloper = rolUsuario === "Programador1" || rolUsuario === "Programador2";
    const showCommentSection = (showCommentsFor === ticket.id_ticket) || (Number(ticket.Estado?.id_estado) === 2 && isDeveloper);
    //showCommentsFor === ticket.id_ticket;
    console.log("Ticketdetail showcommentsFor -------====== ", (Number(ticket.Estado?.id_estado)));
    console.log("Ticketdetail id_ticket -------====== ", (isDeveloper));

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Comentario del desarrollador", comentario);
        setComentario("");
        ///
    }

    return (
        <div className="flex flex-col gap-3 bg-gray-900 p-4 rounded shadow">
            <div className="bg-gray-800 p-3 rounded">
                <h1><strong>Proyecto: </strong> {ticket.Proyecto?.nombre || "Proyecto no asignado"}</h1>
                <p><strong>Sucursal:</strong> {ticket.sucursal}</p>
                <p><strong>Departamento:</strong> {ticket.departamento}</p>
                <p><strong>Fecha de inicio:</strong> {ticket.fechainicio}</p>
                <p><strong>Mesa de Ayuda: </strong> {ticket.Creador?.nombre || "Nombre no asignado"} {ticket.Creador?.apellido || "Apellido no asignado"}</p>
                <p><strong>Descripcion del problema: </strong> {ticket.reporteproblema}</p>
                <p><strong>Desarrollador: </strong> {ticket.Desarr?.nombre || "Nombre no asignado"} {ticket.Desarr?.apellido || "Apellido no asignado"}</p>
                <p><strong>Desarrollo de solucion: </strong> {ticket.reporteproblema}</p>
                <p><strong>Fecha de Cierre:</strong> {ticket.fechafin}</p>

            </div>


            {showCommentSection && (
                <form
                    onSubmit={handleSubmitComment}
                    className="flex flex-col gap-2 bg-gray-800 p-3 rounded"
                >
                    <h2 className="font-semibold text-white mb-2">Agregar solución</h2>
                    <textarea
                        placeholder="Escribe tu protocolo de solución..."
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Guardar comentario
                    </button>
                </form>
            )}
        </div>
    );
}