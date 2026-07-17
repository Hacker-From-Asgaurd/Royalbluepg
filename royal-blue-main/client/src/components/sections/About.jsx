import { motion } from 'framer-motion';
import aboutImg from '../../assets/images/about.png';

const About = () => {
  return (
    <section id="about" className="section-padding bg-light-bg">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={aboutImg}
                alt="About Royal Blue PG"
                className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-primary-500">Royal Blue PG</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mb-8" />
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed text-balance">
              Royal Blue PG provides premium accommodation exclusively for girls. We focus on safety, hygiene, comfort, and a peaceful environment for students and working professionals.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed text-balance">
              Our rooms are well maintained with modern amenities and 24×7 security. Experience a home away from home with our top-notch facilities and friendly management.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
