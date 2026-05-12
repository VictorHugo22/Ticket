'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useResetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const resetPassword = async (usuario: string, password: string, password2: string) => {
        
        if (password !== password2) {
            setError("Las contraseñas no coinciden");
            setSuccess(null);
            return;
        }

        try {
            
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                setSuccess(null);
                return;
            }

            setError(null);
            setSuccess("Contraseña actualizada correctamente");

            setTimeout(() => {
                router.push("/");
            }, 3000);

            
        } catch (err) {
            setError("Error al actualizar la contraseña");
            setSuccess(null);
            console.error(err);
        }
    };

    return { resetPassword, error, success };
}