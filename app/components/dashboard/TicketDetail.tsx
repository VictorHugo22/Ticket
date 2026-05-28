'use client';

import React, { useEffect } from "react";
import { Ticket } from "@/app/hook/dashboard/useTicketGrid"
import { useSeguimiento } from "@/app/hook/dashboard/useSeguimiento";
import { useHistorialComments } from "@/app/hook/dashboard/useHistorialComments";
import { useAuth } from "@/app/context/AuthContext";
import { puedeAceptarTicket, puedeCrearTicket } from "@/app/utils/permisos";

type Props = {
    ticket: Ticket | null;
    showCommentsFor?: number | null;
    comentario: string;
    setComentario: React.Dispatch<React.SetStateAction<string>>;
    onValidarSolucion?: (ticket: Ticket) => void;
    onResuelto?: (ticket: Ticket) => void;
    onComenzar?: (ticket: Ticket) => void;
};

export default function TicketDetail({
    ticket, showCommentsFor, comentario,
    setComentario, onValidarSolucion, onResuelto, onComenzar }: Props) {

    const { user } = useAuth();
    const { agregarComentario } = useSeguimiento();
    const { comentarioH, loadingH } = useHistorialComments(ticket?.id_ticket || 0);

    const descripcioProblema = comentarioH[0];
    const comentarioSeguimiento = comentarioH.slice(1);

    if (!ticket) {
        return <p className="text-gray-400">Selecciona un ticket para ver detalles</p>;
    }

    const id_usuario = Number(user?.id_usuario);
    const rolUsuario = user?.rol;
    const showHistorialComment = Number(ticket.Estado?.id_estado) !== 1;
    const showCommentSection = (showCommentsFor === ticket.id_ticket) || (Number(ticket.Estado?.id_estado) === 3 && puedeAceptarTicket);
    const showButtonCom = (Number(ticket.Estado?.id_estado) === 2 && puedeAceptarTicket(rolUsuario || null));
    const showButtonVS = (Number(ticket.Estado?.id_estado) === 3 && puedeAceptarTicket(rolUsuario || null));
    const showButtonRes = (Number(ticket.Estado?.id_estado) === 4 && puedeCrearTicket(rolUsuario || null));

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ticket) return;

        const result = await agregarComentario(ticket.id_ticket, id_usuario, comentario);
        if (result) {
            alert("Comentario enviado correctamente.    :)      ");
            setComentario("");
        } else {
            alert("No se pudo guardar el comentario.     :(    ");
        }
    }
    const handleComenzar = () => {
        if (!ticket) return;
        onComenzar?.(ticket);
    }
    const handleValidarSolucion = () => {
        if (!ticket) return;
        onValidarSolucion?.(ticket);
    }
    const handleResuelto = () => {
        if (!ticket) return;
        onResuelto?.(ticket);
    }
    useEffect(() => {
        setComentario("");
    }, [ticket]);

    type CamposTicket = {
        Proyecto?: string;
        IDTicket: number;
        Sucursal?: string;
        Departamento?: string;
        FechaInicio?: string;
        Creador?: string;
        Desarrollador?: string;
    };

    function getDatosporEstado(ticket: Ticket): CamposTicket {
        const DatosBase: CamposTicket = {
            Proyecto: ticket.Proyecto?.nombre,
            IDTicket: ticket.id_ticket,
            Sucursal: ticket.sucursal,
            Departamento: ticket.departamento,
            FechaInicio: ticket.fechainicio,
            Creador: `${ticket.Creador?.nombre || ""} ${ticket.Creador?.apellido || ""}`,
        };
        const estado = Number(ticket.Estado?.id_estado);

        switch (estado) {
            case 1:
                return DatosBase;
            case 2:
                return {
                    ...DatosBase,
                    Desarrollador: `${ticket.Desarr?.nombre || ""} ${ticket.Desarr?.apellido || ""}`,
                };
            case 3:
                return {
                    ...DatosBase,
                    Desarrollador: `${ticket.Desarr?.nombre || ""} ${ticket.Desarr?.apellido || ""}`,
                };
            case 4:
                return {
                    ...DatosBase,
                    Desarrollador: `${ticket.Desarr?.nombre || ""} ${ticket.Desarr?.apellido || ""}`,
                }
            case 5:
                return {
                    ...DatosBase,
                    Desarrollador: `${ticket.Desarr?.nombre || ""} ${ticket.Desarr?.apellido || ""}`,
                }
            default:
                return DatosBase;
        }
    };

    const campos = getDatosporEstado(ticket);

    return (
        <div className="flex flex-col gap-3 bg-gray-900 p-4 rounded shadow">
            <div className="bg-gray-800 p-3 rounded">
                <h1><strong>Proyecto: </strong> {campos.Proyecto} </h1>
                <p><strong>Número de Ticket: </strong> {campos.IDTicket} </p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
                <p><strong>Sucursal:</strong> {campos.Sucursal} </p>
                <p><strong>Departamento:</strong> {campos.Departamento} </p>
                <p><strong>Fecha de inicio:</strong> {campos.FechaInicio} </p>
                <p><strong>Mesa de Ayuda: </strong> {campos.Creador} </p>

                {/* <p><strong>Desarrollador: </strong> {ticket.Desarr?.nombre || "Nombre no asignado"} {ticket.Desarr?.apellido || "Apellido no asignado"}</p>
                <p><strong>Desarrollo de solucion: </strong> {ticket.reporteproblema}</p>
                <p><strong>Fecha de Cierre:</strong> {ticket.fechafin}</p> */}

            </div>
            <div className="bg-gray-800 p-3 rounded">
                <p><strong>Descripcion del problema: </strong> {descripcioProblema?.comentario || "No hay descripcion del problema"}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
                {campos.Desarrollador && <p><strong>Desarrollador:</strong> {campos.Desarrollador}</p>}
            </div>

            {showHistorialComment && (
                <div
                    className="flex flex-col gap-2 bg-gray-800 p-3 rounded"
                >
                    <h2 className="font-semibold text-white mb-2">Comentarios anteriores</h2>
                    {!loadingH && comentarioSeguimiento.length === 0 && (
                        <p className="text-gray-400">No hay comentarios anteriores</p>
                    )}

                    {comentarioSeguimiento.map((c) => (
                        <div
                            key={c.id_seguimiento}
                            className="p-2 rounded bg-gray-700 mb-2"
                        >
                            <p className="text-sm text-gray-200">{c.comentario}</p>
                            <p className="text-xs text-gray-400">
                                {new Date(c.fechaC).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}



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

            {showButtonCom && (
                <div
                    className="flex flex-col gap-2 bg-gray-800 p-3 rounded"
                >
                    <button
                        type="button"
                        onClick={handleComenzar}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Comenzar
                    </button>
                </div>
            )}

            {showButtonVS && (
                <div
                    className="flex flex-col gap-2 bg-gray-800 p-3 rounded"
                >
                    <button
                        type="button"
                        onClick={handleValidarSolucion}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Validar Solución
                    </button>
                </div>
            )}

            {showButtonRes && (
                <div
                    className="flex flex-col gap-2 bg-gray-800 p-3 rounded"
                >
                    <button
                        type="button"
                        onClick={handleResuelto}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Resuelto
                    </button>
                </div>
            )}
        </div>
    );
}