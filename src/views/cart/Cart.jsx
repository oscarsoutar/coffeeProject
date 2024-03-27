import './Cart.css'
import axios from 'axios';
import { useState } from 'react';
// import AddToCart from 'product';

export default function AddToCart() {
  const [cart, setCart] = useState([]);

//   const [quantity, setQuantity] = useState('');
//   const [topping, setTopping] = useState('');
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//           'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart',
//           {
//             quantity: quantity,
//             topping: topping,
//             comment: comment,
//           }
//         )
//         .then((response) => {
//           localStorage.setItem('cart', response.data);
//           window.location.href = '/';
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const cartItems = JSON.parse(localStorage.getItem('cart')) || []; 

const fetchCart = async () => {
    const response = await axios.get(
        'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/user/' + cartId//need cart id
    );
    const cart_data = response.data.cart;
    setCart(cart_data.cart);
};
useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="cart">
        <h2>Cart</h2>
        <p>{cart.quantity}</p>
    </div>
  );
//   return (
//     <div className='container'>
//       <form onSubmit={handleSubmit}>
//         <div className='title'>Login</div>
//         <div className='input-box underline'>
//           <input
//             type='text'
//             placeholder='Enter Your Email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             />
//           <div className='underline'></div>
//         </div>
//         <div className='input-box'>
//           <input
//             type='password'
//             placeholder='Enter Your Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             />
//           <div className='underline'></div>
//         </div>
//         <div className='input-box button'>
//           <input type='submit' name='' value='Login' />
//         </div>
//       </form>
//     </div>
// );
}