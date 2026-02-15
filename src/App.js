import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeNavBarComponent from './components/navbar/HomeNavBarComponent';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import Login from './components/login';
import Supplier from './components/supplier';
import Favourite from './components/favourite';
import Orders from './components/orders';
import StandingOrder from './components/standingorder';
import Payments from './components/payments';
import Trader from './components/trader';
import Product from './components/products';
import TraderPrice from './components/traderprice';
import Invoice from './components/Invoice';
import Inventory from './components/inventory';
import { useAuth } from './context/Auth';
import Cart from './components/cart';

function App() {
  
  const{isLoggedIn} = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
      if(!isLoggedIn){
          navigate('/')
      }
  },[])
  return (
    <>
      <HomeNavBarComponent/>
      <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/productsList" element={<ProductListComponent />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fav" element={<Favourite />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/standingorders" element={<StandingOrder />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/trader" element={<Trader />} />
          <Route path="/products" element={<Product />} />
          <Route path="/tprice" element={<TraderPrice />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* <Route path="/supplier" element={<Supplier />} /> */}
        </Routes>
    </>
  );
}

export default App;
