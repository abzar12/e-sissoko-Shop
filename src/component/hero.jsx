import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./Navbar";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    { src: "/image/hero1.jpg", alt: "Fresh products on display" },
    { src: "/image/hero2.jpg", alt: "Shop local produce" },
    { src: "/image/hero3.jpg", alt: "Fast delivery" },
    { src: "/image/hero4.jpg", alt: "Happy customers" },
];

function Hero({onSearch}) {
    return (
        <header className="relative w-full">
            <Navbar onSearch={onSearch}/>

            <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop
                    slidesPerView={1}
                    className="h-full"
                >
                    {slides.map((s, idx) => (
                        <SwiperSlide key={idx} className="h-full">
                            <div
                                className="h-full w-full bg-center bg-cover flex items-center"
                                style={{ backgroundImage: `url(${s.src})` }}
                                role="img"
                                aria-label={s.alt}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

                                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 lg:px-16 flex items-center h-full">
                                    <div className="text-white max-w-xl">
                                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
                                            Discover quality products. Delivered fast.
                                        </h1>
                                        <p className="mt-4 text-sm md:text-base text-white/90">
                                            Shop from local vendors, enjoy secure checkout and quick delivery — all in one place.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </header>
    );
}

export default Hero;