import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import ProtectUserRoute from "./component/Middleware/protectRoute"
import ProtectCustomerRoute from "./component/Middleware/protectCustomerRoute"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/logPage/Log-in"))
const SignUp = lazy(() => import("./pages/logPage/Sign-up"))
const ShopDetail = lazy(() => import("./pages/shopDetails/shop_detail"))
const CheckOut = lazy(() => import("./pages/checkOut/checkOut"))
const CustomersLogin = lazy(() => import("./pages/logPage/customerLogin"))
const CustomersSignUp = lazy(() => import("./pages/logPage/customerSignUp"))
const CustomerOrders = lazy(() => import("./pages/customerOrder/customerOrders"))
const CustomerProfile = lazy(() => import("./pages/customerProfile/profile"))
const PaymentPopup = lazy(() => import("./component/PopUp/paymentValidation"))
const OrdersItems = lazy(() => import("./pages/customerOrder/ordersItems"))
const Test = lazy(() => import("./pages/test"))
const Cart = lazy(() => import("./pages/Cart"))
const CustomerPassword = lazy(() =>
  import("./pages/password/customerPassword").then((module) => ({
    default: module.CustomerPassword,
  }))
)
const VerifyOTP = lazy(() =>
  import("./pages/password/customerVerifyOTP").then((module) => ({
    default: module.VerifyOTP,
  }))
)
const NewPassword = lazy(() =>
  import("./pages/password/changePassword").then((module) => ({
    default: module.NewPassword,
  }))
)

// Dashboard pages
const Dashboard = lazy(() => import("./pages/userDashboard/dashboard"))
const EditProduct = lazy(() => import("./pages/editProduct/EditProduct"))
const AddProduct = lazy(() => import("./pages/AddProduct"))
const DashHome = lazy(() => import("./pages/userDashboard/Dashhome/dashome"))
const DashProduct = lazy(() => import("./pages/userDashboard/DashProducts/products"))
const Orders = lazy(() => import("./pages/userDashboard/dashOrders/dashOrder"))
const DashCustomers = lazy(() => import("./pages/userDashboard/dashCustomers/customers"))
const DashUsers = lazy(() => import("./pages/userDashboard/dashUsers/dashUser"))
const DashPayment = lazy(() => import("./pages/userDashboard/dashPayment/dashPayment"))
const ViewOrders = lazy(() => import("./pages/userDashboard/dashViewOrdes/viewOrders"))
const UserProfile = lazy(() => import("./pages/userDashboard/dashProfile/userProfile"))

// Payment page
const PaymentVerify = lazy(() => import("./pages/checkOut/verifyPayment"))
const ItemsView = lazy(() => import("./pages/customerOrder/itemsView"))
function AppLoading() {
  return (
    <main
      role="status"
      aria-label="Loading application"
      className="grid min-h-screen place-items-center bg-slate-50 px-4"
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-indigo-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
        </div>

        <p className="mt-5 text-center text-sm font-medium text-slate-500">
          Loading your page…
        </p>
        <span className="sr-only">Loading application…</span>
      </div>
    </main>
  )
}
export default function App() {
  return (
    <Suspense fallback={<AppLoading />}>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Home />} />
        <Route path="/payment/validated" element={<PaymentPopup />} />
        <Route path="/shop/product-detail" element={<ShopDetail />} />
        <Route path="/shop/product" element={<Test />} />
        <Route path="/shop/cart" element={<Cart />} />

        {/* PROTECT ROUTE Administrator */}
        <Route element={<ProtectUserRoute Customer={false} />}>
          <Route element={<Dashboard />}>
            <Route path="/e-sissoko/dashboard" element={<DashHome />} />
            <Route path="/e-dashboard/add-product" element={<AddProduct />} />
            <Route path="/e-dashboard/edit-product" element={<EditProduct />} />
            <Route path="/e-dashboard/product" element={<DashProduct />} />
            <Route path="/e-dashboard/orders" element={<Orders />} />
            <Route path="/e-dashboard/customers" element={<DashCustomers />} />
            <Route path="/e-dashboard/users" element={<DashUsers />} />
            <Route path="/e-dashboard/payment" element={<DashPayment />} />
            <Route path="/e-dashboard/view-orders" element={<ViewOrders />} />
            <Route path="/e-dashboard/user/profile" element={<UserProfile />} />
            <Route path="/e-sissoko/signup-me" element={<SignUp />} />
          </Route>
        </Route>

        {/* PROTECT ROUTE Customers */}
        <Route element={<ProtectCustomerRoute Customer={true} />}>
          <Route path="/orders/checkout" element={<CheckOut />} />
          <Route path="/payment/verify" element={<PaymentVerify />} />
          <Route element={<CustomerOrders />}>
            <Route path="/customer/orders" element={<OrdersItems />} />
            <Route path="/orders/view" element={<ItemsView />} />
          </Route>
          <Route path="/customer/profile" element={<CustomerProfile />} />
        </Route>

        {/* Forgot Password */}
        <Route path="/customer/verify-OTP/" element={<VerifyOTP />} />
        <Route path="/customer/new-password/" element={<NewPassword />} />
        <Route path="/customer/forgot-password" element={<CustomerPassword />} />

        {/* Login and signup */}
        <Route path="/login-me" element={<CustomersLogin />} />
        <Route path="/e-sissoko/login-me" element={<Login />} />
        <Route path="/signup-me" element={<CustomersSignUp />} />
      </Routes>
    </Suspense>
  )
}