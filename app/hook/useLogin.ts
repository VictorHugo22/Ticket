'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {reloadUser} = useAuth();

    const login = async (usuario: string, password: string) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                return;
            } else {
                await reloadUser();
                router.push("/welcome");
            }

            setError(null);
        } catch (err) {
            setError("Ocurrió un error en el login");
            console.error(err);
        }
    };

    return { login, error };
}