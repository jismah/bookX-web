import { useState } from "react";
import { CarritoItem, Comentario, Libro, LibroComprado } from "./interfaces";

export const isAdmin = true;

export const libros: Libro[] = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        genero: "Novela",
        autor: "Gabriel García Márquez",
        precio: 19.99
    },
    {
        id: 2,
        titulo: "Don Quijote de la Mancha",
        genero: "Clásico",
        autor: "Miguel de Cervantes",
        precio: 15.50
    },
    {
        id: 3,
        titulo: "La sombra del viento",
        genero: "Ficción",
        autor: "Carlos Ruiz Zafón",
        precio: 12.75
    },
    {
        id: 4,
        titulo: "Ficciones",
        genero: "Cuento",
        autor: "Jorge Luis Borges",
        precio: 10.99
    },
    {
        id: 5,
        titulo: "El amor en los tiempos del cólera",
        genero: "Romance",
        autor: "Gabriel García Márquez",
        precio: 14.20
    },
    {
        id: 6,
        titulo: "La casa de los espíritus",
        genero: "Novela",
        autor: "Isabel Allende",
        precio: 18.00
    },
    {
        id: 7,
        titulo: "Pedro Páramo",
        genero: "Realismo mágico",
        autor: "Juan Rulfo",
        precio: 9.99
    }
];

export const carrito: CarritoItem[] = [
];

export const librosComprados: LibroComprado[] = [
];

export const comentarios: Comentario[] = [
    {
        user: "Carlos López",
        message: "La trama es un poco lenta al principio, pero luego se pone muy interesante.",
        dateSended: new Date('2023-03-05')
    },
]

// Función para calcular el total del carrito de compras
export function calcularTotalCarrito(carrito: CarritoItem[]): number {
    return carrito.reduce((total, item) => {
        return total + (item.libro.precio * item.cantidad);
    }, 0);
}