import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaHeart, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/#about' },
  { name: 'Amenities', href: '/#amenities' },
  { name: 'Contact', href: '/#contact' },
];

const amenityLinks = ['AC Rooms', 'WiFi', 'CCTV', 'Power Backup', 'Kitchen', 'Daily Cleaning'];

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/royalbluepg?igsh=OXNhd2Q2azJ0bDlr', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: FaBuilding, href: 'https://www.magicbricks.com/propertyDetail/royal-blue-pg-pimpri-in-pune&pgid=4d42353436393933677261646532', label: 'MagicBricks', color: 'hover:text-red-400' },
  { icon: FaWhatsapp, href: 'https://wa.me/919923805090', label: 'WhatsApp', color: 'hover:text-green-500' },
  { icon: FaEnvelope, href: 'mailto:prasadchavanlic@gmail.com', label: 'Email', color: 'hover:text-red-400' },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-900 to-[#0a0f2e] text-white">
      {/* Main footer */}
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-1">Royal Blue PG</h3>
            <p className="text-accent-400 text-xs mb-4">Premium Girls Hostel</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium accommodation exclusively for girls. Safe, comfortable, and affordable living with modern amenities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 ${social.color}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent-500 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent-400 text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent-500 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-lg font-semibold mb-5 relative">
              Amenities
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent-500 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {amenityLinks.map((amenity) => (
                <li key={amenity}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent-500 rounded-full" />
                    {amenity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5 relative">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent-500 rounded-full" />
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-accent-400 mt-0.5">📍</span>
                ROYAL BLUE PG, 458/2554, COLLEGE ROAD, behind APJ ABDUL KAMAL GARDEN, Sant Tukaram Nagar, Pimpri Colony, Pimpri-Chinchwad, Maharashtra 411018
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-400">📞</span>
                <a href="tel:+919923805090" className="hover:text-accent-400 transition-colors">+91 99238 05090</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-400">✉️</span>
                <a href="mailto:prasadchavanlic@gmail.com" className="hover:text-accent-400 transition-colors">prasadchavanlic@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-400">🕐</span>
                Mon-Sat: 9AM - 7PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex justify-center">
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Made with <FaHeart className="text-red-500 text-xs" /> Team Diamond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
