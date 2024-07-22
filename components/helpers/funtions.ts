import { useEffect, useState } from "react";
import { carrito, libros, librosComprados } from "./fakeData";
import { CarritoItem, LibroComprado } from "./interfaces";

export function formatCurrency(amount: number | null): string {
    // Verifica si amount no es undefined antes de formatearlo
    if (amount !== undefined && amount !== null) {
        return amount.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
    } else {
        return '0.00 DOP';
    }
};

export function formatFrequency(frequency: string | null) {
    if (frequency !== undefined && frequency !== null) {
        if (frequency === "MONTHLY") {
            return "Mensual";
        } else if (frequency === "WEEKLY") {
            return "Semanal";
        } else if (frequency === "BIWEEKLY") {
            return "Quincenal";
        } else if (frequency === "UNIQUE") {
            return "Único";
        } else if (frequency === "YEARLY") {
            return "Anual";
        }
    } else {
        return 'NaN';
    }

}

export const useLoaded = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    return loaded;
};

export function agregarAlCarrito(libroId: number, cantidad: number): void {
    const libro = libros.find(l => l.id === libroId);
    if (!libro) {
        console.log("Libro no encontrado");
        return;
    }

    const itemCarrito = carrito.find(item => item.libro.id === libroId);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carrito.push({
            id: carrito.length + 1, // Generar un nuevo ID para el elemento del carrito
            libro: libro,
            cantidad: cantidad
        });
    }

    actualizarCarritoLength();
};

export let carritoLength = carrito.length;
export let rolUser = '';

// Función para actualizar la longitud del carrito
export function actualizarCarritoLength(): void {
    carritoLength = carrito.length;
}

// Función para calcular el total de libros comprados
export function calcularMisLibros(libros: LibroComprado[]): number {
    return librosComprados.reduce((total, item) => {
        return total + (item.libro.precio * item.cantidad);
    }, 0);
}

export const calcularTotalVendido = (librosComprados: LibroComprado[]): number => {
    let totalVendido = 0;
    librosComprados.forEach((compra) => {
        totalVendido += compra.libro.precio * compra.cantidad;
    });
    return totalVendido;
};

export const calcularTotalLibrosVendidos = (librosComprados: LibroComprado[]): number => {
    let totalLibrosVendidos = 0;
    librosComprados.forEach((compra) => {
        totalLibrosVendidos += compra.cantidad;
    });
    return totalLibrosVendidos;
};


const calcularTotalCarrito = (carrito: CarritoItem[]): number => {
    let totalCarrito = 0;
    carrito.forEach((item) => {
        totalCarrito += item.libro.precio * item.cantidad;
    });
    return totalCarrito;
};