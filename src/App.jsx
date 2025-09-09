import AddProduct from "./AddProduct"
import Home from "./Home"
import EditProduct from "./EditProduct"
import Login from "./Log-in"
import { Routes, Route } from "react-router-dom"
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/product/edit-product" element={<EditProduct />} />
        <Route path="/e-sissoko/log-in/" element={<Login />} />
      </Routes>
    </>


  )
}