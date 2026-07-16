import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { FaCheckCircle } from 'react-icons/fa';

import heroBg from '../../assets/images/hero-bg.jpeg';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center pt-20">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {/* We only have one image, but in reality this could be an array of images */}
          <SwiperSlide>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBg})` }}
            >
              <div className="overlay-gradient" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-premium"
          >
            ROYAL BLUE <span className="text-accent-500">PG</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-3xl text-gray-200 mb-6 md:mb-10 max-w-2xl font-light"
          >
            Premium Girls Hostel with Safe, Comfortable & Affordable Living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-8 md:mb-12"
          >
            <Link to="/enquiry" className="btn-primary text-sm md:text-lg flex-1 sm:flex-none text-center">
              Enquire Now
            </Link>
            <Link to="/gallery" className="btn-glass text-sm md:text-lg flex-1 sm:flex-none text-center">
              View Gallery
            </Link>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
