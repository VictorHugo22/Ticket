'use client';
import { useState } from "react";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/components/dashboard/Sidebar";
import TicketDetail from "@/app/components/dashboard/TicketDetail";
import TicketGrid from "@/app/components/dashboard/TicketGrid";
import TicketForm from "@/app/components/dashboard/TicketForm";
import { useTickets, Ticket } from "@/app/hook/dashboard/useTicketGrid";



export default function DashboardPage() {
  const { tickets, loading, error } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleOpenModal = () => setShowCreateModal(true);
  const handleCloseModal = () => setShowCreateModal(false);

  const [estadoFiltro, setEstadoFiltro] = useState<string>("Todos");

  const ticketsFiltrados = estadoFiltro === "Todos"
    ? tickets
    : tickets.filter((ticket) => ticket.Estado?.nombree === estadoFiltro);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden mb-5">
        <Sidebar onCreateTicket={handleOpenModal} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-5">
            <button
             onClick={() => setEstadoFiltro("Pendiente de asignacion")}
            className="flex items-center w-42 hover:bg-slate-600 gap-2 mb-2 p-2 rounded font-semibold">
              Pendeinte de Asig.
            </button>
            <button 
            onClick={() => setEstadoFiltro("Asignado")}
            className="flex items-center w-32 hover:bg-blue-600 gap-2 mb-2 p-2 rounded  font-semibold">
              Asignado
            </button>
            <button 
            onClick={() => setEstadoFiltro("En Atencion")}
            className="flex items-center w-32 hover:bg-amber-500 gap-2 mb-2 p-2 rounded font-semibold">
              En Atencion
            </button>
            <button 
            onClick={() => setEstadoFiltro("En Validacion")}
            className="flex items-center w-32 hover:bg-purple-600 gap-2 mb-2 p-2 rounded font-semibold">
              En Validacion
            </button>
            <button 
            onClick={() => setEstadoFiltro("Resuelto")}
            className="flex items-center w-32 hover:bg-green-600 gap-2 mb-2 p-2 rounded font-semibold">
              Resuelto
            </button>
          </div>

          {loading && <p>Cargando tickets...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <TicketGrid tickets={ticketsFiltrados} onSelect={setSelectedTicket} />
          )}
        </main>

        <aside className="w-1/4 p-6 border-l border-gray-700 overflow-y-auto mb-5">
          <TicketDetail ticket={selectedTicket} />
        </aside>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-1/2">
            <button
              className="text-white mb-4"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
            <TicketForm onSubmit={(data) => {
              console.log("Ticket creado", data);
              handleCloseModal();
            }} />
          </div>
        </div>
      )}
    </div>
  );
}