'use client';


type Ticket = {
    sucursal: string;
    departamento: string;
    fechainicio: string;
    reporteproblema: string;
    fechafin: string;
};

type Props = {
    ticket: Ticket | null;
};

export default function TicketDetail({ ticket }: Props) {

    if (!ticket) {
        return <p className="text-gray-400">Selecciona un ticket para ver detalles</p>;
    }

    return (
        <div className="flex flex-col gap-3 bg-gray-900 p-4 rounded shadow">
            <h1><strong>Proyecto: </strong> {ticket.Proyecto.nombre}</h1> 
            <p><strong>Sucursal:</strong> {ticket.sucursal}</p>
            <p><strong>Departamento:</strong> {ticket.departamento}</p>
            <p><strong>Fecha de inicio:</strong> {ticket.fechainicio}</p>
            <p><strong>Mesa de Ayuda: </strong> {ticket.Creador.nombre} {ticket.Creador.apellido}</p>
            <p><strong>Descripcion del problema: </strong> {ticket.reporteproblema}</p>
            <p><strong>Desarrollador: </strong> {ticket.Desarr.nombre} {ticket.Desarr.apellido}</p>
            <p><strong>Desarrollo de solucion: </strong> {ticket.reporteproblema}</p>
            <p><strong>Fecha de Cierre:</strong> {ticket.fechafin}</p>
        </div>
    );
}