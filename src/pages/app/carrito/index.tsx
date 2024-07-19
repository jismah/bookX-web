
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { NextPage } from "next";
import { ArrowRightCircleIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { calcularTotalCarrito, carrito } from "../../../../components/helpers/fakeData";
import { formatCurrency } from "../../../../components/helpers/funtions";
import { CarritoItem } from "../../../../components/helpers/interfaces";




const MiCarrito: NextPage = () => {


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
                    <h1 className="text-2xl font-bold text-tremor-content-strong">Mi Carrito</h1>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Estos son tus libros guardados en el carrito, listo para comprar!
                    </p>
                </div>
            </div>

            {/* KPI's */}
            <div className="md:grid md:grid-cols-2 md:gap-8 px-4 pt-4">
                <Card className="mx-auto" decoration="top" decorationColor="blue">
                    <p className="text-tremor-default text-tremor-content">Libros para Comprar</p>
                    <p className="text-3xl text-tremor-content-strong font-semibold">{carrito.length}</p>
                </Card>
                <Card className="mx-auto" decoration="top" decorationColor="blue">
                    <p className="text-tremor-default text-tremor-content">Subtotal</p>
                    <p className="text-3xl text-tremor-content-strong font-semibold">{formatCurrency(calcularTotalCarrito(carrito))}</p>
                </Card>
            </div>

            <div className="px-4">
                <Card className="mt-8 p-1">
                    <Table>
                        <TableHead>
                            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    ID
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Libro
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Cantidad
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Subtotal
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Opciones
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carrito?.length > 0 ? (
                                carrito
                                    .map((book: CarritoItem) => (
                                        <TableRow key={book.id}>
                                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                #{book.libro.id}
                                            </TableCell>
                                            <TableCell>{book.libro.titulo}</TableCell>
                                            <TableCell>{book.cantidad}</TableCell>
                                            <TableCell>{formatCurrency((book.libro.precio) * (book.cantidad))}</TableCell>
                                            <TableCell>
                                                <Button
                                                    className="mx-3"
                                                    variant="light"
                                                    color="red"
                                                    icon={TrashIcon}
                                                ></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-tremor-content-muted dark:text-dark-tremor-content-muted"
                                    >
                                        No hay Libros en el Carrito
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>


            {/* BOTONES */}
            <div className="px-4 pt-8">

                <div className="flex justify-end items-center">
                    <Link href={'/app/dashboard'} className="mx-8">
                        <Button variant="light">
                            Cancelar
                        </Button>
                    </Link>
                    <Link href={'/app/tienda'} className="mx-8">
                        <Button variant="secondary">
                            Seguir Comprando
                        </Button>
                    </Link>
                    <Link href={'/app/checkout'}>
                        <Button icon={ArrowRightCircleIcon} iconPosition="right">
                            Ir al Checkout
                        </Button>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default MiCarrito;