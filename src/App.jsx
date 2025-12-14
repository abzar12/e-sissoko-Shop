import AddProduct from "./pages/AddProduct"
import Home from "./pages/Home"
import EditProduct from "./pages/EditProduct"
import Login from "./pages/Log-in"
import ShopDetail from "./pages/shopDetails/shop_detail"
import Test from "./pages/test"
import { useTheme } from "./pages/themeContext"
import { Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
import CartProvider from "./component/Context/cartContext/cartContext"

export default function App() {
  return (
    <>
      <CartProvider >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/add-product" element={<AddProduct />} />
          <Route path="/product/edit-product" element={<EditProduct />} />
          <Route path="/e-sissoko/log-in/" element={<Login />} />
          <Route path="/shop/product-detail" element={<ShopDetail />} />
          <Route path="/shop/product" element={<Test />} />
          <Route path="/shop/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  )
}