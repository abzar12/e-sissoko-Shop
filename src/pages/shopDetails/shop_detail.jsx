import { Swiper, SwiperSlide } from "swiper/react";
import style from "../../component/style/Shopdetail.module.css"
import { React, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { Cartcontext } from "../../component/Context/cartContext/cartContext";
import Button from "../../component/Button/button";
import BtnLoading from "../../component/loading/BtnLoading";
import MyAlert from "../../component/PopUp/myAlert";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import useFetch from "./useShopFetch";
import ProductInfo from "./productInfo";
function ShopDetail() {
    console.log("ShopDetails rendered ")
    // variable for images thumbnails 
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // variable for loading 
    const [is_Loading, setIs_loading] = useState(false);
    const { AddProductToCart, RemoveFromCart, cart } = useContext(Cartcontext); // getting the function from usecontext
    // iniatialize product to localstorage
    const [product, setproduct] = useState({
        uuid: 1,
        id: 0,
        instock: 0,
        name: "",
        quantity: "",
        sub_total: "",
        price: "",
        is_added: "",
        image: ""
    })
    // varialable for alert box
    const [alert, setAlert] = useState({
        show: false,
        success: false,
        children: ""
    })
    // the data contains the data from useShopFetch.jsx in useShopFetch we use fetch for fetching data from database
    const [data] = useFetch() // after fetching the data will be store in productdetails
    const Id = data.Id_phone // getting the Id of product after getting the product from useShopFetch
    // itemFound_lst takes his value from localstorage where the data where the id match
    const itemFound_lst = cart.find(item => item.id === Id) // this is the current item 
    const [quantity, setQuantity] = useState(itemFound_lst ? itemFound_lst.quantity : 0) // quantity of current item
    // Total of current item
    const total = useMemo(() => {
        return quantity * data.Price
    }, [quantity, data])
    // Price of current item
    const Price = data.Price
    // ------------getting the value of is_added in cartContext and usemomo to update it of any changing 
    const is_added = useMemo(() => {
        return itemFound_lst ? itemFound_lst.is_added : false
    }, [cart, itemFound_lst])
    // update the product of anychanging 
    useEffect(() => {
        setproduct((prev) => {
            return { ...prev, id: Id, instock: data.Quantity, name: data.Name, image: data.Image_Name, uuid: data.uuid, quantity: quantity, sub_total: total, price: Price, is_added: true }
        })
    }, [quantity, total])
    // update quantity of any change 
    useEffect(() => {
        setQuantity(itemFound_lst?.quantity ? itemFound_lst.quantity : 0)
    }, [itemFound_lst, cart])
    // the function AddProductToCart and RemoveFromCart is from CartContext and then use the alert box
    const AddCart = () => {
        AddProductToCart(product)
        setIs_loading(true)
        setTimeout(() => {
            setIs_loading(false)
            toast.success(("Item Added to card \n "), {
                style: {
                    padding: '20px',
                    color: 'green',
                },
                iconTheme: {
                    primary: "green",
                }
            })
        }, 700);
    }
    const RemoveCart = () => {
        RemoveFromCart(Id)
        setIs_loading(true)
        setTimeout(() => {
            setIs_loading(false)
            toast.success(("Item Deleted from card \n "), {
                style: {
                    padding: '20px',
                    color: 'red',
                },
                iconTheme: {
                    primary: "red",
                }
            })
        }, 700);
    }
    // image is getting in type object so we should parse it and then use map to be display
    const images = data?.Image_Name ? JSON.parse(data.Image_Name) : []
    if (!product) {
        return null; // not found yet or invalid ID
    }
    return (
        <>
            <div><Toaster position="top-right"
                reverseOrder={false} className="min-h-14" /></div>
            <Navbar />
            <section className={style.shop_details}>
                <div className={style.shop_container}>
                    <div className={style.productDesc}>
                        <div className={style.image}>
                            {/* images swiper */}
                            <Swiper spaceBetween={30} thumbs={{ swiper: thumbsSwiper }} slidesPerView={1} modules={[Navigation, Thumbs]}>
                                {
                                    images.map((image, index) => (
                                        <SwiperSlide className={style.swiper} key={index}><img className={style.img} src={`http://localhost:7000/public/upload/Product_img/${image}`} alt={`Product image ${index + 1}`}></img></SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            {/* thumbnail swiper */}
                            <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} slidesPerView={4} spaceBetween={10} watchSlidesProgress className={style.thumbContainer}>
                                {images.map((img, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className={style.thumbSwiper}
                                    >
                                        <img
                                            src={`http://localhost:7000/public/upload/Product_img/${img}`}
                                            className=""
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {

                            <div className={style.content} key={data.Id_phone}>
                                {/*  show Name */}
                                <h1>{data.Name}</h1>
                                {/*  show Description */}
                                <p><span> {data.Description}</span></p>
                                {/*  show Price */}
                                {data.Price ?
                                    <p>Price :
                                        <span className=" text-[var(--bg-color-primary)] text-3xl mr-3"> GHS {data.Promot_Price}</span>
                                        <span className={`${data.Promot_Price ? " text-gray-400 line-through mr-3" : null}`}>{data.Price} </span></p>
                                    : null
                                }
                                <div className="my-3">
                                    {data.Quantity > 0 ? (
                                        <span className="inline-block px-3 py-1 text-sm bg-green-500 text-white rounded-full">
                                            In stock ({data.Quantity} available)
                                        </span>
                                    ) : (
                                        <span className="inline-block px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                                            Out of stock
                                        </span>
                                    )}
                                </div>
                                {/* button for handle Quantity (increase and derease) */}
                                <div className={style.quantity}>
                                    <p>Quantity :<span> {quantity} </span></p>
                                    <div className={style.qtn_btn}>
                                        <button type="button" onClick={() => setQuantity(data.Quantity > quantity ? quantity + 1 : quantity)}> < FaPlus /></button>
                                        <button type="button" onClick={() => setQuantity(Math.max(0, quantity - 1))}> < FaMinus /></button>
                                    </div>
                                </div>
                                {/* ------total */}
                                <div className="">
                                    <p>Total : <span>{total}</span></p>
                                </div>
                                <div className="text-center">
                                    {
                                        is_added ?
                                            <Button
                                                disabled={is_Loading}
                                                children={is_Loading ? <BtnLoading /> : ' Remove to Card'}
                                                className={`${style.btn} h-10 overflow-hidden content-center ${!is_Loading ? " bg-red-900 hover:bg-red-600 text-red-300" : "bg-[var(--btn-color)] hover:bg-[var(--bg-color-primary)] text-white"}`}
                                                onClick={() => RemoveCart()}
                                            />
                                            :
                                            <Button
                                                disabled={quantity <= 0 && !is_added || is_Loading}
                                                children={is_Loading ? <BtnLoading /> : "Add to Card"}
                                                className={`${style.btn} h-10 overflow-hidden content-center bg-[var(--btn-color)] hover:bg-[var(--bg-color-primary)]`}
                                                onClick={() => AddCart()}
                                            />
                                    }

                                </div>
                                <div className="absolute md:bottom-0 inline-block">
                                    <Link to="/" className="flex items-center gap-2">Continue Shopping <FaArrowLeft className="" /></Link>
                                </div>
                            </div>

                        }
                        <MyAlert
                            show={alert.show}
                            onClose={() =>
                                setAlert((prev) => ({ ...prev, show: false }))}
                            children={alert.children}
                            success={alert.success}
                        />
                    </div>
                    {
                        <div className="mt-5 min-h-9">
                            <ProductInfo product={data} />
                        </div>
                    }
                </div>
            </section>
            <footer>
                <Footer />
            </footer>
        </>
    )
}
export default ShopDetail;