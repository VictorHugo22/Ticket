'use client';
import { useState } from "react";
import Header from "@/app/components/dashboard/Header";
import Sidebar from "@/app/components/dashboard/Sidebar";
import TicketDetail from "@/app/components/dashboard/TicketDetail";
import TicketGrid from "@/app/components/dashboard/TicketGrid";
import TicketForm from "@/app/components/dashboard/TicketForm";
import { useTickets, Ticket } from "@/app/hook/dashboard/useTicketGrid";
import { useTicketActions } from "../hook/dashboard/useTicketActions";



export default function DashboardPage() {
  const { tickets, loading, error, reloadTickets } = useTickets();
  const { aceptarTicket } = useTicketActions();

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCommentsFor, setShowCommentsFor] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ticketDetailComment, setTicketDetailComment] = useState("");

  // clic en la tarjeta para ver la informacion
  const handleSelect = (ticket: Ticket) => {
    if (ticketDetailComment.trim() !== ""){
      const confirmar = window.confirm(
        "Tienes comentarios sin guardar. Si cambias de ticket, se perderan. Deseas continuar?"
      );

      if (!confirmar) return;
    }
    if (ticket.Estado?.id_estado === "2") {
      setSelectedTicket(ticket);
      setShowCommentsFor(ticket.id_ticket);
    } else {
      setSelectedTicket(ticket);
      setShowCommentsFor(null);
    }

    setTicketDetailComment("");
  };

  // clic al boton aceptar
  const handleAccept = async (ticket: Ticket) => {
    const success = await aceptarTicket(ticket.id_ticket);

    if (!success) return;
    // setSelectedTicket(ticket);
    // setShowCommentsFor(ticket.id_ticket);
    reloadTickets();
  }

  const handleOpenModal = () => setShowCreateModal(true);
  const handleCloseModal = () => setShowCreateModal(false);

  const [estadoFiltro, setEstadoFiltro] = useState<string>("Todos");

  const ticketsFiltrados = estadoFiltro === "Todos"
    ? tickets
    : tickets.filter((ticket) => ticket.Estado?.nombree === estadoFiltro);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-1 overflow-hidden mb-5">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} onCreateTicket={handleOpenModal} />

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
              onClick={() => setEstadoFiltro("En atencion")}
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
            <TicketGrid
              tickets={ticketsFiltrados}
              onSelect={handleSelect}
              onAccept={handleAccept}
            // onSelect={setSelectedTicket}
            // onAccept={(ticket) => {
            //   setSelectedTicket(ticket);
            // }}
            />
          )}
        </main>

        <aside className="w-1/4 p-6 border-l border-gray-700 overflow-y-auto mb-5">
          {selectedTicket && (
            <TicketDetail
              ticket={selectedTicket}
              showCommentsFor={showCommentsFor}
              comentario={ticketDetailComment}
              setComentario={setTicketDetailComment}
            />
          )}

        </aside>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-120">
            <h2 className="text-xl font-bold text-white">
              Crear Ticket
            </h2>
            <button
              className="text-white mb-4"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
            <TicketForm onTicketCreado={() => {
              handleCloseModal();
            }} />
          </div>
        </div>
      )}
    </div>
  );
}