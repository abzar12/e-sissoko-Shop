import React, { useRef } from "react"
import Button from "../Button/button";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import "./ProductCard.css"
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css';
import { IoMdHelpCircle } from "react-icons/io";
function ProductCardSlide({ title, Products, auth, reverse, icon,titleClass }) {
    const swiperRef = useRef(null);
    return (
        <>
            <div className="container-slide">
                <h1 className={`title flex justify-center ${titleClass}`}> {icon} {title}</h1>
                <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)} spaceBetween={10} breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10, }, 640: { slidesPerView: 2, spaceBetween: 15, }, 768: { slidesPerView: 3, spaceBetween: 20, }, 1024: {   slidesPerView: 4,   spaceBetween: 25, }, 1280: {   slidesPerView: 6,   spaceBetween: 30, },
                }} autoplay={{ delay: 2000, reverseDirection: `${reverse}` }} modules={[Autoplay, Pagination, Navigation]} className="ac_Items slide p-5">
                    {
                        Products.map((prod, index) => (
                            <SwiperSlide key={index} className="items">
                                <div className="card-image slide">
                                    {
                                        prod.Image_Name
                                            ?
                                            <Link to={`/product/product-detail?${prod.Id_phone}`}>
                                                <img src={`http://localhost:5330/public/img/${prod.Image_Name}`} alt={prod.Image} />
                                            </Link>
                                            :
                                            <div className="Image_Erro w-full h-full flex items-center justify-center bg-gray-100">
                                                < IoMdHelpCircle className="text-gray-400 w-16 h-16" />
                                            </div>
                                    }

                                </div>
                                <div className="ac_textItem m-0">
                                    <p className="Prod-title">{prod.Name}</p>
                                    {/* <p className="desc">{prod.Description}</p> */}
                                    <p className="price"><span> Price:</span>{prod.Promot_Price ? prod.Promot_Price : prod.Price} GHS </p>
                                    <p className="price"> <span className="special">{prod.Promot_Price ? prod.Price + " GHS" : ""} </span></p>
                                    {
                                        (prod.Promot_Price || prod.Promot_Price < 0) && (
                                            <div className="PromoContent">
                                                <h1>Promotion</h1>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="card_btn">
                                    <Link to={auth ? `/product/edit-product?Id=${prod.Id_phone}` : `/shop/product-detail?Id=${prod.Id_phone}`} >
                                        <Button type="button" children={auth ? "Edit Product" : "Add to Cart"} />
                                    </Link>
                                </div>
                            </SwiperSlide>

                        ))
                    }
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute top-1/2 left-0 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition"
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute top-1/2 right-0 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition"
                    >
                        <FaArrowRight />
                    </button>
                </Swiper>
            </div>
        </>
    )
}
export default ProductCardSlide;