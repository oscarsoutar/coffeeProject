import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/BaseLayout';
import HomePage from './views/home/Home';
import ProductPage from './views/product/Product';
import ProfilePage from './views/profile/ProfilePage';
import LoginPage from './views/login/LoginPage';
import About from './views/about/About';
import OrdersPage from './views/orders/Orders';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/orders' element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;