import { createContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import ShopDetail from "../../../pages/shopDetails/shop_detail";

export const Cartcontext = createContext()
const CartProvider = ({ children }) => {
    const [cart, setcart] = useState(() => {
        const stored = localStorage.getItem('ordP')
        return stored ? JSON.parse(stored) : [];
    });
    const [quantity, setQuantity] = useState(0)
    const AddProductToCart = (product) => {
        //const existing = cart.find(item => item.id === product.id)
        setcart((prev) => {
            const existing = prev.find(item => item.id === product.id)
            if (!existing) {
                return [...prev, product];
            }
            else {
                return [...prev];
            }
        })
    }
    const RemoveFromCart = (productId) => {
        setcart((prev) => prev.filter(item => item.id !== productId));
    };
    const IncreaseQuantity = (productId) => {
        setcart((prev) =>
            prev.map(item =>
                item.id === productId ?
                    { ...item, quantity: item.quantity + 1, sub_total: (item.quantity + 1) * item.price }
                    :
                    item
            )
        );
    };
    const DecreaseQuantity = (productId) => {
        setcart((prev) =>
            prev
                .map((item) =>
                    item.id === productId && item.quantity > 0 ?
                        { ...item, quantity: item.quantity - 1, sub_total: (item.quantity - 1) * item.price }
                        :
                        item
                )
                .filter((item) => item.quantity > 0)
        )
    }
    // mantain the ord to be update 
    useEffect(() => {
        localStorage.setItem('ordP', JSON.stringify(cart))
    }, [cart]);
    // add product to cart 
    return (
        <Cartcontext.Provider value={{ AddProductToCart, RemoveFromCart, IncreaseQuantity, DecreaseQuantity, cart }}>
            {children}
        </Cartcontext.Provider>
    )

}
export default CartProvider;