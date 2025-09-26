
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./Navbar";
import "./style/hero.css"
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Hero() {

    return (
        <>

            <div className="ac-nav relative h-[550px]">
                <Navbar />
                <div className="image-slide">
                    <Swiper spaceBetween={30} slidesPerView={1} autoplay={{ delay: 6000 }} modules={[Navigation, Pagination, Autoplay]}>
                        <SwiperSlide><img src="./image/hero1.jpg" alt="Slide 1"></img></SwiperSlide>
                        <SwiperSlide><img src="./image/hero2.jpg" alt="Slide 2"></img></SwiperSlide>
                        <SwiperSlide><img src="./image/hero3.jpg" alt="Slide 3"></img></SwiperSlide>
                        <SwiperSlide><img src="./image/hero4.jpg" alt="Slide 3"></img></SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </>
    )
}
export default Hero;