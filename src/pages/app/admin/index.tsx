// pages/admin.tsx

import PrivateRoute from "../../../../components/layouts/PrivateRoute";


const AdminPage = () => {
  return (
    <PrivateRoute allowedRoles={['admin']}>
      <h1>Admin Page</h1>
      <p>Contenido sensible solo para administradores.</p>
    </PrivateRoute>
  );
};

export default AdminPage;
