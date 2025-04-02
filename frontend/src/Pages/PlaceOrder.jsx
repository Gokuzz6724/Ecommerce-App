import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  
  const [method, setMethod] = useState('cod')
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, Delivery_fee, products,} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value =event.target.value

    setFormData(data => ({...data,[name]:value}))
  };

  const initpay = (order) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : order.amount,
        currency : order.currency,
        name : 'Order Payment',
        description : 'Order Payment',
        order_id : order.id,
        receipt : order.receipt,
        handler : async (response) =>{
              console.log(response);
               try {
                
                const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})

                if (data.success) {
                  navigate('/orders')
                  setCartItems({})
                }
               } catch (error) {
                console.log(error);
                toast.error(error)
                
               }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

    
      

      let orderData = { 
        address: formData,
        items: orderItems,
        amount: getCartAmount() + Delivery_fee
      };

      console.log('Order Data:', orderData);

      


      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers:{ token } });
          console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');  // ✅ Use navigate correctly
          } else {
            toast.error(response.data.message);
          }
          break;
        
          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: { token }});
            if (responseStripe.data.success) {
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            } else {
              toast.error(responseStripe.data.message)
            }
            break;
          
            case 'razorpay':
              const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers: {token}});
              if (responseRazorpay.data.success) {
                initpay(responseRazorpay.data.order);
                
              }

              break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while placing the order.');
    }
  };

  const { navigate } = useContext(ShopContext)

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t'>
      
      {/* left-side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>

        <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onchangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip code' />
          <input required onChange={onchangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>

        <input required onChange={onchangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* right-side */}
      <div className='mt-8'>
        <CartTotal />

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex gap-3 flex-col lg:flex-row'>
            
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-300' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-300' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-300' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-15 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
