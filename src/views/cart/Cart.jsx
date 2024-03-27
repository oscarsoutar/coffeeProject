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


    // const confirmOrder = async () => {
    //     if (userProfile) {
    //         const orderData = {
    //             menus: cart.menus,
    //             toppings: cart.toppings,
    //             quantity: cart.quantity,
    //             comment: cart.comment
    //         };

    //         await axios.post('https://bubble-tea-cafe-api-production.up.railway.app/api/order', {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });

    //         userProfile.setCart({});
    //     }

    // const confirmOrder = async () => {
    //     if (userProfile) {
    //         const orderData = {
    //             user_id: userProfile.id,
    //             menus: cart.menus,
    //             toppings: cart.toppings,
    //             quantity: cart.quantity,
    //             comment: cart.comment,
    //             total: calculateTotalCost(cart.menus, cart.toppings, cart.quantity),
    //             status: "pending"
    //         };
    
    //         try {
    //             const response = await axios.post('https://bubble-tea-cafe-api-production.up.railway.app/api/order', orderData, {
    //                 headers: {
    //                     Authorization: token
    //                 }
    //             });
    
    //             if (response.status === 201) {
    //                 userProfile.setCart({});
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }

    // async function calculateTotalCost(menus, toppings, quantity) {
    //     let totalCost = 0;
    
    //     // Calculate the cost of the menus
    //     for (const menu of menus) {
    //         // Get the price of the menu from the API
    //         const menuResponse = await axios.get(`https://bubble-tea-cafe-api-production.up.railway.app/api/menu/${menu.Id}`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });
    //         const menuPrice = menuResponse.data.data.price;
    
    //         // Add the cost of the menu to the total cost
    //         totalCost += menuPrice * quantity;
    //     }
    
    //     // Calculate the cost of the toppings
    //     for (const topping of toppings) {
    //         // Get the price of the topping from the API
    //         const toppingResponse = await axios.get(`https://bubble-tea-cafe-api-production.up.railway.app/api/topping/${topping}`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });
    //         const toppingPrice = toppingResponse.data.data.price;
    
    //         // Add the cost of the topping to the total cost
    //         totalCost += toppingPrice;
    //     }
    
    //     return totalCost;
    // }



    const clearCart = async (e) => {
        e.preventDefault();
        await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart', {
            headers: {
                Authorization: token
            }
        })
        window.location.reload();
    }



    
    // const [selectedItem, setSelectedItem] = useState([]);
    // const handleItemClick = (item) => {
    //     // e.preventDefault();
    //     // setSelectedItem(e);
    //     setSelectedItem(item);
    //     // (e) => removeItem(e)
    // }
    // console.log(selectedItem);
    // console.log(selectedItem.Id);

    // const removeItem = async (e) => {
    //     e.preventDefault();
    //     var itemId

    //     cart.map((item) => { 
    //         if(item.id === selectedItem.id) {
    //             itemId= item.id
    //         }
    //     })

    //     await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/' + selectedItem.id //find cartId
    //     , {
    //         headers: {
    //             Authorization: token
    //         }
    //     })
    //     window.location.reload();
    // }




    // const menuDelete = async (e) => {
    //     e.preventDefault();

    //     let menuSelect = document.querySelector('#menuSelect').value;
    //     var menuId

    //     menus.map((menu) => {
    //         if (menu.name == menuSelect) {
    //             menuId = menu.Id
    //         }
    //     })
    //     await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/menu/' + menuId, {
    //         headers: {
    //             Authorization: token
    //         }
    //     })
    //     window.location.reload();
    // }



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
                            {/* <button onClick={handleItemClick(item)}>remove</button> */}
                            {/* <button onClick={(e) => { handleItemClick(item); removeItem(e) }}>remove</button> */}
                            {/* {() => { setSelectedItem(item); handleRemoveItem() }} */}
                            {/* <button onClick={(e) => removeItem(e)}>remove</button> */}
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