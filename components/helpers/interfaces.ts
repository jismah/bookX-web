export interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    roles: Role[];
}

export type Role = 'Admin' | 'Employee' | 'Client' | 'Guest';


/* INTERFACES DE LA APP */

export interface Libro {
    id: number;
    titulo: string;
    genero: string;
    autor: string;
    precio: number;
}

export interface CarritoItem {
    id: number;
    libro: Libro;
    cantidad: number;
}

export interface LibroComprado {
    id: number;
    libro: Libro;
    cantidad: number;
    fechaCompra: Date;
}

export interface Comentario {
    user: string;
    message: string;
    dateSended: Date;
}
