import { NextPage } from "next";
import PrivateRoute from "../../../../components/layouts/PrivateRoute";

const CheckoutPage: NextPage = () => {
    return (
        <PrivateRoute allowedRoles={['admin', 'cliente']}>
            <h1>Checkout Page</h1>
        </PrivateRoute>
    )
}

export default CheckoutPage;