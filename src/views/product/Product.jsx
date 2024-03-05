import axios from 'axios';
import { useEffect, useState } from 'react';
import './Product.css';

export default function ProductPage() {
  const [menus, setMenus] = useState([]);

  const fetcProduct = async () => {
    const response = await axios.get(
      'https://bubble-tea-cafe-api-production.up.railway.app/api/menu'
    );
    const menus_data = response.data;
    setMenus(menus_data.data);
  };

  useEffect(() => {
    fetcProduct();
  }, []);
  return (
    <div className='grid'>
      {menus.map((menu) => (
        <article key={menu.Id}>
          <img src={menu.image} alt='Sample photo' />
          <div className='text'>
            <h3>{menu.name}</h3>
            <p>
              {menu.category}, {menu.price} Bath
            </p>
            <button>Add Product to Cart</button>
          </div>
        </article>
      ))}
    </div>
  );
}
