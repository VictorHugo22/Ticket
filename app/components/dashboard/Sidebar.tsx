'use client';
import { useAuth } from "@/app/context/AuthContext";
import { puedeCrearTicket } from "@/app/utils/permisos";


type Props = {
    onCreateTicket: () => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function Sidebar({ onCreateTicket, sidebarOpen, toggleSidebar }: Props) {
    const { user } = useAuth();
    
    return (
        <aside className={`bg-gray-800 text-white w-60 p-4 transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              fixed md:relative h-full`}
        >
            <div className="mb-6">
                <img src="/images/logo.png" alt="Logo" className="w-22 h-22 mx-auto pt-3" />
            </div>

            {puedeCrearTicket(user?.rol ?? null) && (
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