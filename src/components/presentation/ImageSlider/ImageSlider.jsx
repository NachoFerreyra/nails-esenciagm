import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import foto1 from "@/assets/foto1.jpg";
import foto2 from "@/assets/foto2.jpg";
import foto3 from "@/assets/foto3.jpg";
import foto4 from "@/assets/foto4.jpg";
import heroImage from "@/assets/nails-hero.png";
import styles from "./ImageSlider.module.scss";

const IMAGES = [
  { src: heroImage, alt: "Manicura elegante en tonos suaves" },
  { src: foto1, alt: "Diseño de uñas 1" },
  { src: foto2, alt: "Diseño de uñas 2" },
  { src: foto3, alt: "Diseño de uñas 3" },
  { src: foto4, alt: "Diseño de uñas 4" },
];

const ImageSlider = () => {
  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={900}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        className={styles.slider__swiper}
      >
        {IMAGES.map((img, i) => (
          <SwiperSlide key={i} className={styles.slider__slide}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fades laterales decorativos */}
      <div className={styles["slider__fade--left"]} />
      <div className={styles["slider__fade--right"]} />
    </div>
  );
};

export default ImageSlider;
