export const ROLES = {
    PROGRAMADOR_1: "Programador1",
    PROGRAMADOR_2: "Programador2",
    MESA_AYUDA_1: "Tecnico-L1",
    MESA_AYUDA_2: "Tecnico-L2",
};

export function puedeCrearTicket(rol: string | null) {
    return rol === ROLES.MESA_AYUDA_1 || rol === ROLES.MESA_AYUDA_2;
}

export function puedeAceptarTicket(rol: string | null) {
    return rol === ROLES.PROGRAMADOR_1 || rol === ROLES.PROGRAMADOR_2;
}

export function puedeComentarSolucion(rol: string | null) {
    return rol === ROLES.PROGRAMADOR_1 || rol === ROLES.PROGRAMADOR_2;
}