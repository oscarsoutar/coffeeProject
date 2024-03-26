import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/BaseLayout';
import HomePage from './views/home/Home';
import ProductPage from './views/product/Product';
import ProductEditPage from './views/product/ProductEdit';
import ProfilePage from './views/profile/ProfilePage';
import LoginPage from './views/login/LoginPage';
import About from './views/about/About';
import OrdersPage from './views/orders/Orders';
import CartPage from './views/cart/Cart';
import CompletedOrders from './views/orders/CompletedOrders';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/productedit' element={<ProductEditPage />}/>
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/completed' element={<CompletedOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;