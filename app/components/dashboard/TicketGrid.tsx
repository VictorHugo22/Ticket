'use client';
import { Ticket } from "@/app/hook/dashboard/useTicketGrid";

type Props = {
    tickets: Ticket[];
    onSelect: (ticket: Ticket) => void;
};

export default function TicketGrid({ tickets, onSelect }: Props) {

    if (tickets.length === 0) return <p>No hay tickets disponibles</p>;

    
    const getPriorityImage = (prioridad: number) => {
        switch (prioridad) {
            case 1: return "/images/Alta.png";
            case 2: return "/images/Media.png";
            case 3: return "/images/Baja.png";
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {tickets.map((ticket) => {
                
                const prioridad = (ticket.id_prioridad || "Default");

                return (
                    <div
                        key={ticket.id_ticket}
                        className="flex items-center p-4 rounded shadow cursor-pointer hover:shadow-lg bg-gray-700"
                        onClick={() => onSelect(ticket)}
                    >

                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{ticket.Proyecto?.nombre || "Proyecto"}</h3>
                            <p className="text-sm text-gray-200">{ticket.sucursal} - {ticket.departamento}</p>
                            <p className="text-sm text-gray-300">{ticket.Estado?.nombree || "Estado"}</p>
                            <p className="text-xs text-gray-400">{ticket.fechainicio}</p>
                        </div>

                        <img
                            src={getPriorityImage(prioridad)}
                            alt={prioridad}
                            className="w-22 h-22 mr-4"
                        />
                    </div>
                );
            })}
        </div>
    );
}