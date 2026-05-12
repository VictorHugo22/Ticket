'use client';
import React from "react";

type Ticket = {
    id: number;
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechaInicio: string;
};

type Props = {
    tickets: Ticket[];
    onSelect: (ticket: Ticket) => void; 
};

export default function TicketGrid({ tickets, onSelect }: Props) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    className="p-4 rounded shadow bg-gray-700 cursor-pointer hover:shadow-lg"
                    onClick={() => onSelect(ticket)} 
                >
                    <h3 className="font-semibold text-white">{ticket.reporteProblema}</h3>
                    <p className="text-sm text-gray-300">{ticket.departamento} - {ticket.sucursal}</p>
                    <p className="text-xs text-gray-400">{ticket.fechaInicio}</p>
                </div>
            ))}
        </div>
    );
}