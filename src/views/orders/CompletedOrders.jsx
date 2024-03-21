import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Orders.css'

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [menus, setMenus] = useState([]);
    const [toppings, setToppings] = useState([]);
    const token = localStorage.getItem('token');

    const fetchOrders = async () => {
      const response = await axios.get(
        'https://bubble-tea-cafe-api-production.up.railway.app/api/order', {
            headers: {
                Authorization: token
            }
        }
      );
      const orders_data = response.data;
      setOrders(orders_data.data);
    };

    const fetchUsername = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/users', {
                headers: {
                    Authorization: token
                }
            }
        );
        const users_data = response.data;
        setUsers(users_data.data);
    }

    const fetchMenus = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/menu', {
                headers: {
                    Authorization: token
                }
            }
        );
        const menus_data = response.data;
        setMenus(menus_data.data);
    };

    const fetchToppings = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/topping', {
                headers: {
                    Authorization: token
                }
            }
        );
        const toppings_data = response.data;
        setToppings(toppings_data.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchUsername();
        fetchMenus();
        fetchToppings();
    }, []);

    return (
        <div>
            <h1>Completed Orders</h1>
            <div className='statusChangeBttn'>
                <a href='/orders'>New</a>
                <a href='/completed'>Completed</a>
            </div>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Menus</th>
                            <th>Toppings</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id='completeTable'>
                        {orders.map(order => {
                            if (order.status == 'completed') {
                                if (order.user_id == '') {
                                    return (
                                        <></>
                                    )
                                } else 
                                    return (
                                        <tr key={order.Id}>
                                            {users.map(user => {
                                                if (order.user_id == user.Id) {
                                                    return (
                                                        <td key={user.Id}>{user.username}</td>
                                                    )
                                                }
                                            })}
                                            {menus.map(menu => {
                                                if (order.menu_id == menu.Id) {
                                                    return (
                                                        <td key={menu.Id}>{menu.name}</td>
                                                    )
                                                }
                                            })}
                                            {toppings.map(topping => {
                                                if (order.topping == topping.Id) {
                                                    return (
                                                        <td key={topping.Id}></td>
                                                    )
                                                }
                                            })}
                                            <td>{order.quantity}</td>
                                            <td>{order.total}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    )
                                
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}