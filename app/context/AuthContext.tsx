'use client';

import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = {
    id_usuario: number;
    nombre: string;
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
            const res = await fetch("/api/auth");
            const data = await res.json();


            if (data.success) {
                
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
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