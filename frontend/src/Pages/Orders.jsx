import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, Currency } = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () =>{
    try {
      
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
          let allOrdersItem =[]
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allOrdersItem.push(item)
            })
          })
          setOrderData(allOrdersItem.reverse());
          
      }
      

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div 
            key={index} 
            className='py-4 border-t border-b text-gray-700 flex gap-6 items-center'
          >
            {/* Product Image */}
            <img className='w-24 sm:w-28' src={item.images[0]} alt={item.name} />

            {/* Product Details */}
            <div className='flex flex-col justify-between w-full'>
              
              {/* Name and Date */}
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <p className='text-gray-500 text-sm mt-1'>
                  Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='text-gray-500 text-sm mt-1'>
                  payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>

              {/* Price, Quantity, and Size */}
              <div className='flex items-center gap-4 text-gray-700 text-sm mt-2'>
                <p>{Currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
                <div className='md:w-1/2 flex justify-between ml-30'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p>{item.status}</p>
                    </div>
                    <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
