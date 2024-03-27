import './Cart.css'
import axios from 'axios';
import { useState , useEffect} from 'react';
import { useUserProfile } from '../../layouts/BaseLayout';

export default function viewCart() {
    const userProfile = useUserProfile();
    const userId = userProfile?.Id;
    const [cart, setCart] = useState([]);
    const token = localStorage.getItem('token');
    console.log(userId)
    const fetchCart = async () => {
        const response = await axios.get(
            'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/user/' + userId
            , {
                headers: {
                    Authorization: token,
                }
            }
        );
        setCart(response.data.cart);
    };

    console.log(cart);

    useEffect(() => {
        fetchCart();
    }, []);
    return (
        <div className="cart">
            <h2>Cart</h2>
            <p>{userId} items in your cart.</p>
        </div>
    );
}