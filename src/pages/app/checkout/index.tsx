import { NextPage } from "next";
import PrivateRoute from "../../../../components/layouts/PrivateRoute";
import { Button, Card, List, ListItem } from "@tremor/react";
import { calcularTotalCarrito, carrito } from "../../../../components/helpers/fakeData";
import { CarritoItem } from "../../../../components/helpers/interfaces";
import { formatCurrency } from "../../../../components/helpers/funtions";

const CheckoutPage: NextPage = () => {
    return (
        <PrivateRoute allowedRoles={['admin', 'cliente']}>
            <div className="px-4 py-3">
                <div>
                    <h1 className="text-2xl font-bold text-tremor-content-strong">Checkout</h1>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Comprueba los datos y procede con la compra de tus nuevos libros.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 px-4">
                <div className="col-span-2 ...">
                    {carrito?.length > 0 ? (
                        carrito
                            .map((book: CarritoItem) => (
                                <Card key={book.id} className="flex flex-col justify-between mb-4">
                                    <div className="mt-1 flex-1">
                                        <dt className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                            {book.libro.titulo}
                                        </dt>
                                        <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                            {book.libro.autor}
                                        </dd>
                                        <div className="grid grid-cols-3 divide-x mt-4">
                                            <div className="flex flex-col justify-center items-center">
                                                <dt className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Genero
                                                </dt>
                                                <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                                    {book.libro.genero}
                                                </dd>
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                                <dt className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Cantidad
                                                </dt>
                                                <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                                    {book.cantidad}
                                                </dd>
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                                <dt className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                    Precio Total
                                                </dt>
                                                <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                                                    {formatCurrency((book.libro.precio) * (book.cantidad))}
                                                </dd>
                                            </div>
                                        </div>

                                    </div>
                                </Card>
                            ))
                    ) : (
                        <Card>
                            No Tienes Libros...
                        </Card>
                    )}

                </div>
                <div className="">
                    <Card>
                        <h4 className="font-semibold">Resumen</h4>
                        <List>
                            <ListItem>
                                <span className="font-semibold">Subtotal:</span>
                                <span>{formatCurrency(calcularTotalCarrito(carrito))}</span>
                            </ListItem>
                            <ListItem>
                                <span className="font-semibold">Envio:</span>
                                <span>{formatCurrency(0)}</span>
                            </ListItem>
                            <ListItem>
                                <span className="font-semibold">Total:</span>
                                <span>{formatCurrency(calcularTotalCarrito(carrito))}</span>
                            </ListItem>
                        </List>
                    </Card>

                    <Card className="mt-4">
                        <h4 className="font-semibold">Metodo de Pago</h4>
                        <div className="flex flex-col mt-3">
                            <Button className="mb-3">
                                Pago Efectivo
                            </Button>
                            <Button>
                                PayPal
                            </Button>
                        </div>

                    </Card>
                </div>
            </div>
        </PrivateRoute>
    )
}

export default CheckoutPage;