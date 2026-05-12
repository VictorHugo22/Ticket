'use client';
import React from "react";


type Ticket = {
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechaInicio: string;
    developer?: string;
    files?: { name: string; size: string }[];
    comments?: { user: string; message: string; time: string }[];
};

type Props = {
    ticket: Ticket | null;
};

export default function TicketDetail({ ticket }: Props) {
    if (!ticket) {
        return <p className="text-gray-400">Selecciona un ticket para ver detalles</p>;
    }

    return (
        <div className="flex flex-col gap-3 bg-gray-900 p-4 rounded shadow" mb-4>
            <h3 className="text-lg font-bold text-white">{ticket.reporteProblema}</h3>
            <p><strong>Sucursal:</strong> {ticket.sucursal}</p>
            <p><strong>Departamento:</strong> {ticket.departamento}</p>
            <p><strong>Fecha de inicio:</strong> {ticket.fechaInicio}</p>
            {ticket.developer && <p><strong>Desarrollador:</strong> {ticket.developer}</p>}

            {ticket.files && ticket.files.length > 0 && (
                <div>
                    <strong>Archivos adjuntos:</strong>
                    <ul className="list-disc ml-4">
                        {ticket.files.map((file, idx) => (
                            <li key={idx}>{file.name} ({file.size})</li>
                        ))}
                    </ul>
                </div>
            )}

            {ticket.comments && ticket.comments.length > 0 && (
                <div>
                    <strong>Comentarios:</strong>
                    <ul className="list-disc ml-4">
                        {ticket.comments.map((comment, idx) => (
                            <li key={idx}><strong>{comment.user}:</strong> {comment.message} ({comment.time})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}