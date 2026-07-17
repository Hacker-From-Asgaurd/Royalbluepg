import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';

const MOCK_TESTIMONIALS = [
  { _id: '1', name: 'Marcus Tribhuvan', rating: 5, review: 'This is one of the finest PGs for girls. Superb Amenities with highest quality service from the owner Prasad. Communication and People treatment is of top rated. Peaceful area and hospitality at it is very best. Simply the best in entire Pimpri Chinchwad.' },
  { _id: '2', name: 'Nutan Shewale', college: 'Dr D Y Patil', rating: 5, review: 'The location is convenient, with colleges, shops, and public transport nearby. Overall, it is an excellent place to stay for students and working professionals.' },
  { _id: '3', name: 'Anushka Thorat', college: 'Dr D Y Patil', rating: 4, review: 'The rooms are clean, spacious, and well-maintained. The atmosphere is safe and comfortable, especially for girls.' },
];

const Testimonials = () => {
  const [testimonials] = useState(MOCK_TESTIMONIALS);

  return (
    <section className="section-padding bg-light-bg dark:bg-dark-bg border-none">
      <div className="container-custom">
        <SectionHeader
          title="What Our Residents Say"
          subtitle="Read the experiences of girls who call Royal Blue PG their second home."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id} className="h-auto">
                <div className="glass-card p-8 h-full flex flex-col relative border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-card-hover transition-all duration-300">
                  <FaQuoteLeft className="text-4xl text-primary-100 dark:text-dark-bg absolute top-6 right-6" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-6 text-accent-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < testimonial.rating ? '' : 'text-gray-300 dark:text-gray-600'} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 dark:text-gray-300 italic mb-8 flex-1 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.college}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
