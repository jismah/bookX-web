import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { BellIcon } from '@heroicons/react/24/outline'
import { Badge, Card } from '@tremor/react'
import Image from 'next/image'
import Link from 'next/link'
import { useIsOnline } from "react-use-is-online";
import { useRouter } from 'next/router';
import { ShoppingBagIcon, SignalIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useToast } from '@chakra-ui/react'
import { carritoLength, useLoaded } from '../helpers/funtions'
import { NavigationItem, Role } from '../helpers/interfaces'
import { carrito } from '../helpers/fakeData'
import { useAuth } from '../../context/AuthContext'


const navigation: NavigationItem[] = [
    { name: 'Menú', href: '/app/dashboard', current: true, roles: ['admin', 'cliente', 'guest'] },
    { name: 'Tienda', href: '/app/tienda', current: false, roles: ['admin', 'cliente', 'guest'] },
    { name: 'Mis Libros', href: '/app/my-books', current: false, roles: ['admin', 'cliente'] },

    { name: 'Admin Panel', href: '/app/admin', current: false, roles: ['admin'] },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const filterMenuByRole = (role: string): NavigationItem[] => {
    return navigation.filter(item => item.roles.includes(role));
};

const Navbar: React.FC = () => {

    const router = useRouter();
    const { user, logout } = useAuth();

    const { isOnline, isOffline, error } = useIsOnline();
    const loaded = useLoaded();

    const toast = useToast();

    // CAMBIAR AL ROL DEL USUARIO LOGUEADO
    const filteredNavigation = filterMenuByRole(user?.role || "");

    const handleSignOut = async () => {
        try {
            logout();
            toast({
                title: 'Cerrando Sesion...',
                status: 'loading',
                position: 'bottom',
                duration: 2000,
            });
            router.push('/auth/login');
        } catch (error) {
            console.log(error);
            toast({
                title: 'Hubo un error!',
                status: 'error',
                position: 'top',
                duration: 4000,
            })
        }
    }

    return (
        <Disclosure as="nav" className="bg-white border-b border-grey shadow-sm">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-900">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center h-12">
                                    <Link href="/app/dashboard">
                                        <h5 className="antialiased text-xl font-semibold w-auto">
                                            BooksX
                                        </h5>
                                    </Link>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static  sm:inset-auto sm:ml-6 sm:pr-0">

                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Ver Notificaciones</span>

                                <Link href="/app/carrito">
                                    <div className='flex relative rounded-full px-2 '>
                                        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                        <Badge>{carrito.length}</Badge>
                                    </div>
                                </Link>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative pl-2">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-900">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >

                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-white py-1">
                                            <Card className='p-1'>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? '' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Configuración
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => handleSignOut()}
                                                            className={classNames(active ? '' : '', 'block px-4 py-2 text-sm text-red-700')}
                                                        >
                                                            Cerrar Sesión
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Card>
                                        </Menu.Items>

                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Transition
                        show={open}
                        enter="transition duration-300 ease-in-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-250 ease-in-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {filteredNavigation.map((item: NavigationItem) => (
                                    <Link href={item.href} key={item.name}>
                                        <Disclosure.Button
                                            as="div"
                                            className={router.pathname === item.href ? 'bg-gray-800 border border-bg-gray-800 text-white block rounded px-3 py-2 text-sm font-medium' : 'text-gray-700 block rounded px-3 py-2 text-sm font-medium border border-transparent hover:border-slate-200'}
                                            aria-current={router.pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                        <div className="my-1" />
                                    </Link>

                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>

    )
}

export default Navbar;