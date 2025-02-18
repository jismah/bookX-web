import { useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { CarritoItem, Libro } from "../../../../components/helpers/interfaces";
import { carrito, isAdmin } from "../../../../components/helpers/fakeData";
import Link from "next/link";
import { Button, Card, Dialog, DialogPanel, MultiSelect, MultiSelectItem, NumberInput, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { actualizarCarritoLength, formatCurrency } from "../../../../components/helpers/funtions";
import { fetcherSWR } from "../../../../components/helpers/fetcherSWR";
import useSWR from "swr";
import PrivateRoute from "../../../../components/layouts/PrivateRoute";

const TiendaIndex: NextPage = () => {

    const [selectedId, setSelectedId] = useState(0);

    const router = useRouter();
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const loadingbooks = false;

    const changeSelectedId = (id: number) => {
        setIsOpen(true);
        setSelectedId(id);
    };

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleQuantityChange = (id: number, value: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: value
        }));
    };


    const isBookSelected = (book: Libro) =>
        selectedBooks.includes(book.titulo) || selectedBooks.length === 0;

    const { data: libros, error: errorLibros, isLoading: loadingLibros, mutate: mutateLibros } = useSWR<Libro[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/catalogo/catalogo/books`, fetcherSWR);

    const isLoading = loadingbooks;

    /* AGREGAR LIBRO AL CARRITO */

    const handleAddToShop = (libroId: number, cantidad: number) => {
        const libro = libros?.find(l => l.id === libroId);
        if (!libro) {
            console.log("Libro no encontrado");
            toast({
                title: "Libro no encontrado!",
                status: "error",
                position: "bottom",
                duration: 3000,
            });
            return;
        }

        const itemCarrito = carrito.find(item => item.libro.id === libroId);
        if (itemCarrito) {
            itemCarrito.cantidad += cantidad;
            toast({
                title: "Libro ya está en el Carrito!",
                description: "Se ha agregado esta cantidad a la total",
                status: "info",
                position: "bottom",
                duration: 4000,
            });
        } else {
            carrito.push({
                id: carrito.length + 1,
                libro: libro,
                cantidad: cantidad
            });

            toast({
                title: "Libro Agregado!",
                status: "success",
                position: "bottom",
                duration: 3000,
            });
        }
    };

    // PAGINACION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks =
        libros?.slice(indexOfFirstItem, indexOfLastItem) || [];

    var totalPages = 0;

    if (selectedBooks.length === 0) {
        totalPages = Math.ceil((libros?.length ?? 0) / itemsPerPage);
    } else {
        totalPages = Math.ceil((selectedBooks?.length ?? 0) / itemsPerPage);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const AddToCarrito = (book: Libro, cantidad: number) => {
        handleAddToShop(book.id, cantidad);
    };

    if (isLoading)
        return (
            <div className="full-screen-div">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin fill-gray-800"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    return (
        <PrivateRoute allowedRoles={['admin', 'cliente']}>
            <div className="px-4 py-3">
                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                    <div>
                        <h1 className="text-2xl font-bold text-tremor-content-strong">
                            Libros Disponibles
                        </h1>
                        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            Listado general de todos los libros registrados.
                        </p>
                    </div>
                </div>
                <div>
                    <MultiSelect
                        placeholder="Buscar..."
                        className="mt-4 w-full"
                        onValueChange={setSelectedBooks}
                    >
                        {libros?.map((book: Libro) => (
                            <MultiSelectItem key={book.id} value={book.titulo}>
                                {book.titulo}
                            </MultiSelectItem>
                        ))}
                    </MultiSelect>
                </div>
                <Card className="mt-8 p-1">
                    <Table>
                        <TableHead>
                            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    ID
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Titulo
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Genero
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Autor
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Precio
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Cantidad
                                </TableHeaderCell>
                                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Acciones
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentBooks?.length > 0 ? (
                                currentBooks
                                    ?.filter((book: Libro) => isBookSelected(book))
                                    .map((book: Libro) => (
                                        <TableRow key={book.id}>
                                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                #{book.id}
                                            </TableCell>
                                            <TableCell>{book.titulo}</TableCell>
                                            <TableCell>{book.genero}</TableCell>
                                            <TableCell>{book.autor}</TableCell>
                                            <TableCell className="font-medium text-tremor-content-strong">
                                                {formatCurrency(book.precio)}
                                            </TableCell>
                                            <TableCell>
                                                <NumberInput
                                                    value={quantities[book.id] || 0}
                                                    onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value))}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/app/tienda/${book.id}`}>
                                                    <Button
                                                        icon={EyeIcon}
                                                        className="me-2"
                                                    >
                                                        Ver Libro
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="secondary"
                                                    icon={ShoppingCartIcon}
                                                    onClick={() => AddToCarrito(book, quantities[book.id] || 0)}
                                                >
                                                    Agregar al Carrito
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-tremor-content-muted dark:text-dark-tremor-content-muted"
                                    >
                                        No hay Libros Registrados
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex justify-between items-center mt-6 mb-2 px-3">
                        <p className="text-tremor-default tabular-nums text-tremor-content mx-2">
                            Página{" "}
                            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {`${currentPage}`}
                            </span>{" "}
                            de
                            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {" "}
                                {totalPages}
                            </span>
                        </p>

                        <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring">
                            <button
                                className="py-2 px-3"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Previous</span>
                                <ArrowLeftIcon
                                    className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                                    aria-hidden={true}
                                />
                            </button>
                            <span
                                className="h-5 border-r border-tremor-border dark:border-dark-tremor-border"
                                aria-hidden={true}
                            />
                            <button
                                className="py-2 px-3"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">Next</span>
                                <ArrowRightIcon
                                    className="h-5 w-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong"
                                    aria-hidden={true}
                                />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </PrivateRoute>
    )
}

export default TiendaIndex;