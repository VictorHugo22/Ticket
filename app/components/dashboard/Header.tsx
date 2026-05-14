'use client';
import { useEffect, useState } from "react";

export default function Header() {
    const [nombre, setNombre] = useState<string>("");
    const [rol, setRol] = useState<string>("");

    useEffect(() => {
        const storedNombre = localStorage.getItem("nombreUsuario");
        const storedRol = localStorage.getItem("rolUsuario");
        if (storedNombre) setNombre(storedNombre);
        if (storedRol) setRol(storedRol);
    }, []);
    return (
        <header className="flex justify-between items-center bg-gray-800 shadow px-6 py-3 mb-5">
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-white font-bold">Bienvenido !</span> {nombre} - {rol}
                <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </header>
    );
}