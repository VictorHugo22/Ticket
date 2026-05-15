'use client';
import React from "react";

type Props = {
    onCreateTicket: () => void;
};

export default function Sidebar({ onCreateTicket }: Props) {
    const rolUsuario = localStorage.getItem("rolUsuario");

    const puedeCrearTicket = rolUsuario !== "Programador1"; // solo otros roles pueden crear
    const puedeAceptarTicket = rolUsuario === "Programador1"; // solo desarrolladores

    return (
        <aside className="w-60 bg-gray-800 flex flex-col py-4 px-2 border-r border-gray-700 h-full">

            <div className="mb-6">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 mx-auto" />
            </div>

            {puedeCrearTicket && (
                <button
                    className="flex items-center gap-2 mb-2 p-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
                    onClick={onCreateTicket}
                >
                    ➕ Crear Ticket
                </button>
            )}


            {/* Menú lateral */}
            <button className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700">

            </button>
            <button className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700">

            </button>
            <button className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700">

            </button>
            <button className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700">

            </button>
        </aside>
    );
}