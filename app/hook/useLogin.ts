'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (usuario: string, password: string) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password }),
            });

            const data = await res.json();
            console.log("============= Respuesta del login API:", data);

            if (!data.success) {
                setError(data.message);
                return;
            } else {
                //if (userRole.user.TablaRol.nombrer === "Programador2") {
                localStorage.setItem("idUsuario", data.user.id_usuario.toString());
                localStorage.setItem("nombreUsuario", data.user.nombre);
                localStorage.setItem("rolUsuario", data.user.TablaRol?.nombrer || "");
                router.push("/welcome");
                //}
                //else router.push("/reset-password");
            }

            setError(null);

            //console.log(data);
            //if (userRole.TablaRol.nombrer === "Programador2") router.push("/welcome");
            //else router.push("/reset-password");

        } catch (err) {
            setError("Ocurrió un error en el login");
            console.error(err);
        }
    };

    return { login, error };
}