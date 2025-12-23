import { createContext, useEffect, useMemo, useState } from "react";
import { number } from "zod";
export const Cartcontext = createContext()
const CartProvider = ({ children }) => {
    const [cart, setcart] = useState(() => {
        const stored = localStorage.getItem('ordP')
        return stored ? JSON.parse(stored) : [];
    });
    const sub_Total = useMemo(() =>{
        const Total = cart.reduce((acc, item ) =>{
          return acc + item.sub_total
        },0)
        return Total ? Total : 0
    }, [cart])
    const ProductNumbers = cart.length ;
    console.log("this is the Sub Total:", sub_Total + " :: " + ProductNumbers )
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
        <Cartcontext.Provider value={{ AddProductToCart, RemoveFromCart, IncreaseQuantity, DecreaseQuantity, cart, sub_Total, ProductNumbers }}>
            {children}
        </Cartcontext.Provider>
    )

}
export default CartProvider;