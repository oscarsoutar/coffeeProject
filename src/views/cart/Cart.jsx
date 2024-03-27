// import React from 'react';
// import axios from 'axios';
// import './Cart.css'
// import { useUserProfile } from '../../layouts/BaseLayout';
// import { useEffect, useState } from 'react';

// export default function viewCart() {
//     const [menus, setMenus] = useState([]);
//     const [toppings, setToppings] = useState([]);
//     const userProfile = useUserProfile();
//     const cart = userProfile?.cart;
//     const token = localStorage.getItem('token');

//     const fetchMenus = async () => {
//         const response = await axios.get(
//             'https://bubble-tea-cafe-api-production.up.railway.app/api/menu', {
//                 headers: {
//                     Authorization: token
//                 }
//             }
//         );
//         const menus_data = response.data;
//         setMenus(menus_data.data);
//     };

//     const fetchToppings = async () => {
//         const response = await axios.get(
//             'https://bubble-tea-cafe-api-production.up.railway.app/api/topping', {
//                 headers: {
//                     Authorization: token
//                 }
//             }
//         );
//         const toppings_data = response.data;
//         setToppings(toppings_data.data);
//     };


//     const clearCart = async (e) => {
//         e.preventDefault();
//         await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart', {
//             headers: {
//                 Authorization: token
//             }
//         })
//         window.location.reload();
//     }
    
//     const confirmOrder = async (order) => {
//         await axios({
//             method: 'post',
//             url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/order/',
//             data: {
//                 user_id: order.user_id,
//                 menu_id: order.menu_id,
//                 topping: order.topping,
//                 quantity: order.quantity, 
//                 total: 200,
//                 status: order.status},
//                 headers: {Authorization: token},
//             });
        
//         await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/' + order.Id, {
//             headers: {
//                 Authorization: token
//             }
//         })

//         window.location.reload();
//     };

//     const removeOrder = async (order) => {
//         await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/' + order.Id, {
//             headers: {
//                 Authorization: token
//             }
//         })

//         window.location.reload();
//     }

//     function toppingnamegrab(order) {
//         const toppingname = []
//         order.topping.map(function(value) {
//             toppings.map(topping => {
//                 if (value == topping.Id) {
//                     toppingname.push(topping.name)
//                 }
//             })
//         })
//         return <td className='toppingColumn'>{toppingname + ''}</td>
//     }




//     useEffect(() => {
//         fetchMenus();
//         fetchToppings();
//     }, []);

//     return (
//         <div className="cart">
//         <h2>Cart</h2>
//         <div className='table'>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Menu</th>
//                         <th>Toppings</th>
//                         <th>Quantity</th>
//                         <th>Comment</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {cart?.length > 0 && cart.map(item => {
//                     return (
//                         <tr key={item.Id}>
//                         {menus.map(menu => {
//                             if (menu.Id == item.menu_id) {
//                                 return (
//                                     <td className='menuColumn' key={menu.Id}>{menu.name}</td>
//                                 )
//                             }
//                         })}
//                         {toppingnamegrab(item)}
//                         <td>{item.quantity}</td>
//                         <td>{item.comment}</td>
//                         <td>{item.status}</td>
//                         <td>
//                             <button onClick={() => confirmOrder(item)}>Confirm Order</button>
//                             <button onClick={() => removeOrder(item)}>remove</button> 
//                             <button onClick={() => startEditing(item)}>Edit</button>

//                         </td>
//                     </tr>
//                     )
//                 })}
//                 </tbody>
//             </table>
//             <button onClick={() => clearCart()}>clear</button>
//         </div>
//       </div>
//     );
// }



import React, { useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useUserProfile } from "../../layouts/BaseLayout";
import { useEffect } from "react";

