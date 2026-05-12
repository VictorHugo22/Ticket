'use client';
import { useState } from "react";

type Props = {
    onLogin: (usuario: string, password: string) => void;
    error?: string | null;
};

export default function LoginForm({ onLogin, error }: Props) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="mt-12 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
                Iniciar sesión
            </h2>

            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    onLogin(usuario, password);
                }}
            >
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
                <button
                    type="submit"
                    className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                >
                    Iniciar sesión
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <a href="/reset-password">Recuperar contraseña</a>
                
            </form>
        </div>
    );
}