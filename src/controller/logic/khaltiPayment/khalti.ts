import axios from 'axios';
import { LoginDao } from '../../../dao/auth/loginDao';

interface KhaltiInitResponse {
  pidx: string;
}

export async function initiateKhaltiPayment(this: any, 
  userId: string,
  selectedItems: { id: string; quantity: number ,price: number}[],
  totalPrice: string
) {
  const loginDaoInstance = new LoginDao();

  const secretKey = '43367c1637834550ac5bbf04b6b85bcf';
  console.log("SWETAAAAAAAAAAAA",userId)
  console.log("SWETAAAAAAAAAAAAloveeeeeeee",selectedItems)
const productIdsString = selectedItems.map(item => item.id).join(',');
    console.log("userasdasdasdasd",)

  const user =await loginDaoInstance.repository.findOne({where:{id:Number(userId)}});
  console.log("user",user)
  const paymentData = {
    return_url: `${process.env.BACKEND_API_URL}/api/payment/getbykhalti/${userId}/${productIdsString}/${totalPrice}/`,
    website_url: 'https://your-website.com',
    amount: totalPrice,
    purchase_order_id: productIdsString,
    purchase_order_name: 'Product',
    customer_info: {
      name: user.username,
      email: user.email ?user.email :"test@gmail.coom" ,
      phone: user.phoneNumber ? user.phoneNumber : '1234567890',
    },
  };
  console.log("yyyyyyyyyy",paymentData)
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
