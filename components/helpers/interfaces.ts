export interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
    roles: string[];
}

export type Role = 'admin' | 'cliente' | 'guest';


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
    idComprador: number;
    libro: Libro;
    cantidad: number;
    fechaCompra: Date;
}

export interface Comentario {
    user: string;
    message: string;
    dateSended: Date;
}

export interface Authority {
    authority: string;
  }
  
  export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  }