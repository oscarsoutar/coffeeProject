import axios from 'axios';
import { useEffect, useState } from 'react';
import './Product.css';

export default function ProductPage() {
  const [menus, setMenus] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem('token');
  
  const toggleModal = () => {
    setModal(!modal)
    setQuantity(1);
    setComment("");
  }

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setSelectedToppings([]);
    toggleModal();
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity)) {
      return;
    }
    setQuantity(newQuantity);
  };

  const handleToppingClick = (topping) => {
    if (selectedToppings.some((t) => t.Id === topping.Id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.Id !== topping.Id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const fetchProduct = async () => {
    const response = await axios.get(
      'https://bubble-tea-cafe-api-production.up.railway.app/api/menu'
    );
    setMenus(response.data.data);
  };

  const fetchTopping = async () => {
    const response = await axios.get(
      'https://bubble-tea-cafe-api-production.up.railway.app/api/topping'
    );
    setToppings(response.data.data);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
        await axios({
          method: 'post',
          url: 'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart',
          data: {
              menu_id: selectedMenu.Id,
              quantity: quantity,
              topping: selectedToppings.Id,
              comment: comment},
          headers: {Authorization: token}
          }
        )
      window.location.reload();
    };


  useEffect(() => {
    fetchProduct();
    fetchTopping();
  }, []);
  return (
    <>
    <div className='grid'>
      {menus.map((menu) => (
        <article key={menu.Id}>
          <img src={menu.image} alt='Sample photo' />
          <div className='text'>
            <h3>{menu.name}</h3>
            <p className='price'>
              ฿{menu.price} THB
            </p>

            <button 
              className='btn-modal' 
              onClick={() => handleMenuClick(menu)}>
              Add Product to Cart
            </button>
          </div>

            {/* POPUP MODAL FOR ADD CART */}
            {modal && selectedMenu && (
            <div className='overlay'>
              <div className='modal'>
                <div className='modal-content'>

                  <h2>
                    {selectedMenu.name}
                  </h2>

                  <div className='modal-img'>
                  <img 
                  src={selectedMenu.image} 
                  alt='Sample photo' />
                  </div>

                  <p>
                    ฿{selectedMenu.price} THB
                  </p>

                  {/* TOPPING SELECTION */}
                  {toppings.length > 0 && (
                    <div>
                      <p>Toppings:</p>
                      {toppings.map((topping) => (
                        <button
                          className='btn-topping'
                          key={topping.Id}
                          onClick={() => handleToppingClick(topping)}
                        >
                          {topping.name}
                        </button>
                      ))}

                      {/* HOLD SELECTED TOPPING */}
                      {selectedToppings.length > 0 && (
                        <div>
                          <p>Selected Toppings:</p>
                          <ul>
                            {selectedToppings.map((selectedTopping) => (
                              <li key={selectedTopping.Id}>
                                {selectedTopping.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <p>
                    {/* INPUT QUANTITY */}
                    Quantity:  
                    <input
                      className='quantity-input'
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </p>

                  <p>
                    Comment:
                  </p>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />


                  <button className='btn-cart' type='submit' value='Submit'
                  onClick={(e) => handleSubmit(e)}>
                  {/* <button className='btn-cart' onClick={handleSubmit}> */}
                    Add to Cart
                  </button>


                  <button 
                    className='close-modal' 
                    onClick={toggleModal}>
                    ClOSE
                  </button>

                </div>
              </div>
            </div>
            )}
        </article>
      ))}
    </div>
    </>
  );
}