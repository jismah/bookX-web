import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import { format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { Badge, Button, Card, Color, Divider, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Textarea } from "@tremor/react";
import { formatCurrency } from "../../../../../components/helpers/funtions";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { comentarios } from "../../../../../components/helpers/fakeData";
import { fetcherSWR } from "../../../../../components/helpers/fetcherSWR";
import { Libro } from "../../../../../components/helpers/interfaces";
import PrivateRoute from "../../../../../components/layouts/PrivateRoute";


const LibroDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: libroData, error: errorLibro, isLoading: loadingLibro, mutate: mutateLibro } = useSWR<Libro>(`${process.env.NEXT_PUBLIC_SERVER_URL}/catalogo/catalogo/books/${id}`, fetcherSWR);
    const isLoading = loadingLibro;


    if (isLoading) return (
        <div className='full-screen-div'>
            <div role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin fill-gray-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <PrivateRoute allowedRoles={['admin', 'cliente']}>
            <div className="px-4 py-3">
                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                    <div>
                        <h1 className="text-xl font-bold text-tremor-content-strong">Libro #{id}</h1>
                        <h1 className="text-4xl font-bold text-tremor-content-strong">{libroData?.titulo}</h1>
                        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            Vista de Detalles del Libro Seleccionado.
                        </p>
                    </div>
                    <div>
                        <Link href={'/app/tienda'} className="me-3">
                            <button
                                type="button"
                                className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-gray-800 px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-gray-600 sm:mt-0 sm:w-fit"
                            >
                                Volver
                            </button>
                        </Link>
                        <Link href={'/app/tienda'}>
                            <Button>
                                Agregar al Carrito
                            </Button>
                        </Link>
                    </div>

                </div>

                <div>
                    <div className="mt-3">
                        <dl className="divide-y divide-gray-100">
                            <div className="ox-2 py-4 sm:grid sm:grid-cols-3">
                                <dt className="text-md font-bold leading-6 text-gray-900">Genero</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{libroData?.genero}</dd>
                            </div>
                            <div className="ox-2 py-4 sm:grid sm:grid-cols-3">
                                <dt className="text-md font-bold leading-6 text-gray-900">Autor</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{libroData?.autor}</dd>
                            </div>
                            <div className="ox-2 py-4 sm:grid sm:grid-cols-3">
                                <dt className="text-md font-bold leading-6 text-gray-900">Precio</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formatCurrency(libroData?.precio || 0)}</dd>
                            </div>
                            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-xl font-bold leading-6 text-gray-900">Reseñas</dt>
                                <div className="w-full flex flex-col">
                                    <Textarea placeholder="Agregar comentario..." rows={3} className="w-full"></Textarea>
                                    <div className="mt-3">

                                        <Button>
                                            Enviar Mi Reseña
                                        </Button>
                                    </div>
                                    <div className="mt-8 grid grid-cols-1 gap-6">
                                        {comentarios.map((comentario) => (
                                            <Card key={comentario.user} className="group">
                                                <div className="flex items-center space-x-4">

                                                    <div className="truncate">
                                                        <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">

                                                            <span className="absolute inset-0" aria-hidden={true} />
                                                            {comentario.user}

                                                        </p>
                                                        <p className="text-wrap text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                            {comentario.message}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
                                                    aria-hidden={true}>
                                                    <span className="text-sm">
                                                        {format(comentario.dateSended, 'dd/MM/yyyy')}
                                                    </span>
                                                </span>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </dl>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    )
}

export default LibroDetails;