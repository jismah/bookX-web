// pages/admin.tsx
import Image from 'next/image'
import PrivateRoute from "../../../../components/layouts/PrivateRoute";
import { TabGroup, TabList, Tab, TextInput, Divider, TabPanels, TabPanel, Card, MultiSelect, MultiSelectItem, Table, Button, NumberInput, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Badge } from '@tremor/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Link, useToast } from '@chakra-ui/react';
import { Libro, LibroComprado, User } from '../../../../components/helpers/interfaces';
import { fetcherSWR } from '../../../../components/helpers/fetcherSWR';
import useSWR from 'swr';
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { calcularTotalLibrosVendidos, calcularTotalVendido, formatCurrency } from '../../../../components/helpers/funtions';
import { librosComprados } from '../../../../components/helpers/fakeData';
import { format } from 'date-fns';


const AdminPage = () => {

  const [selectedId, setSelectedId] = useState(0);

  const router = useRouter();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedVenta, setSelectedVenta] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const loadingbooks = false;


  const isVentaSelected = (venta: LibroComprado) =>
    selectedVenta.includes(venta.libro.titulo) || selectedVenta.length === 0;

  const isBookSelected = (book: Libro) =>
    selectedBooks.includes(book.titulo) || selectedBooks.length === 0;

  const isUserSelected = (user: User) =>
    selectedUser.includes(user.nombre) || selectedUser.length === 0;

  const { data: libros, error: errorLibros, isLoading: loadingLibros, mutate: mutateLibros } = useSWR<Libro[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/catalogo/books`, fetcherSWR);
  const { data: users, error: errorUsuarios, isLoading: loadingUsuarios } = useSWR<[User]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/read`, fetcherSWR);
  const historialVentas = librosComprados;

  const isLoading = loadingbooks;

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


  return (
    <PrivateRoute allowedRoles={['admin']}>
      <div className="px-6 py-4">

        <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Admin Panel
        </h3>
        <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          En este espacio, podras administrar los libros, ver todas las compras y gestionar usuarios.
        </p>
        <TabGroup className="mt-6">
          <TabList>
            <Tab>Gestion de Libros</Tab>
            <Tab>Historial de Ventas</Tab>
            <Tab>Gestion de Usuarios</Tab>
          </TabList>
          <TabPanels>

            {/* PANEL - GESTION LIBROS */}
            <TabPanel>
              <div className="py-3">
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
            </TabPanel>


            {/* PANEL - HISTORIAL VENTAS */}
            <TabPanel>
              <div className="py-3">
                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                  <div>
                    <h1 className="text-2xl font-bold text-tremor-content-strong">
                      Ventas Registradas
                    </h1>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                      Listado general de todas las ventas registradas.
                    </p>
                  </div>
                </div>
                <div>
                  <MultiSelect
                    placeholder="Buscar..."
                    className="mt-4 w-full"
                    onValueChange={setSelectedVenta}
                  >
                    {historialVentas?.map((venta: LibroComprado) => (
                      <MultiSelectItem key={venta.id} value={venta.libro.titulo}>
                        {venta.libro.titulo}
                      </MultiSelectItem>
                    ))}
                  </MultiSelect>
                </div>
                <div className='mt-4'>
                  <div className="md:grid md:grid-cols-3 md:gap-8 pt-4 sm:grid sm:grid-cols-2 sm:gap-4">
                    <Card className="mx-auto">
                      <p className="text-tremor-default text-tremor-content">Ventas Realizadas</p>
                      <p className="text-3xl text-tremor-content-strong font-semibold">{librosComprados?.length}</p>
                    </Card>
                    <Card className="mx-auto">
                      <p className="text-tremor-default text-tremor-content">Total Vendido</p>
                      <p className="text-3xl text-tremor-content-strong font-semibold">{calcularTotalVendido(historialVentas)}</p>
                    </Card>
                    <Card className="mx-auto">
                      <p className="text-tremor-default text-tremor-content">Total de Libros Vendidos</p>
                      <p className="text-3xl text-tremor-content-strong font-semibold">{calcularTotalLibrosVendidos(historialVentas)}</p>
                    </Card>
                  </div>
                </div>
                <Card className="mt-8 p-1">
                  <Table>
                    <TableHead>
                      <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          ID
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          ID Cliente
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          Libro
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          Fecha
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          Total
                        </TableHeaderCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historialVentas?.length > 0 ? (
                        historialVentas
                          ?.filter((venta: LibroComprado) => isVentaSelected(venta))
                          .map((venta: LibroComprado) => (
                            <TableRow key={venta.id}>
                              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                #{venta.id}
                              </TableCell>
                              <TableCell>{venta.idComprador}</TableCell>
                              <TableCell>{venta.libro.titulo}</TableCell>
                              <TableCell>{format(venta.fechaCompra, "dd-MM-yyyy")}</TableCell>
                              <TableCell className="font-medium text-tremor-content-strong">
                                {formatCurrency((venta.cantidad) * (venta.libro.precio))}
                              </TableCell>

                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center text-tremor-content-muted dark:text-dark-tremor-content-muted"
                          >
                            No hay Ventas Registradas
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>

              </div>
            </TabPanel>

            {/* PANEL - GESTION USUARIOS */}
            <TabPanel>
              <div className="py-3">
                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                  <div>
                    <h1 className="text-2xl font-bold text-tremor-content-strong">
                      Usuarios Registrados
                    </h1>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                      Listado general de los usuarios registrados.
                    </p>
                  </div>
                </div>
                <div>
                  <MultiSelect
                    placeholder="Buscar..."
                    className="mt-4 w-full"
                    onValueChange={setSelectedUser}
                  >
                    {users?.map((user: User) => (
                      <MultiSelectItem key={user.id} value={user.nombre}>
                        {user.nombre} {user.apellido}
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
                          Nombre Completo
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          Email
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          Rol
                        </TableHeaderCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users?.length > 0 ? (
                        users
                          ?.filter((user: User) => isUserSelected(user))
                          .map((user: User) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                #{user.id}
                              </TableCell>
                              <TableCell>{user.nombre} {user.apellido}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge>{user.role}</Badge>
                              </TableCell>

                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-tremor-content-muted dark:text-dark-tremor-content-muted"
                          >
                            No hay Usuarios Registrados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>

              </div>
            </TabPanel>
          </TabPanels>

        </TabGroup>


      </div>

    </PrivateRoute>
  );
};

export default AdminPage;
