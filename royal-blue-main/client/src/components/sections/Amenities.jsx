import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as FaIcons from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';

const defaultAmenities = [
  { name: 'Air Conditioned Rooms', icon: 'TbAirConditioning' },
  { name: 'Kitchen', icon: 'MdKitchen' },
  { name: 'RO Water (Aquaguard)', icon: 'MdWaterDrop' },
  { name: 'Washing Machine', icon: 'MdLocalLaundryService' },
  { name: 'Refrigerator', icon: 'TbFridge' },
  { name: 'Attached Washroom', icon: 'FaBath' },
  { name: 'Cupboard', icon: 'MdStorage' },
  { name: 'Study Table', icon: 'MdTableBar' },
  { name: 'Chair', icon: 'MdChair' },
  { name: 'High-Speed WiFi', icon: 'FaWifi' },
  { name: 'Geyser', icon: 'MdHotTub' },
  { name: 'CCTV', icon: 'MdVideocam' },
  { name: 'Power Backup', icon: 'MdBolt' },
  { name: 'Daily Room Cleaning', icon: 'MdCleaningServices' },
  { name: 'Biometric Entry', icon: 'MdFingerprint' },
  { name: 'Double Sharing Rooms', icon: 'MdBed' },
];

const getIcon = (iconName) => {
  const Icon = Icons[iconName] || TbIcons[iconName] || FaIcons[iconName] || Icons.MdCheckCircle;
  return <Icon className="text-4xl text-primary-500 group-hover:text-white transition-colors duration-300" />;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Amenities = () => {
  // In a real app we'd fetch this from API, for now use default seeded amenities
  const [amenities] = useState(defaultAmenities);

  return (
    <section id="amenities" className="section-padding bg-white dark:bg-dark-card border-none">
      <div className="container-custom">
        <SectionHeader
          title="Premium Amenities"
          subtitle="We provide top-class facilities to ensure a comfortable and hassle-free stay for all our residents."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-light-bg dark:bg-dark-bg rounded-2xl p-3 md:p-6 text-center border border-gray-100 dark:border-dark-border hover:bg-primary-500 hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-card-hover cursor-pointer"
            >
              <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 bg-white dark:bg-dark-card rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-primary-400 transition-colors duration-300">
                {getIcon(amenity.icon)}
              </div>
              <h3 className="font-semibold text-xs md:text-sm text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors duration-300">
                {amenity.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
