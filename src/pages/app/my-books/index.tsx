
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { NextPage } from "next";
import { ArrowRightCircleIcon, ArrowRightIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { calcularTotalCarrito, carrito, librosComprados } from "../../../../components/helpers/fakeData";
import { calcularMisLibros, formatCurrency } from "../../../../components/helpers/funtions";
import { CarritoItem, LibroComprado } from "../../../../components/helpers/interfaces";
import { format } from 'date-fns';

const MyBooks: NextPage = () => {

    const loadingProducts = false;
    const errorProducts = false;

    const [userLogged, setUserLogged] = useState("John");
    const isLoading = loadingProducts;


    if (isLoading) return (
        <div className='full-screen-div'>
            <div role="status">
                <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin fill-gray-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )


    return (
        <>
            <div className="px-4 py-3">
                <div>
                    <h1 className="text-2xl font-bold text-tremor-content-strong">Mis Libros</h1>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Estos son tus libros comprados, listos para leer y disfrutar.
                    </p>
                </div>
            </div>

            {/* KPI's */}
            <div className="md:grid md:grid-cols-2 md:gap-8 px-4 pt-4">
                <Card className="mx-auto" decoration="top" decorationColor="green">
                    <p className="text-tremor-default text-tremor-content">Libros</p>
                    <p className="text-3xl text-tremor-content-strong font-semibold">{librosComprados.length}</p>
                </Card>
                <Card className="mx-auto" decoration="top" decorationColor="green">
                    <p className="text-tremor-default text-tremor-content">Total en Compras</p>
                    <p className="text-3xl text-tremor-content-strong font-semibold">{formatCurrency(calcularMisLibros(librosComprados))}</p>
                </Card>
            </div>

            <div className="px-4">
                <Card className="mt-8 p-1">
                    <Table>
                        <TableHead>
                            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    No. de Compra
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Libro
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Cantidad
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Fecha
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Opciones
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {librosComprados?.length > 0 ? (
                                librosComprados
                                    .map((book: LibroComprado) => (
                                        <TableRow key={book.id}>
                                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                #{book.libro.id}
                                            </TableCell>
                                            <TableCell>{book.libro.titulo}</TableCell>
                                            <TableCell>{book.cantidad}</TableCell>
                                            <TableCell>{formatCurrency((book.libro.precio) * (book.cantidad))}</TableCell>
                                            <TableCell>{format(book.fechaCompra, "dd-MM-yyyy")}</TableCell>
                                            <TableCell>
                                                <Button
                                                    className="mx-3"
                                                    icon={EyeIcon}
                                                >
                                                    Ver Libro
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-tremor-content-muted dark:text-dark-tremor-content-muted"
                                    >
                                        No hay Libros Registrados
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </>
    )
}

export default MyBooks;