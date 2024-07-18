export interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    roles: Role[];
}

export type Role = 'Admin' | 'Employee' | 'User' | 'Guest';


/* INTERFACES DE LA APP */

export interface Libro {
    titulo: string;
    genero: string;
    autor: string;
    precio: number;
}
