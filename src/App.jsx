import Home from "./pages/Home"
import Login from "./pages/logPage/Log-in"
import ShopDetail from "./pages/shopDetails/shop_detail"
import ProtectUserRoute from "./component/Middleware/protectRoute"
import CheckOut from "./pages/checkOut/checkOut"
import CustomersLogin from "./pages/logPage/customerLogin"
import CustomersSignUp from "./pages/logPage/customerSignUp"
import PaymentPopup from "./component/PopUp/paymentValidation"
import Test from "./pages/test"
import { Routes, Route } from "react-router-dom"
import Cart from "./pages/Cart"
// Dashboard import 
import Dashboard from "./pages/userDashboard/dashboard"
import EditProduct from "./pages/editProduct/EditProduct"
import AddProduct from "./pages/AddProduct"
import DashHome from "./pages/userDashboard/Dashhome/dashome"
import DashProduct from "./pages/userDashboard/DashProducts/products"
import Orders from "./pages/userDashboard/dashOrders/dashOrder"
// Payment Url
import PaymentVerify from "./pages/checkOut/verifyPayment"
export default function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Home />} />
        {/* verification popup ----------------*/} 
        <Route path="/payment/validated" element= {< PaymentPopup />} /> 
        <Route path="/e-sissoko/log-in" element={<Login />} />
        <Route path="/shop/product-detail" element={<ShopDetail />} />
        <Route path="/shop/product" element={<Test />} />
        <Route path="/shop/cart" element={<Cart />} />
        {/* CheckOute Page and protect  */}
        {/* PROTECT ROUTE Administrator*/}
        <Route element={<ProtectUserRoute Customer={false} />}>
          <Route element={<Dashboard />} >
            {/* dashboard outlet */}
            <Route path="/e-sissoko/dashboard" element={<DashHome />} />
            <Route path="/e-dashboard/add-product" element={<AddProduct />} />
            <Route path="/e-dashboard/edit-product" element={<EditProduct />} />
            <Route path="/e-dashboard/product" element={<DashProduct />} />
            <Route path="/e-dashboard/orders" element={<Orders />} />
          </Route>

        </Route>
        {/* PROTECT ROUTE Customers*/}
        <Route element={<ProtectUserRoute Customer={true} />} >
          <Route path="/orders/checkout" element={<CheckOut />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
        </Route>
        {/* login and logout */}
        <Route path="/login-me" element={<CustomersLogin />} />
        <Route path="/e-sissoko/login-me" element={<Login />} />
        <Route path="/signup-me" element={<CustomersSignUp />} />
      </Routes>
    </>
  )
}