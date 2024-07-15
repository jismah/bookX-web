import { Button, Divider, TextInput } from "@tremor/react";
import { NextPage } from "next";
import { JSX, SVGProps, useEffect, useState } from "react";
import { useIsOnline } from 'react-use-is-online';
import Image from 'next/image';
import { useToast } from "@chakra-ui/react";
import router from "next/router";


const GoogleIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
    </svg>
);


const Login: NextPage = () => {

    const { isOnline, isOffline, error } = useIsOnline();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSignIn = async () => {
        setLoading(true);
        router.push('/app/dashboard');
        setLoading(false);
    }

    useEffect(() => {

    }, []);

    if (isOffline) return (
        <div className='full-screen-div italic text-gray-600'>
            <h4>No Hay Conexión a Internet...</h4>
        </div>
    )

    return (
        <>
            <div className="full-screen-div flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">


                    <form className="mt-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="email"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Email
                            </label>
                            <TextInput
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder="example@email.com"
                                className="mt-2 py-1"
                            />
                        </div>

                        <div className="mt-3 col-span-full">
                            <label
                                htmlFor="email"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Contraseña
                            </label>
                            <TextInput
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="password"
                                placeholder="*********"
                                className="mt-2 py-1"
                            />
                        </div>


                    </form>
                    <Button
                        type="submit"
                        className="mt-4 w-full border-bg-gray-800 bg-gray-800 py-2 text-center text-tremor-default font-medium shadow-tremor-input hover:bg-gray-700 hover:border-bg-gray-700"
                        loading={loading}
                        loadingText={'Ingresando...'}
                        onClick={handleSignIn}
                    >
                        Iniciar Sesión
                    </Button>
                    <p className="mt-4 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                        Al iniciar sesión, aceptas nuestros{' '}
                        <a href="#" className="underline underline-offset-4">
                            términos de servicio
                        </a>{' '}
                        y{' '}
                        <a href="#" className="underline underline-offset-4">
                            política de privacidad
                        </a>
                        .
                    </p>
                </div>
            </div>
        </>

    )
}

export default Login;