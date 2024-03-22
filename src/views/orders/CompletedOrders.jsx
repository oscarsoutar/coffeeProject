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

    function toppingnamegrab(order) {
        var toppingname = []
        var topName
        toppingname = order.topping.map(function(value) {
            topName = toppings.map(topping => {
                if (value == topping.Id) {
                    return topping.name
                }
            })
            return topName
        })
        return <td className='toppingColumn'><ul className='toppinglist'>{toppingname}</ul></td>
    }

    useEffect(() => {
        fetchOrders();
        fetchUsername();
        fetchMenus();
        fetchToppings();
    }, []);

    return (
        <div className='ordersPage'>
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
                                        <tr className='trows' key={order.Id}>
                                            {users.map(user => {
                                                if (order.user_id == user.Id) {
                                                    return (
                                                        <td className='userColumn' key={user.Id}>{user.username}</td>
                                                    )
                                                }
                                            })}
                                            {menus.map(menu => {
                                                if (menu.Id == order.menu_id) {
                                                    return (
                                                        <td className='menuColumn' key={menu.Id}>{menu.name}</td>
                                                    )
                                                }
                                            })}
                                            {toppingnamegrab(order)
                                            // toppingname = order.topping.map(function(value) {
                                            //     toppings.map(topping => {
                                            //         if (value == topping) {
                                            //             toppingname.push(topping.name)
                                            //         }
                                            //     })
                                            // })
                                            }
                                            {/* {order.topping.map(topping => {
                                                var toppingnames = []
                                                var breakcount = order.topping.length
                                                if (breakcount = 0) {
                                                    return (
                                                        <td>{toppingnames}</td>
                                                    )
                                                } else {
                                                    toppingnames.push(topping.name)
                                                    breakcount =- 1
                                                }
                                                // var ordertoppingarr = order.topping
                                                // var toppingIDarr = topping.Id
                                                // for (let i = 0; i < order.topping.length; i++) {
                                                //     for (let x = 0; x < topping.Id.length; x++) {
                                                //         if (ordertoppingarr[i] == toppingIDarr[x]) {
                                                //             toppingnames.push(topping.name[x])
                                                //         }
                                                //     }
                                                // }
                                                // return (
                                                //     <td key={topping.Id}>{toppingIDarr}</td>
                                                // )
                                                // if (order.topping === topping.Id) {
                                                //     return (
                                                //         <td key={topping.Id}><li>{topping.name}</li></td>
                                                //     )
                                                // }
                                            })} */}
                                            <td className='quantityColumn'>{order.quantity}</td>
                                            <td className='totalColumn'>{order.total}</td>
                                            <td className='statusColumn'>{order.status}</td>
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