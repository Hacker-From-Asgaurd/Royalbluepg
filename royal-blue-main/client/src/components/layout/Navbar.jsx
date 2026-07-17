import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useScrollPosition } from '../../hooks/useAnimations';
import logoImage from '../../assets/images/logo.jpeg';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Amenities', href: '/#amenities' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-200'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImage}
              alt="Royal Blue PG logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg ring-2 ring-white/20"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Royal Blue
              </h1>
              <p className="text-xs -mt-1 text-gray-700">
                Premium PG
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-500/10 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <Link
              to="/enquiry"
              className="hidden md:inline-flex btn-primary text-sm !px-6 !py-2.5"
            >
              Enquire Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <Link
                to="/enquiry"
                className="block text-center btn-primary mt-3 !py-3"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
