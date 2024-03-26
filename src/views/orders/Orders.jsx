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

    const fetchUsernames = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/users', {
                headers: {
                    Authorization: token
                }
            }
        );
        const users_data = response.data;
        setUsers(users_data.data);
    };

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

    function toppingnamegrab(order) {
        const toppingname = []
        order.topping.map(function(value) {
            toppings.map(topping => {
                if (value == topping.Id) {
                    toppingname.push(topping.name)
                }
            })
        })
        return <td className='toppingColumn'>{toppingname + ''}</td>
        // return <td className='toppingColumn'><ul className='toppinglist'>{toppingname}</ul></td>
        // return <button onClick={() => console.log(toppingname)}>console</button>
    }


    const completeOrder = async (order) => {
        await axios({
            method: 'put',
            url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/order/' + order.Id,
            data: {
                user_id: order.user_id,
                menu_id: order.menu_id,
                topping: order.topping,
                quantity: order.quantity, 
                total: order.total,
                status: 'completed'},
                headers: {Authorization: token},
            });
        window.location.reload();
    };

    useEffect(() => {
        fetchOrders();
        fetchUsernames();
        fetchMenus();
        fetchToppings();
    }, []);

    return (
        <div className='ordersPage'>
            <h1>New Orders</h1>
            <div className='statusChangeBttn'>
                <a href='/orders'>New</a>
                <a href='/completed'>Completed</a>
            </div>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Menu</th>
                            <th>Toppings</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Complete Button</th>
                        </tr>
                    </thead>
                    <tbody id='pendingTable'>
                        {orders.map(order => {
                            if (order.status == 'pending') {
                                if (order.user_id == '') {
                                    return (
                                        <></>
                                    )
                                } else 
                                    return (
                                        <tr className='trows' key={order.Id}>
                                            {users.map(user => {
                                                if (order.user_id == user.Id) {
                                                    return (
                                                        <td className='userColumn' key={user.Id}>{user.username}</td>
                                                    )
                                                }
                                            })}
                                            {menus.map(menu => {
                                                if (order.menu_id == menu.Id) {
                                                    return (
                                                        <td className='menuColumn' key={menu.Id}>{menu.name}</td>
                                                    )
                                                }
                                            })}
                                            {toppingnamegrab(order)}
                                            <td className='quantityColumn'>{order.quantity}</td>
                                            <td className='totalColumn'>{order.total}</td>
                                            <td className='statusColumn'>{order.status}</td>
                                            {order.status == 'pending' ? (
                                                <td className='completeButton'><button onClick={() => completeOrder(order)}>Complete</button></td>
                                            ) : (
                                                <></>
                                            )}
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