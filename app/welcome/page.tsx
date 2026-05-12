'use client';
import { useState } from "react";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/components/dashboard/Sidebar";
import TicketDetail from "@/app/components/dashboard/TicketDetail";
import TicketGrid from "@/app/components/dashboard/TicketGrid";
import TicketForm from "@/app/components/dashboard/TicketForm"

type Ticket = {
  id: number;
  sucursal: string;
  departamento: string;
  reporteProblema: string;
  fechaInicio: string;
};

export default function DashboardPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showForm, setShowForm] = useState(false);


  const handleCreateTicket = (data: Omit<Ticket, "id">) => {
    const newTicket = { id: tickets.length + 1, ...data };
    setTickets([...tickets, newTicket]);
    setShowForm(false);
  };

  // Datos de ejemplo
  const tickets: Ticket[] = [
    { id: 1, sucursal: "Sucursal 1", departamento: "IT", reporteProblema: "Falla A", fechaInicio: "2026-05-12" },
    { id: 2, sucursal: "Sucursal 2", departamento: "Soporte", reporteProblema: "Falla B", fechaInicio: "2026-05-11" },
    { id: 3, sucursal: "Sucursal 3", departamento: "Finanzas", reporteProblema: "Falla C", fechaInicio: "2026-05-10" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden mb-5">
        <Sidebar />

        <main className="flex-1 p-6 overflow-auto">
          {showForm ? (
            <TicketForm onSubmit={handleCreateTicket} onCancel={() => setShowForm(false)} />
          ) : (
            <TicketGrid tickets={tickets} onSelect={setSelectedTicket} />
          )}
        </main>

        <aside className="w-1/4.5 p-6 border-l border-gray-700 overflow-y-auto mb-5">
          <TicketDetail ticket={selectedTicket} />
        </aside>
      </div>
    </div>
  );
}