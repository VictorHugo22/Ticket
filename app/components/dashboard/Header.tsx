'use client';
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function Header({ sidebarOpen, toggleSidebar }: Props) {
    const [nombre, setNombre] = useState<string>("");
    const [rol, setRol] = useState<string>("");

    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("rolUsuario");

        router.push("/");
    };

    useEffect(() => {
        const storedNombre = localStorage.getItem("nombreUsuario");
        const storedRol = localStorage.getItem("rolUsuario");
        if (storedNombre) setNombre(storedNombre);
        if (storedRol) setRol(storedRol);
    }, []);

    // console.log("ESTADO DE LA HAMBURGUESA......", toggleSidebar, sidebarOpen);
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
                <span className="text-white font-bold">Bienvenido !</span> {nombre} - {rol}
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
                            <p className="text-sm font-semibold text-white">{nombre}</p>
                            <p className="text-xs text-gray-400">{rol}</p>
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
            </div>
        </header>
    );
}