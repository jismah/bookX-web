import { Button, Divider, TextInput } from "@tremor/react";
import { NextPage } from "next";
import { JSX, SVGProps, useEffect, useState } from "react";
import { useIsOnline } from 'react-use-is-online';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";


const Register: NextPage = () => {
    const { isOnline, isOffline, error } = useIsOnline();
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: name,
                    apellido: lastname,
                    email: email,
                    password: password,
                    role: "user"
                })
            });

            const json = await res.json();
            console.log(json);

            if (res.status === 200) {
                toast({
                    title: "Te haz registrado correctamente",
                    status: 'success',
                    position: 'bottom',
                    duration: 4000,
                });
                router.push('/auth/login');
            } else {
                toast({
                    title: 'Error de registro...',
                    description: json.message || res.statusText,
                    status: 'error',
                    position: 'bottom',
                    duration: 4000,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Hubo un error!',
                description: "Inténtalo más tarde...",
                status: 'error',
                position: 'bottom',
                duration: 4000,
            });
        }

        setLoading(false);
    }

    if (isOffline) return (
        <div className='full-screen-div italic text-gray-600'>
            <h4>No Hay Conexión a Internet...</h4>
        </div>
    )

    return (
        <>
            <div className="full-screen-div flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-16" alt="Flowbite Logo" />
                    </div>

                    <form className="mt-6" onSubmit={handleSignUp}>
                        <div className="mt-3 col-span-full">
                            <label
                                htmlFor="password"
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
                                placeholder="john@example.com"
                                className="mt-2 py-1"
                                required
                            />
                        </div>

                        <div className="mt-3 col-span-full">
                            <label
                                htmlFor="password"
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
                                autoComplete="current-password"
                                placeholder="*********"
                                className="mt-2 py-1"
                                required
                            />
                        </div>
                        <div className="mt-3 col-span-full">
                            <label
                                htmlFor="name"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Nombre
                            </label>
                            <TextInput
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre"
                                className="mt-2 py-1"
                                required
                            />
                        </div>
                        <div className="mt-3 col-span-full">
                            <label
                                htmlFor="lastname"
                                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                            >
                                Apellido
                            </label>
                            <TextInput
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}

                                placeholder="Nombre"
                                className="mt-2 py-1"
                                required
                            />
                        </div>



                        <Button
                            type="submit"
                            className="mt-4 w-full py-2 text-center text-tremor-default font-medium shadow-tremor-input"
                            loading={loading}
                            
                            loadingText={'Ingresando...'}
                        >
                            Registrarme
                        </Button>
                        <Link href={"/auth/login"}>
                            <Button
                                variant="light"
                                className="mt-4 w-full py-2"
                            >
                                Iniciar Sesión
                            </Button>
                        </Link>

                    </form>
                    <p className="mt-4 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                        Al registrarte, aceptas nuestros{' '}
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

export default Register;
