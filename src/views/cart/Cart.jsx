import './Cart.css'
import { useUserProfile } from '../../layouts/BaseLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

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


    const clearCart = async (e) => {
        e.preventDefault();
        await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart', {
            headers: {
                Authorization: token
            }
        })
        window.location.reload();
    }


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
    }





    useEffect(() => {
        fetchMenus();
        fetchToppings();
    }, []);

    return (
        <div className="cart">
        <h2>Cart</h2>
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Toppings</th>
                        <th>Quantity</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Actions</th>
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
                        <td>
                            <button>confirm order</button>
                            <button>remove</button> 
                            <button>edit</button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            <button onClick={clearCart}>clear</button>
        </div>
      </div>
    );
}