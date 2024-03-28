import React, { useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useUserProfile } from "../../layouts/BaseLayout";
import { useEffect } from "react";

export default function ViewCart() {
  const [userorders, setUserOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [toppings, setToppings] = useState([]);
  const userProfile = useUserProfile();
  const cart = userProfile?.cart;
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem('userID');
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchUserOrders = async () => {
    const response = await axios.get(
      'https://bubble-tea-cafe-api-production.up.railway.app/api/order/user/' + userID, {
          headers: {
              Authorization: token
          }
      }
    );
    const orders_data = response.data;
    setUserOrders(orders_data.data);
  };

  const fetchMenus = async () => {
    const response = await axios.get(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/menu",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const menus_data = response.data;
    setMenus(menus_data.data);
  };

  const fetchToppings = async () => {
    const response = await axios.get(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/topping",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const toppings_data = response.data;
    setToppings(toppings_data.data);
  };

  const clearCart = async (e) => {
    e.preventDefault();
    await axios.delete(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.reload();
  };

  const startEditing = (order) => {
    setEditingOrder(order);
  };

  const confirmEditing = async (order) => {
    const editingOrderQty = Number(editingOrder.quantity);
    console.log(editingOrder.menu_id);
    console.log(order.menu_id);
    console.log(editingOrder.topping);
    console.log(order.topping);
    console.log(editingOrder.quantity);
    console.log(order.quantity);
    console.log(editingOrder.comment);
    console.log(order.comment);

    try {
        // const totalPrice = calculateTotalPrice(order.menu_id, order.topping, order.quantity);
      await axios.delete(
        `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/${order.Id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await axios({
        method: "post",
        url: "https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart",
        data: {
          menu_id: editingOrder.menu_id,
          quantity: editingOrderQty,
          topping: editingOrder.topping,
          comment: editingOrder.comment,
        },
        headers: { Authorization: token },
      });
    } catch (error) {
      console.error("Error confirming editing:", error);
    }

    // setEditingOrder(null);
    window.location.reload();
  };

  const removeOrder = async (order) => {
    await axios.delete(
      `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/${order.Id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    window.location.reload();
  };

  const calculateTotalPrice = (menuId, toppingIds, quantity) => {
    const selectedMenu = menus.find(menu => menu.Id === menuId);
    const menuPrice = selectedMenu ? selectedMenu.price : 0;
  
    const toppingsPrice = toppingIds.reduce((acc, toppingId) => {
      const selectedTopping = toppings.find(topping => topping.Id === toppingId);
      return acc + (selectedTopping ? selectedTopping.price : 0);
    }, 0);
  
    return (menuPrice + toppingsPrice) * quantity;
  };

  function toppingnamegrab(order) {
    const toppingname = [];
    order.topping.map(function (value) {
      toppings.map((topping) => {
        if (value == topping.Id) {
          toppingname.push(topping.name);
        }
      });
    });
    return <td className="toppingColumn">{toppingname.join(', ')}</td>;
  }

  const confirmOrder = async (order) => {
    const totalPrice = calculateTotalPrice(order.menu_id, order.topping, order.quantity);
    await axios({
      method: "post",
      url: "https://bubble-tea-cafe-api-production.up.railway.app/api/order/",
      data: {
        user_id: order.user_id,
        menu_id: order.menu_id,
        topping: order.topping,
        quantity: order.quantity,
        total: totalPrice,
        status: order.status,
      },
      headers: { Authorization: token },
    });

    await axios.delete(
      "https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/" +
        order.Id,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    window.location.reload();
  };

  function toppingnamegrab(order) {
    const toppingname = [];
    order.topping.map(function (value) {
      toppings.map((topping) => {
        if (value == topping.Id) {
          toppingname.push(topping.name);
        }
      });
    });
    return <td className="toppingColumn">{toppingname + ""}</td>;
  }

  function ordertoppingnamegrab(userorder) {
    const ordertoppingname = []
    userorder.topping.map(function(value) {
        toppings.map(topping => {
            if (value == topping.Id) {
                ordertoppingname.push(topping.name)
            }
        })
    })
    return <td className='toppingColumn'>{ordertoppingname.join(', ')}</td>
}

  console.log(editingOrder)

  useEffect(() => {
    fetchUserOrders();
    fetchMenus();
    fetchToppings();
  }, []);

  return (
    <div>
        <div className="cart">
            <h1>Cart</h1>
            <div className="table">
                <table>
                <thead>
                    <tr>
                    <th>Menu</th>
                    <th>Toppings</th>
                    <th>Quantity</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.length > 0 &&
                    cart.map((item) => {
                        const totalPrice = calculateTotalPrice(item.menu_id, item.topping, item.quantity);
                        return (
                        <tr key={item.Id}>
                            {menus.map((menu) => {
                            if (menu.Id == item.menu_id) {
                                return (
                                <td className="menuColumn" key={menu.Id}>
                                    {menu.name}
                                </td>
                                );
                            }
                        })}
                            {toppingnamegrab(item)}
                            <td>{item.quantity}</td>
                            <td>{item.comment}</td>
                            <td>{item.status}</td>
                            <td>{totalPrice}</td> 
                            <td>
                            {editingOrder && editingOrder.Id === item.Id ? (
                                <>
                                <input
                                    type="number"
                                    value={editingOrder.quantity}
                                    onChange={e =>
                                        setEditingOrder({
                                            ...editingOrder,
                                        quantity: e.target.value,
                                    })
                                }
                                />
                                <input
                                    type="text"
                                    value={editingOrder.comment}
                                    onChange={(e) =>
                                    setEditingOrder({
                                        ...editingOrder,
                                        comment: e.target.value,
                                    })
                                    }
                                    />
                                {toppings.map((topping) => (
                                    <label key={topping.Id}>
                                    <input
                                        type="checkbox"
                                        value={topping.Id}
                                        checked={editingOrder.topping.includes(
                                            topping.Id
                                            )}
                                            onChange={(e) => {
                                                const toppingId = e.target.value;
                                                if (e.target.checked) {
                                                    setEditingOrder({
                                                        ...editingOrder,
                                                        topping: [
                                                ...editingOrder.topping,
                                                toppingId,
                                            ],
                                            });
                                        } else {
                                            setEditingOrder({
                                            ...editingOrder,
                                            topping: editingOrder.topping.filter(
                                                (id) => id !== toppingId
                                                ),
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
                                <button onClick={() => confirmOrder(item)}>
                                    Confirm Order
                                </button>
                                <button onClick={() => startEditing(item)}>
                                    Edit
                                </button>
                                <button onClick={() => removeOrder(item)}>
                                    remove
                                </button>
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
        <div>
            <div className='order'>
                <h1>Orders</h1>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Toppings</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id='orderTable'>
                        {userorders.map(userorder => {
                            if (userorders.user_id == '') {
                                return (
                                    <></>
                                )
                            } else {
                                return (
                                    <tr className='trows' key={userorder.Id}>
                                    {menus.map(menu => {
                                        if (userorder.menu_id == menu.Id) {
                                            return (
                                                <td className='menuColumn' key={menu.Id}>{menu.name}</td>
                                                )
                                            }
                                        })}
                                    {ordertoppingnamegrab(userorder)}
                                    <td>{userorder.quantity}</td>
                                    <td>{userorder.total}</td>
                                    <td>{userorder.status}</td>
                                </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
  );
}
