import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Orders.css'

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
      const response = await axios.get(
        'https://bubble-tea-cafe-api-production.up.railway.app/api/order'
      );
      const orders_data = response.data;
      setOrders(orders_data.data);
    };
  
    useEffect(() => {
     fetchOrders();
    }, []);
    return (
        <div>
            <h1>Orders</h1>
            <div className='OrdersTable'>
                {orders.map((order) => (
                    <td>
                        <tr>{order}</tr>
                    </td>
                ))}
            </div>
        </div>
    )
}