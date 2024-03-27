import './Cart.css'
import { useUserProfile } from '../../layouts/BaseLayout';

export default function viewCart() {
    const userProfile = useUserProfile();
    const cart = userProfile?.cart;
    console.log(cart);

    return (
        <div className="cart">
        <h2>Cart</h2>
        {cart?.length > 0 && cart.map((item, index) => (
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
        ))}
      </div>
    );
}