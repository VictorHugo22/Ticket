'use client';
import React, { useState } from "react";

type TicketFormData = {
    sucursal: string;
    departamento: string;
    reporteProblema: string;
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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ sucursal: "", departamento: "", reporteProblema: ""});
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

                <div className="flex justify-between mt-4">
                    {/* <button type="submit" className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold">
                        Guardar
                    </button>
                    <button type="button" onClick={onCancel} className="bg-red-600 hover:bg-red-700 p-2 rounded font-semibold">
                        Cancelar
                    </button> */}
                </div>
            </form>
        </div>
    );
}



// 'use client';
// import { useState } from "react";
// import { useTicketFormOptions } from "@/app/hooks/dashboard/useTicketForm";

// type Props = {
//   onSubmit: (data: { sucursal: string; departamento: string; reporteProblema: string; fechaInicio: string }) => void;
// };

// export default function TicketForm({ onSubmit }: Props) {
//   const { sucursales, departamentos, loading, error } = useTicketFormOptions();

//   const [sucursal, setSucursal] = useState("");
//   const [departamento, setDepartamento] = useState("");
//   const [reporte, setReporte] = useState("");
//   const [fechaInicio, setFechaInicio] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ sucursal, departamento, reporteProblema: reporte, fechaInicio });
//   };

//   if (loading) return <p>Cargando opciones...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <label>
//         Sucursal
//         <select value={sucursal} onChange={(e) => setSucursal(e.target.value)} className="p-2 rounded border">
//           <option value="">Selecciona una sucursal</option>
//           {sucursales.map((s) => (
//             <option key={s} value={s}>{s}</option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Departamento
//         <select value={departamento} onChange={(e) => setDepartamento(e.target.value)} className="p-2 rounded border">
//           <option value="">Selecciona un departamento</option>
//           {departamentos.map((d) => (
//             <option key={d} value={d}>{d}</option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Reporte del problema
//         <input type="text" value={reporte} onChange={(e) => setReporte(e.target.value)} className="p-2 rounded border" />
//       </label>

//       <label>
//         Fecha de inicio
//         <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="p-2 rounded border" />
//       </label>

//       <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//         Crear Ticket
//       </button>
//     </form>
//   );
// }