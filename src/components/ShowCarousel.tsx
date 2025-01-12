"use client"

import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation } from "swiper/modules"
import { Pagination } from "swiper/modules"
import { Autoplay } from "swiper/modules"

export default function ShowCarousel() {
    return (
        <div className="px-24">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }}>
                <SwiperSlide>
                    <img src="https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/POWER%20YOUR%20GAMING%20WITH%20AMD%20CPUs.jpg" alt="1st image" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src=" https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/2.jpg" alt="2nd image" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src=" https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/3.jpg" alt="2nd image" className="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
        </div>

    )
}
