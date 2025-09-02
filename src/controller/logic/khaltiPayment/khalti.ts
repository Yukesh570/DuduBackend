import axios from 'axios';

interface KhaltiInitResponse {
  pidx: string;
}

export async function initiateKhaltiPayment() {
  const secretKey = '43367c1637834550ac5bbf04b6b85bcf';

  const paymentData = {
return_url: 'https://example.com/payment-callback',
    website_url: 'https://your-website.com',
    amount: 10000,
    purchase_order_id: 'Order123',
    purchase_order_name: 'Test Product',
    customer_info: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '9800000000',
    },
  };

  try {
    const response = await axios.post<KhaltiInitResponse>(
      'https://dev.khalti.com/api/v2/epayment/initiate/',
      paymentData,
      {
        headers: {
          Authorization: `Key ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const pidx = response.data.pidx;
    console.log("======response",response)
    console.log('pidx:', pidx);
    return pidx;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      console.error('Error initiating Khalti payment:', (error as any).response?.data || (error as any).message || error);
    } else if (error instanceof Error) {
      console.error('Error initiating Khalti payment:', error.message);
    } else {
      console.error('Unknown error initiating Khalti payment:', error);
    }
    throw error;
  }
}
