'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useTicketFormOptions() {
    const [sucursales, setSucursales] = useState<string[]>([]);
    const [departamentos, setDepartamentos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const { data: suc, error: errSuc } = await supabase
                    .from("sucursal")
                    .select("nombre"); 
                if (errSuc) throw errSuc;
                setSucursales(suc?.map((s: any) => s.nombre) || []);

                const { data: dep, error: errDep } = await supabase
                    .from("departamento")
                    .select("nombre"); 
                if (errDep) throw errDep;
                setDepartamentos(dep?.map((d: any) => d.nombre) || []);
            } catch (err) {
                setError("Error al cargar opciones");
            } finally {
                setLoading(false);
            }
        }

        fetchOptions();
    }, []);

    return { sucursales, departamentos, loading, error };
}