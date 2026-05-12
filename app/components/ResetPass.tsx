'use client';
import { useState } from "react";

type Props = {
    onReset: (usuario: string, password: string, password2: string) => void;
    error?: string | null;
    success?: string | null;
};

export default function ResetPasswordForm({ onReset, error, success }: Props) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    

    return (
        <div className="mt-12 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
                Recuperar Contraseña
            </h2>

            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    onReset(usuario, password, password2);
                }}


            >

                <input
                    type="text"
                    placeholder="Correo"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
                <input
                    type="text"
                    placeholder="Contraseña Nueva"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
                <input
                    type="text"
                    placeholder="Repetir contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
                <button
                    type="submit"
                    className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                >
                    Enviar
                </button>

                {/* Mensajes */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </form>
        </div>
    );
}