'use client';
import { useState, useEffect } from "react";
import { Ticket } from "@/app/hook/dashboard/useTicketGrid";
import { Check } from "lucide-react";

type Props = {
    tickets: Ticket[];
    onSelect: (ticket: Ticket) => void;
    onAccept: (ticket: Ticket) => void;
};

export default function TicketGrid({ tickets, onSelect, onAccept }: Props) {
    const rolUsuario = localStorage.getItem("rolUsuario");
    
    const AcceptTicketRoles = ["Programador1", "Programador2"];
    //const [nombreEstado, setNombreEstado] = useState<string | null>(null);
    if (tickets.length === 0) return <p>No hay tickets disponibles</p>;

    // useEffect(() => {
    //     const rol = localStorage.getItem("rolUsuario");
    //     setRolUsuario(rol);
    // }, []);

    //const AcceptTicket = rolUsuario != "Programador1" && rolUsuario != "Programador2"; // solo otros roles pueden crear
    //const puedeAceptarTicket = rolUsuario === "Programador1"; // solo desarrolladores


    const getPriorityImage = (prioridad: number) => {
        switch (prioridad) {
            case 1: return "/images/Baja.png";
            case 2: return "/images/Media.png";
            case 3: return "/images/Alta.png";
            default: return "/images/default.png";
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {tickets.map((ticket) => {
                const prioridad = ticket.id_prioridad ?? 0;
                const isPending = Number(ticket.Estado?.id_estado) === 1;
                const canAccept = isPending && AcceptTicketRoles.includes(rolUsuario || "");
                // const AcceptTicket =
                //     ["Programador1", "Programador2"].includes(rolUsuario || "") &&
                //     ticket.Estado?.nombree == "Pendiente de asignacion";

                return (
                    <div
                        key={ticket.id_ticket}
                        className="flex items-center pl-4 rounded shadow cursor-pointer hover:shadow-lg bg-gray-700"
                        onClick={() => onSelect(ticket)}
                    >

                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{ticket.Proyecto?.nombre || "Proyecto"}</h3>
                            <p className="text-sm text-gray-200">{ticket.sucursal} - {ticket.departamento}</p>
                            <p className="text-sm text-gray-300">{ticket.Estado?.nombree || "Estado"}</p>
                            <p className="text-xs text-gray-400">{ticket.fechainicio}</p>
                        </div>



                        {/* <button>aceptar</button> */}

                        <img
                            src={getPriorityImage(prioridad)}
                            alt={ticket.Prioridad?.nombre}
                            className="w-[88px] h-[88px] mr-4"
                        />

                        
                        {canAccept && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAccept(ticket);
                                }}
                                className="h-full w-12 flex items-center justify-center border-l border-gray-600 bg-gray-800 hover:bg-green-600 transition-colors duration-200"
                                title="Aceptar ticket"
                            >
                                <Check className="w-7 h-7 text-white" />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}