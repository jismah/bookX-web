import paypal from '@paypal/checkout-server-sdk';
import client from '../../../../components/layouts/PaypalIndex';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(404).json({ success: false, message: "Not Found" });
    }

    const { user_id, order_price } = req.body;

    if (!user_id || !order_price) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: "USD",
                value: order_price.toString(),
            }
        }],
    });

    try {
        const order = await PaypalClient.execute(request);
        res.status(200).json({ success: true, orderID: order.result.id });
    } catch (err) {
        console.error('Error creating PayPal order:', err);
        res.status(500).json({ success: false, message: "Error creating PayPal order" });
    }
}
