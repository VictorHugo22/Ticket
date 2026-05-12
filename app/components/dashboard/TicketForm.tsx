'use client';
import React, { useState } from "react";

type TicketFormData = {
    sucursal: string;
    departamento: string;
    reporteProblema: string;
    fechaInicio: string;
};

type Props = {
    onSubmit: (data: TicketFormData) => void; 
    onCancel: () => void; 
};

export default function TicketForm({ onSubmit, onCancel }: Props) {
    const [formData, setFormData] = useState<TicketFormData>({
        sucursal: "",
        departamento: "",
        reporteProblema: "",
        fechaInicio: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ sucursal: "", departamento: "", reporteProblema: "", fechaInicio: "" });
    };

    return (
        <div className="bg-gray-800 p-6 rounded shadow w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-white">Crear Nuevo Ticket</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="sucursal"
                    placeholder="Sucursal"
                    value={formData.sucursal}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    required
                />
                <input
                    type="text"
                    name="departamento"
                    placeholder="Departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    required
                />
                <textarea
                    name="reporteProblema"
                    placeholder="Reporte del problema"
                    value={formData.reporteProblema}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    required
                />
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    required
                />
                <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold">
                        Guardar
                    </button>
                    <button type="button" onClick={onCancel} className="bg-red-600 hover:bg-red-700 p-2 rounded font-semibold">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}