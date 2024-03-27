import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Cart.css'
import { useUserProfile } from '../../layouts/BaseLayout';

export default function viewCart() {
    const [menus, setMenus] = useState([]);
    const [toppings, setToppings] = useState([]);
    const userProfile = useUserProfile();
    const cart = userProfile?.cart;
    const token = localStorage.getItem('token');

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

    useEffect(() => {
        fetchMenus();
        fetchToppings();
    }, []);

    return (
        <div className="cart">
        <h2>Cart</h2>
        {/* {cart?.length > 0 && cart.map((item, index) => (
          <div key={item.Id}>
            <p>Menu ID: {item.menu_id}</p>
            <p>Quantity: {item.quantity}</p>
            {item.topping === null ? (
              <p>Topping: None</p>
            ) : (
              <p>
                {item.topping.length > 1 ? (
                  <span>Toppings: {item.topping.join(', ')}</span>
                ) : (
                  <span>Topping: {item.topping[0]}</span>
                )}
              </p>
            )}
            <p>Comment: {item.comment}</p>
            <p>Status: {item.status}</p>
            <hr />
          </div>
        ))} */}
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Toppings</th>
                        <th>Quantity</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Order Button</th>
                    </tr>
                </thead>
                <tbody>
                {cart?.length > 0 && cart.map(item => {
                    return (
                        <tr key={item.Id}>
                        {menus.map(menu => {
                            if (menu.Id == item.menu_id) {
                                return (
                                    <td className='menuColumn' key={menu.Id}>{menu.name}</td>
                                )
                            }
                        })}
                        {toppingnamegrab(item)}
                        <td>{item.quantity}</td>
                        <td>{item.comment}</td>
                        <td>{item.status}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
      </div>
    );
}