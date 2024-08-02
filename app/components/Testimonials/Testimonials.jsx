"use client"

import Image from "next/image"
import { EffectCoverflow, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { testimonials } from "app/utils/testimonials"
import "swiper/css"
import "swiper/css/pagination"
import "./Testimonials.css"

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="gradient-bg relative flex items-center justify-center overflow-hidden py-20 sm:px-0"
    >
      <Swiper
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        effect={"coverflow"}
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <div className="relative flex min-h-[500px] w-full flex-col justify-around p-10 pt-24">
              <img
                src="/assets/icons/quote.png"
                alt=""
                width={60}
                height={60}
                className="absolute right-8 top-5 opacity-20"
              />
              <p>{testimonial.content}</p>
              <div className="mt-5 flex items-center">
                <div className="relative mr-3 h-16 w-16 overflow-hidden rounded-full ">
                  <Image
                    className="absolute left-0 top-0 h-[100%] w-full object-cover"
                    quality={100}
                    src={testimonial.image}
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className="leading-5">{testimonial.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials
