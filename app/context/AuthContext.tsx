'use client';

import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
    id_usuario: number;
    nombre: string;
    //id_rol?: number;
    rol: string;
};

type AuthContextType = {
    user: AuthUser | null;
    loadingAuth: boolean;
    reloadUser: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const reloadUser = async () => {
        try {
            // console.log("Ejecutando reloadUser...");
            const res = await fetch("/api/auth");
            const data = await res.json();

            // console.log("Respuesta de /api/auth/me:", data);

            if (data.success) {
                // console.log("Usuario recibido desde /api/auth/me:", data.user);
                setUser(data.user);
            } else {
                console.log("No hay sesión activa");
                setUser(null);
            }
        } catch (err) {
            // console.error("Error cargando usuario:", err);
            setUser(null);
        } finally {
            setLoadingAuth(false);
        }
    };

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        setUser(null);
    };

    useEffect(() => {
        reloadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loadingAuth, reloadUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }

    return context;
}