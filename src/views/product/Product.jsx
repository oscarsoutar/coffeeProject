import axios from 'axios';
import { useEffect, useState } from 'react';
import './Product.css';

export default function ProductPage() {
  const [menus, setMenus] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  const fetchProduct = async () => {
    const response = await axios.get(
      'https://bubble-tea-cafe-api-production.up.railway.app/api/menu'
    );
    const menus_data = response.data;
    setMenus(menus_data.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
    <div className='grid'>
      {menus.map((menu) => (
        <article key={menu.Id}>
          <img src={menu.image} alt='Sample photo' />
          <div className='text'>
            <h3>{menu.name}</h3>
            <p>
              {menu.price} Baht
            </p>

            <button 
            className='btn-modal' 
            onClick={toggleModal}>
              Add Product to Cart
            </button>

            {modal && (
            <div className='modal'>
              <div className='overlay'>
                <div className='modal-content'>
                  <h2>
                    {menu.name}
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ut minus voluptatem laborum amet, consequatur molestiae 
                    adipisci temporibus! Repudiandae ullam accusantium illum 
                    soluta, quam dolorem corporis voluptate tempore architecto 
                    est explicabo eaque nemo perferendis mollitia facilis! Natus 
                    nostrum laudantium reprehenderit ratione ad! Eligendi neque 
                    ea asperiores aliquid dicta corrupti sunt et.
                  </p>

                  <button 
                  className='close-modal' 
                  onClick={toggleModal}>
                    ClOSE
                  </button>
                </div>
              </div>
            </div>
            )}

          </div>
        </article>
      ))}
    </div>
    </>
  );
}