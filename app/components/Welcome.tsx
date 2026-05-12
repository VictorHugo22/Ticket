'use client';
import React, { useState } from "react";

// Tipo de ticket
type Ticket = {
    id: number;
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechaInicio: string;
};

export default function TicketDashboardWithForm() {
    const [tickets, setTickets] = useState<Ticket[]>([
        { id: 1, sucursal: "Sucursal 1", departamento: "IT", reporteProblema: "Falla A", fechaInicio: "2026-05-12" },
        { id: 2, sucursal: "Sucursal 2", departamento: "Soporte", reporteProblema: "Falla B", fechaInicio: "2026-05-11" },
    ]);

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Estado del formulario
    const [formData, setFormData] = useState({
        sucursal: "",
        departamento: "",
        reporteProblema: "",
        fechaInicio: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket: Ticket = {
            id: tickets.length + 1,
            sucursal: formData.sucursal,
            departamento: formData.departamento,
            reporteProblema: formData.reporteProblema,
            fechaInicio: formData.fechaInicio,
        };
        setTickets([...tickets, newTicket]);
        setShowForm(false);
        setFormData({ sucursal: "", departamento: "", reporteProblema: "", fechaInicio: "" });
    };

    return (
        <div className="flex flex-col h-screen w-screen font-sans bg-gray-900 text-white">
            {/* Barra superior */}
            <header className="flex justify-between items-center bg-gray-800 shadow px-6 py-3 mb-4">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span>Usuario A</span>
                    <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                </div>
            </header>

            {/* Cuerpo principal */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar izquierdo */}
                <aside className="w-60 bg-gray-800 flex flex-col py-4 px-2 border-r border-gray-700 mb-4">
                    <div className="mb-6">
                        <img src="/logo.png" alt="Logo" className="w-12 h-12 mx-auto" />
                    </div>
                    <button
                        className="flex items-center gap-2 mb-2 p-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
                        onClick={() => setShowForm(true)}
                    >
                        ➕ Crear Ticket
                    </button>
                    <button className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-gray-700">📧 Todos Tickets</button>
                </aside>

                {/* Panel central */}
                <main className="flex-1 flex flex-col p-6 gap-4 overflow-auto">
                    {showForm ? (
                        // FORMULARIO PARA CREAR TICKET
                        <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Nuevo Ticket</h2>
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="sucursal"
                                    placeholder="Sucursal"
                                    value={formData.sucursal}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    name="departamento"
                                    placeholder="Departamento"
                                    value={formData.departamento}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                                    required
                                />
                                <textarea
                                    name="reporteProblema"
                                    placeholder="Reporte del problema"
                                    value={formData.reporteProblema}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                                    required
                                />
                                <input
                                    type="date"
                                    name="fechaInicio"
                                    value={formData.fechaInicio}
                                    onChange={handleInputChange}
                                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                                    required
                                />
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-600 hover:bg-red-700 p-2 rounded font-semibold"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        // PANEL DE TICKETS
                        <div className="grid grid-cols-2 gap-4">
                            {tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="p-4 rounded shadow bg-gray-700 cursor-pointer hover:shadow-lg"
                                    onClick={() => setSelectedTicket(ticket)}
                                >
                                    <h3 className="font-semibold">{ticket.reporteProblema}</h3>
                                    <p className="text-sm text-gray-300">{ticket.departamento} - {ticket.sucursal}</p>
                                    <p className="text-xs text-gray-400">{ticket.fechaInicio}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* Panel derecho */}
                <aside className="w-1/3 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto mb-4">
                    {selectedTicket ? (
                        <div className="flex flex-col gap-2 bg-gray-900 p-4 rounded shadow">
                            <h3 className="text-lg font-bold">{selectedTicket.reporteProblema}</h3>
                            <p><strong>Sucursal:</strong> {selectedTicket.sucursal}</p>
                            <p><strong>Departamento:</strong> {selectedTicket.departamento}</p>
                            <p><strong>Fecha Inicio:</strong> {selectedTicket.fechaInicio}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400">Selecciona un ticket para ver detalles</p>
                    )}
                </aside>
            </div>
        </div>
    );
}