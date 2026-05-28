'use client';
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

type Props = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function Header({ sidebarOpen, toggleSidebar }: Props) {
    const { user, loadingAuth, logout } = useAuth();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <header className="flex justify-between items-center bg-gray-800 shadow px-6 py-3 mb-5">
            <button
                className="p-2 text-white cursor-pointer"
                onClick={toggleSidebar}
            >
                <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
                {loadingAuth ? (
                    <span className="text-white">Cargando usuario...</span>
                ) : (
                    <>
                        <span className="text-white font-bold">Bienvenido !</span>
                        <span className="text-white">
                            {user?.nombre || "Usuario"} - {user?.rol || "Sin rol"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="cursor-pointer"
                        >
                            <img
                                src="/images/Avatar.png"
                                alt="Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 top-12 w-44 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                                <div className="px-4 py-3 border-b border-gray-700">
                                    <p className="text-sm font-semibold text-white">{user?.nombre}</p>
                                    <p className="text-xs text-gray-400">{user?.rol}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div >
        </header >
    );
}