export default function ViewCart() {
  const [menus, setMenus] = useState([]);
  const [toppings, setToppings] = useState([]);
  const userProfile = useUserProfile();
  const cart = userProfile?.cart;
  const token = localStorage.getItem("token");
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchMenus = async () => {
    const response = await axios.get(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/menu", {
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
      "https://bubble-tea-cafe-api-production.up.railway.app/api/topping", {
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
    await axios.delete(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart", {
        headers: {
          Authorization: token
        }
      }
    )
    window.location.reload();
  }

  const startEditing = (order) => {
    setEditingOrder(order);
  };

  
  const confirmEditing = async (order) => {
    console.log(editingOrder.menu_id);
    console.log(order.menu_id);
    console.log(editingOrder.topping);
    console.log(order.topping);
    console.log(editingOrder.quantity);
    console.log(order.quantity);
    console.log(editingOrder.comment);
    console.log(order.comment);
    
    // e.preventDefault();

    try {
      await axios.delete(
          `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/${order.Id}`, {
              headers: {
                  Authorization: token
                }
            }
            );

        if (response.status == 200) {
            await axios({
                method: 'post',
                url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart',
                data: {
                    menu_id: order.menu_id,
                    quantity: order.quantity,
                    topping: order.topping,
                    comment: order.comment},
                headers: {Authorization: token},
            })
        }

    setEditingOrder(null);
    window.location.reload();
} catch (error) {
    console.error("Error confirming editing:", error);
    // Handle error, display message to the user, etc.
  }
};

const removeOrder = async (order) => {
    await axios.delete(
        `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/${order.Id}`, {
            headers: {
          Authorization: token
        }
    }
    );
    
    window.location.reload();
}

function toppingnamegrab(order) {
    const toppingname = [];
    order.topping.map(function (value) {
        toppings.map((topping) => {
            if (value == topping.Id) {
                toppingname.push(topping.name);
            }
      });
    });
    return <td className='toppingColumn'>{toppingname +     ''}</td>
}


const confirmOrder = async (order) => {
    await axios({
        method: 'post',
        url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/order/',
        data: {
            user_id: order.user_id,
            menu_id: order.menu_id,
            topping: order.topping,
            quantity: order.quantity, 
            total: 200,
            status: order.status},
            headers: {Authorization: token},
        });
        
        await axios.delete('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/' + order.Id, {
        headers: {
            Authorization: token
        }
    })
    
    window.location.reload();
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
          {cart?.length > 0 && cart.map((item) => {
            return (
              <tr key={item.Id}>
                {menus.map((menu) => {
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
                  {editingOrder && editingOrder.Id === item.Id ? (
                    <>
                      <input
                        type="number"
                        value={editingOrder.quantity}
                        onChange={(e) =>
                          setEditingOrder({ ...editingOrder, quantity: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        value={editingOrder.comment}
                        onChange={(e) =>
                          setEditingOrder({ ...editingOrder, comment: e.target.value })
                        }
                      />
                    {toppings.map((topping) => (
                        <label key={topping.Id}>
                        <input
                            type="checkbox"
                            value={topping.Id}
                            checked={editingOrder.topping.includes(topping.Id)}
                            onChange={(e) => {
                            const toppingId = e.target.value; // Keep topping ID as a string
                            if (e.target.checked) {
                                // Add topping to the list
                                setEditingOrder({
                                ...editingOrder,
                                topping: [...editingOrder.topping, toppingId]
                                });
                            } else {
                                // Remove topping from the list
                                setEditingOrder({
                                ...editingOrder,
                                topping: editingOrder.topping.filter(id => id !== toppingId)
                                });
                            }
                            }}
                        />
                        {topping.name}
                        </label>
                    ))}


                      <button onClick={() => confirmEditing(editingOrder)}>
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                    <button onClick={() => confirmOrder(item)}>Confirm Order</button>
                    <button onClick={() => startEditing(item)}>Edit</button>
                    <button onClick={() => removeOrder(item)}>remove</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={(e) => clearCart(e)}>clear</button>
    </div>
  </div>
);
}