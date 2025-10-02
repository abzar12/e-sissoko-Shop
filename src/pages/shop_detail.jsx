import { Swiper, SwiperSlide } from "swiper/react";
import "../component/style/Shopdetail.css"
import { React, useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSearchParams } from "react-router-dom";
import Button from "../component/Button/button";
function ShopDetail() {
    const [searchParams] = useSearchParams();
    const Id = searchParams.get("Id")
    const [productdetails, setProductDetails] = useState([])
    const swiper = useSwiper();
    useEffect(async () => {
        try {
            const res = await fetch(`http://localhost:5330/shop/product-detail?Id=${Id}`);
            if (!res.ok) {
                throw new Error(`Couldn't fetch data from API ${res.status}`);
            }
            const data = await res.json();
            setProductDetails(data);
        } catch {

        }

    }, [])
    return (
        <>
            <section className="shop-details">
                <div className="container">
                    <div className="productDesc">
                        <div className="image">
                            <Swiper spaceBetween={30} pagination={{ clickable: true }} slidesPerView={1} autoplay={{ delay: 6000 }} modules={[Navigation, Pagination, Autoplay]}>
                                <SwiperSlide><img src="/image/hero1.jpg" alt="Slide 1"></img></SwiperSlide>
                                <SwiperSlide><img src="/image/hero2.jpg" alt="Slide 2"></img></SwiperSlide>
                                <SwiperSlide><img src="/image/hero3.jpg" alt="Slide 3"></img></SwiperSlide>
                                <SwiperSlide><img src="/image/hero4.jpg" alt="Slide 3"></img></SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="">
                            {productdetails}
                            <h1>Lorem ipsum dolor sit amet quod possimus distinctio nesciunt culpa fugiat?</h1>
                            <p><span>Brand : </span>Lorem, ipsum dolor.</p>
                            <p><span>Quantity : </span>7</p>
                            <div className="">
                                <Button children="Add to Card" className="btn" />
                            </div>
                        </div>
                    </div>

                    <div className="">

                    </div>
                </div>
            </section>
        </>
    )
}
export default ShopDetail;