import paypal from '@paypal/checkout-server-sdk';
import client from '../../../../components/layouts/PaypalIndex';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).json({ success: false, message: "Not Found" });
  }

  if (!req.body.orderID) {
    return res.status(400).json({ success: false, message: "Please Provide Order ID" });
  }

  try {
    const { orderID } = req.body;
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);

    // No necesitas pasar un cuerpo de solicitud para capturar una orden
    const response = await PaypalClient.execute(request);

    if (!response) {
      return res.status(500).json({ success: false, message: "Some Error Occured at backend" });
    }

    res.status(200).json({ success: true, data: response.result });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ success: false, message: "Error capturing PayPal order" });
  }
}
