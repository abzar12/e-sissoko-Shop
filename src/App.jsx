import AddProduct from "./pages/AddProduct"
import Home from "./pages/Home"
import EditProduct from "./pages/editProduct/EditProduct"
import Login from "./pages/logPage/Log-in"
import ShopDetail from "./pages/shopDetails/shop_detail"
import Dashboard from "./pages/userDashboard/dashboard"
import ProtectUserRoute from "./component/Middleware/protectRoute"
import CheckOut from "./pages/checkOut/checkOut"
import CustomersLogin from "./pages/logPage/customerLogin"
import CustomersSignUp from "./pages/logPage/customerSignUp"
import Test from "./pages/test"
import { Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
export default function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Home />} />

        <Route path="/e-sissoko/log-in" element={<Login />} />
        <Route path="/shop/product-detail" element={<ShopDetail />} />
        <Route path="/shop/product" element={<Test />} />
        <Route path="/shop/cart" element={<Cart />} />
        {/* CheckOute Page and protect  */}
        <Route path="/orders/checkout" element={<CheckOut />} />
        {/* PROTECT ROUTE */}
        <Route element={<ProtectUserRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop/add-product" element={<AddProduct />} />
          <Route path="/product/edit-product" element={<EditProduct />} />
        </Route>
        {/* Protect route Customer login */}
        <Route path="/login-me" element={<CustomersLogin /> } />
        <Route path="/signup-me" element={<CustomersSignUp /> } />
      </Routes>
    </>
  )
}