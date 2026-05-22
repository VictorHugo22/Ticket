'use client';

import { useTicketForm } from "@/app/hook/dashboard/useTicketForm";
import { useCreateTicket } from "@/app/hook/dashboard/useCreateTicket";
import { useSeguimiento } from "@/app/hook/dashboard/useSeguimiento"
import { useForm } from "react-hook-form";

type Props = {
    onTicketCreado?: () => void;
};

type TicketFormData = {
    formIdProyecto: string;
    formIdPrioridad: string;
    formSucursal: string;
    formDepartamento: string;
    formComentarioProblema: string;
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
        formState: { errors }
    } = useForm<TicketFormData>();

    const {
        agregarComentario,
        loading: loading,
        error: error,
    } = useSeguimiento();

    const onSubmit = async (formData: TicketFormData) => {
        console.log("Datos capturados por React Hook Form:===========", formData);
        const idUsuarioString = localStorage.getItem("idUsuario");

        if (!idUsuarioString) {
            console.error("No hay usuario logueado en localStorage");
            return;
        }

        const idUsuario = Number(idUsuarioString);

        const ticketPayload = { // ----> construccion del objeto datosTicket
            id_proyecto: Number(formData.formIdProyecto),
            sucursal: formData.formSucursal,
            departamento: formData.formDepartamento,
            //problem: problem,
            id_usuario: idUsuario,
            id_prioridad: Number(formData.formIdPrioridad),
            //comentarioProblem: formData.comentarioProblema
        }; // <-------

        console.log("Datos enviados desde TicketForm:", ticketPayload);

        const ticketCreado = await createTicket(ticketPayload);  // fetch al API useCreateTicket

        if (!ticketCreado) {
            console.error("No se pudo crear el ticket");
            return;

            // //Limpiar datos
            // reset();
            // if (onTicketCreado) {
            //     onTicketCreado();
        }

        //console.log("Esto contiene tikcet creado.............Ticketform", ticketCreado);

        const seguimientoPayload = {
            id_ticket: ticketCreado.id_ticket,
            id_usuario: idUsuario,
            comentario: formData.formComentarioProblema,
        };

        const comentarioGuardado = await agregarComentario(
            seguimientoPayload.id_ticket,
            seguimientoPayload.id_usuario,
            seguimientoPayload.comentario
        );

        if (!comentarioGuardado) {
            console.error("El ticket se creo pero el comentario no se guardo correctamente.");
            return;
        }

        reset();

        if (onTicketCreado) {
            onTicketCreado();
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
                    {...register("formIdProyecto", {
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

                {errors.formIdProyecto && (
                    <p className="text-red-500 text-sm">
                        {errors.formIdProyecto.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">

                Prioridad
                <select
                    {...register("formIdPrioridad", {
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
                {errors.formIdPrioridad && (
                    <p className="text-red-500 text-sm">
                        {errors.formIdPrioridad.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Sucursal
                <input
                    {...register("formSucursal", {
                        required: "La sucursal es obligatoria"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe la sucursal"
                />
                {errors.formSucursal && (
                    <p className="text-red-500 text-sm">
                        {errors.formSucursal.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Departamento
                <input
                    {...register("formDepartamento", {
                        required: "El departamento es obligatorio"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Escribe el departamento"
                />
                {errors.formDepartamento && (
                    <p className="text-red-500 text-sm">
                        {errors.formDepartamento?.message}
                    </p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                Reporte del problema
                <textarea
                    {...register("formComentarioProblema", {
                        required: "La descripcion del problema es obligatorio"
                    })}
                    className="p-2 rounded border bg-gray-700 text-white border-gray-600"
                    placeholder="Descripción del problema..."
                />
                {errors.formComentarioProblema && (
                    <p className="text-red-500 text-sm">
                        {errors.formComentarioProblema?.message}
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