import AddProduct from "./pages/AddProduct"
import Home from "./pages/Home"
import EditProduct from "./pages/EditProduct"
import Login from "./pages/Log-in"
import ShopDetail from "./pages/shop_detail"
import Test from "./pages/test"
import Select from "./component/Select/select"
import Reackform from "./component/formhooks/reackform"
import MyAlert from "./component/PopUp/myAlert"

import { useTheme } from "./pages/themeContext"
import { Routes, Route } from "react-router-dom"
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/add-product" element={<AddProduct />} />
        <Route path="/product/edit-product" element={<EditProduct />} />
        <Route path="/e-sissoko/log-in/" element={<Login />} />
        <Route path="/shop/product-detail" element={<ShopDetail />} />
        <Route path="/shop/product" element={<Test />} />
        <Route path="/select" element={<Select />} />
        <Route path="/ReactForm" element={<Reackform />} />
        <Route path="/myAlert" element={<MyAlert />} />
      </Routes>
    </>
  )
}