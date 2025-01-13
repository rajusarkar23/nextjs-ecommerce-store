"use client"

import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation } from "swiper/modules"
import { Pagination } from "swiper/modules"
import { Autoplay } from "swiper/modules"
import Image from "next/image"

export default function ShowCarousel() {
    return (
        <div className="flex justify-center mt-4">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 2000, disableOnInteraction: false }}
                className="sm:w-[1000px] w-96 h-44"
            >
                <SwiperSlide>

                    <Image src={"https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/1.jpg"} height={250} width={900} alt="image" className="rounded shadow-lg" />

                </SwiperSlide>
                <SwiperSlide>

                    <Image src={"https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/2.jpg"} height={250} width={900} alt="image" className="rounded shadow-lg" />

                </SwiperSlide>
                <SwiperSlide>
                    <Image src={"https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/3.jpg"} height={250} width={900} alt="image" className="rounded shadow-lg" />

                </SwiperSlide>
            </Swiper>
        </div>

    )
}
