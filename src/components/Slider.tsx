import { ReactNode } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Slider({ list = [] }: { list: ReactNode[] }) {
  return (
    <>
      <Swiper
      
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper my-4"
      >
        {list.map((item, index) => (
          <SwiperSlide className="rounded-lg" key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
