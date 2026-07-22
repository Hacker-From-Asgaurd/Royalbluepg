import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaBus, FaSubway } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import { Link } from 'react-router-dom';

const contactInfo = [
  { icon: FaPhoneAlt, label: 'Call Us', value: '+91 99238 05090', href: 'tel:+919923805090' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 99238 05090', href: 'https://wa.me/919923805090' },
  { icon: FaEnvelope, label: 'Email Us', value: 'prasadchavanlic@gmail.com', href: 'mailto:prasadchavanlic@gmail.com' },
  { icon: FaClock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM', href: null },
];

const nearbyPlaces = [
  { icon: FaMapMarkerAlt, label: 'Dr. D Y Patil Medical College', distance: '160 m' },
  { icon: FaSubway, label: 'Sant Tukaram Nagar Metro Station', distance: '1.4 km' },
  { icon: FaBus, label: 'Vallabh Nagar Bus Stand', distance: '1.3 km' },
  { icon: FaMapMarkerAlt, label: 'Dr. D Y Patil Engineering College', distance: '450 m' },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-light-bg border-none">
      <div className="container-custom">
        <SectionHeader
          title="Contact Us"
          subtitle="Get in touch with us for room enquiries, availability, or any other questions."
        />

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-5 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Get In Touch</h3>
              
              <div className="space-y-4 mb-6">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                      <info.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm text-gray-800 hover:text-primary-500 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-sm text-gray-800">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0 mt-1">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-semibold text-sm text-gray-800 mb-1">
                      ROYAL BLUE PG, 458/2554, Sant Tukaram Nagar,<br />
                      behind APJ ABDUL KALAM GARDEN, Dr. D Y Patil Medical College<br />
                      Road ,Pimpri-Chinchwad, Maharashtra-411018
                    </p>
                    <a href="https://maps.app.goo.gl/QVzSq3EiaJe2cATu9" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-500 hover:underline">
                      Get Directions / View on Map →
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-100">
                <Link to="/enquiry" className="btn-primary flex-1 text-center">
                  Enquire Now
                </Link>
                <a href="tel:+919923805090" className="btn-outline flex-1 text-center">
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map + Nearby */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Map */}
            <div className="w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden glass-card shadow-lg p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.3!2d73.8199264!3d18.6253126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f402e75e0d%3A0x1fe78662262b1b16!2sROYAL+BLUE+PG!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              />
            </div>

            {/* Nearby Distances */}
            <div className="glass-card p-5 md:p-6">
              <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-500" /> Nearby Landmarks
              </h4>
              <div className="space-y-3">
                {nearbyPlaces.map((place, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0">
                        <place.icon size={15} />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{place.label}</span>
                    </div>
                    <span className="text-sm font-bold text-primary-500 shrink-0">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
