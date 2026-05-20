'use client';
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

type Props = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
};

export default function Header({sidebarOpen, toggleSidebar}: Props) {
    const [nombre, setNombre] = useState<string>("");
    const [rol, setRol] = useState<string>("");

    useEffect(() => {
        const storedNombre = localStorage.getItem("nombreUsuario");
        const storedRol = localStorage.getItem("rolUsuario");
        if (storedNombre) setNombre(storedNombre);
        if (storedRol) setRol(storedRol);
    }, []);

    console.log("ESTADO DE LA HAMBURGUESA......", toggleSidebar, sidebarOpen);
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
                <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </header>
    );
}