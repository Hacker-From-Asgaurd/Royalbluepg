import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import { Link } from 'react-router-dom';

const contactInfo = [
  { icon: FaPhoneAlt, label: 'Call Us', value: '+91 99238 05090', href: 'tel:+919923805090' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 99238 05090', href: 'https://wa.me/919923805090' },
  { icon: FaEnvelope, label: 'Email Us', value: 'kanhakanha1202@gamil.com', href: 'mailto:kanhakanha1202@gamil.com' },
  { icon: FaClock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM', href: null },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-light-bg dark:bg-dark-bg border-none">
      <div className="container-custom">
        <SectionHeader
          title="Contact Us"
          subtitle="Get in touch with us for room enquiries, availability, or any other questions."
        />

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start lg:items-center">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-5 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-white">Get In Touch</h3>
              
              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary-50 dark:bg-dark-bg flex items-center justify-center text-primary-500 shrink-0">
                      <info.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary-50 dark:bg-dark-bg flex items-center justify-center text-primary-500 shrink-0 mt-1">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 mb-1">
                      ROYAL BLUE PG, 458/2554, COLLEGE ROAD, <br />
                      behind APJ ABDUL KAMAL GARDEN, Sant Tukaram Nagar, Pimpri Colony, <br />
                      Pimpri-Chinchwad, Maharashtra 411018 
                    </p>
                    <a href="https://maps.app.goo.gl/QVzSq3EiaJe2cATu9" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-500 hover:underline">
                      Get Directions / View on Map →
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 dark:border-dark-border">
                <Link to="/enquiry" className="btn-primary flex-1 text-center">
                  Enquire now
                </Link>
                <a href="tel:+919923805090" className="btn-outline flex-1 text-center">
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          {/* Google Map Mock */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[300px] sm:h-[400px] lg:h-[550px]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden glass-card shadow-lg p-2">
              {/* Replace src with actual google maps embed URL in production */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.3!2d73.8199264!3d18.6253126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f402e75e0d%3A0x1fe78662262b1b16!2sROYAL+BLUE+PG!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
