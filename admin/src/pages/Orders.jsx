import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {        
      const response = await axios.post(
        `${backendUrl}/api/order/list`, 
        {}, 
        { headers: { token } }
      );

      if (response.data.success) {
        if (response.data.orders.length === 0) {
          toast.info('No orders found.');
        }
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-sm text-gray-700"
              key={index}
            >
              <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
              
              <div>
                <div>
                  {order.items.map((item, idx) => (
                    <p className="py-0.5" key={idx}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  ))}
                </div>

                <p className="mt-3 mb-2 font-medium">
                  {`${order.address.firstName} ${order.address.lastName}`}
                </p>

                <div>
                  <p>{order.address.street},</p>
                  <p>
                    {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                  </p>
                </div>
                
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>

              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status} 
                className="p-2 font-semibold"
              >
                <option value="Order placed">Order placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
