import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/details/:slug" element={<ProductDetails />} />
        <Route path="/shipping" element={<Shipping />} />



      </Routes>
    </BrowserRouter>
  );
}
