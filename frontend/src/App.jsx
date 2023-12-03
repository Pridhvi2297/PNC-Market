import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import { useDispatch } from 'react-redux';
import { get_category } from './store/reducers/homeReducer'
import { useEffect } from "react";
import CategoryShops from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path='/products?' element={<CategoryShops />} />
        <Route path='/products/search?' element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/details/:slug" element={<ProductDetails />} />
        <Route path="/shipping" element={<Shipping />} />



      </Routes>
    </BrowserRouter>
  );
}
