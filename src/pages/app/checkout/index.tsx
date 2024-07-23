import { NextPage } from "next";
import PrivateRoute from "../../../../components/layouts/PrivateRoute";
import { Button, Card, List, ListItem } from "@tremor/react";
import { calcularTotalCarrito, carrito } from "../../../../components/helpers/fakeData";
import { CarritoItem } from "../../../../components/helpers/interfaces";
import { formatCurrency, transferirCarritoALibrosComprados } from "../../../../components/helpers/funtions";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useAuth } from "../../../../context/AuthContext";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CheckoutPage: NextPage = () => {
    const { user } = useAuth();
    const toast = useToast();
    const router = useRouter();

    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createorder', {
                user_id: user?.id,
                order_price: calcularTotalCarrito(carrito) // Usa el total del carrito para el precio de la orden
            });

            if (response.data.success) {
                return response.data.orderID;
            } else {
                throw new Error('Error creating order');
            }
        } catch (err) {
            alert('Error Creando la orden');
            console.error(err);
            return null;
        }
    };

    const paypalCaptureOrder = async (orderID: string) => {
        toast({
            title: 'Procesando Pago',
            status: 'loading',
            position: 'bottom',
            duration: 2000,
        });
        try {
            let response = await axios.post('/api/paypal/captureorder', {
                orderID
            });

            if (response.data.success) {
                toast({
                    title: 'Se Realizó el Pago Correctamente!',
                    status: 'success',
                    position: 'bottom',
                    duration: 2000,
                });
                router.push('/app/my-books');
                transferirCarritoALibrosComprados(user?.id || 0);
                return response.data;
            } else {
                throw new Error('Error capturing order');
            }
        } catch (err) {
            alert('Some Error Occured Capturando la Orden');
            console.error(err);
        }
    };

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
                        carrito.map((book: CarritoItem) => (
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
                            
                            <PayPalScriptProvider
                                options={{
                                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                                    currency: 'USD',
                                    intent: 'capture'
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        color: 'gold',
                                        shape: 'rect',
                                        label: 'pay',
                                        height: 50
                                    }}
                                    createOrder={async (data, actions) => {
                                        let order_id = await paypalCreateOrder();
                                        return order_id || ''; // Asegúrate de retornar el order_id correcto
                                    }}
                                    onApprove={async (data, actions) => {
                                        if (data.orderID) {
                                            let response = await paypalCaptureOrder(data.orderID);
                                            console.log(response);
                                        } else {
                                            alert('No se recibió el ID de la orden.');
                                        }
                                    }}
                                    onError={(err) => {
                                        console.error('PayPal Checkout onError', err);
                                        alert('Error procesando el pago con PayPal');
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </Card>
                </div>
            </div>
        </PrivateRoute>
    );
}

export default CheckoutPage;
