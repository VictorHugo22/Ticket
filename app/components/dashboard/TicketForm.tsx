'use client';

import { useTicketForm } from "@/app/hook/dashboard/useTicketForm";
import { useCreateTicket } from "@/app/hook/dashboard/useCreateTicket";
import { useForm } from "react-hook-form";

type Props = {
    onTicketCreado?: () => void;
};

type TikcetFormData = {
    id_proyectos: string;
    id_prioridad: string;
    sucursal: string;
    departamento: string;
    comentario: string;
}

export default function TicketForm({ onTicketCreado }: Props) {
    const { 
        ticketProyectos,
        loadingProyectos, 
        errorProyectos, 
        ticketPrioridad, 
        loadingPrioridad, 
        errorPrioridad 
    } = useTicketForm();

    const { 
        createTicket, 
        loadingTicket, 
        errorTicket, 
        successTicket 
    } = useCreateTicket();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<TikcetFormData>();

    const onSubmit = async (formData: TikcetFormData) => {
        const idUsuarioString = localStorage.getItem("idUsuario");

        if (!idUsuarioString) {
            console.error("No hay usuario logueado en localStorage");
            return;
        }

        const idUsuario = Number(idUsuarioString);

        const datosTicket = { // ----> construccion del objeto datosTicket
            id_proyecto: Number(formData.id_proyectos),
            sucursal: formData.sucursal,
            departamento: formData.departamento,
            //problem: problem,
            id_usuario: idUsuario,
            id_prioridad: Number(formData.id_prioridad),
            comentario: formData.comentario
        }; // <-------

        console.log("Datos enviados desde TicketForm:", datosTicket);

        const ticketCreado = await createTicket(datosTicket);  // fetch al API useCreateTicket

        if (ticketCreado) {
            console.log("Ticket creado correctamente:", ticketCreado);

            //Limpiar datos
            reset();
            if (onTicketCreado){
                onTicketCreado();
            }
        }
    };

    if (loadingProyectos) {
        return <p className="text-gray-300">Cargando Datos...</p>;
    }
    if (errorProyectos) {
        return <p className="text-red-500">{errorProyectos}</p>;
    }
    if (errorPrioridad) {
        return <p className="text-red-500">{errorPrioridad}</p>;
    }

    console.log("Proyectos recibidos: (tikcetForm)", ticketProyectos);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <label className="flex flex-col gap-1">

                Proyecto
                <select
                    {...register("id_proyectos", {
                        required: "Selecciona un proyecto"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                >
                    <option value="">Selecciona un proyecto</option>

                    {ticketProyectos.map((proyecto) => (
                        <option
                            key={proyecto.id_proyecto}
                            value={proyecto.id_proyecto}
                        >
                            {proyecto.nombre}
                        </option>
                    ))}
                </select>

                {errors.id_proyectos && (
                    <p className="text-red-500 text-sm">
                        {errors.id_proyectos.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">

                Prioridad
                <select
                    {...register("id_prioridad", {
                        required: "Selecciona una prioridad"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                >
                    <option value="">Selecciona una prioridad</option>

                    {ticketPrioridad.map((prioridad) => (
                        <option
                            key={prioridad.id_prioridad}
                            value={prioridad.id_prioridad}
                        >
                            {prioridad.nombrep}
                        </option>

                    ))}
                </select>
                {errors.id_prioridad && (
                    <p className="text-red-500 text-sm">
                        {errors.id_prioridad.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Sucursal
                <input
                    {...register("sucursal", {
                        required: "La sucursal es obligatoria"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe la sucursal"
                />
                {errors.sucursal && (
                    <p className="text-red-500 text-sm">
                        {errors.sucursal.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Departamento
                <input
                    {...register("departamento", {
                        required: "El departamento es obligatorio"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe el departamento"
                />
                {errors.departamento && (
                    <p className="text-red-500 text-sm">
                        {errors.sucursal?.message}
                    </p> 
                )}
            </label>

            <label className="flex flex-col gap-1">
                Reporte del problema
                <textarea
                    {...register("comentario", {
                        required: "La descripcion del problema es obligatorio"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Descripción del problema..."
                />
                {errors.comentario && (
                    <p className="text-red-500 text-sm">
                        {errors.sucursal?.message}
                    </p>
                )}
            </label>

            <button
                type="submit"
                disabled={loadingTicket}
                className="bg-green-700 hover:bg-green-600 text-white p-2 rounded font-semibold"
            >
                {loadingTicket ? "Guardando..." : "Guardar ticket"}
            </button>

            {errorTicket && (
                <p className="text-red-500">{errorTicket}</p>
            )}
            {successTicket && (
                <p className="text-green-500">{successTicket}</p>
            )}
        </form>
    );
}