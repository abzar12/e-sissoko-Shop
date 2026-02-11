import Home from "./pages/Home"
import Login from "./pages/logPage/Log-in"
import ShopDetail from "./pages/shopDetails/shop_detail"
import ProtectUserRoute from "./component/Middleware/protectRoute"
import ProtectCustomerRoute from "./component/Middleware/protectCustomerRoute"
import CheckOut from "./pages/checkOut/checkOut"
import CustomersLogin from "./pages/logPage/customerLogin"
import CustomersSignUp from "./pages/logPage/customerSignUp"
import CustomerOrders from "./pages/customerOrder/customerOrders"
import CustomerProfile from "./pages/customerProfile/profile"
import PaymentPopup from "./component/PopUp/paymentValidation"
import OrdersItems from "./pages/customerOrder/ordersItems"
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
import DashCustomers from "./pages/userDashboard/dashCustomers/customers"
import DashUsers from "./pages/userDashboard/dashUsers/dashUser"
import DashPayment from "./pages/userDashboard/dashPayment/dashPayment"
import ViewOrders from "./pages/userDashboard/dashViewOrdes/viewOrders"
// Payment Url
import PaymentVerify from "./pages/checkOut/verifyPayment"
import ItemsView from "./pages/customerOrder/itemsView"
export default function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Home />} />
        {/* verification popup ----------------*/}
        <Route path="/payment/validated" element={< PaymentPopup />} />
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
            <Route path="/e-dashboard/customers" element={< DashCustomers />} />
            <Route path="/e-dashboard/users" element={< DashUsers />} />
            <Route path="/e-dashboard/payment" element={< DashPayment />} />
            <Route path="/e-dashboard/view-orders" element={<ViewOrders />} />

          </Route>

        </Route>
        {/* PROTECT ROUTE Customers*/}
        <Route element={<ProtectCustomerRoute Customer={true} />} >
          <Route path="/orders/checkout" element={<CheckOut />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route element={<CustomerOrders />} >
            <Route path="/customer/orders" element={<OrdersItems />} />
            <Route path="/orders/view" element={<ItemsView />} />
          </Route>
            <Route path="/customer/profile" element={<CustomerProfile/>} />
        </Route>
        {/* login and logout */}
        <Route path="/login-me" element={<CustomersLogin />} />
        <Route path="/e-sissoko/login-me" element={<Login />} />
        <Route path="/signup-me" element={<CustomersSignUp />} />
      </Routes>
    </>
  )
}