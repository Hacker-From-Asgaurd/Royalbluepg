import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

import kitchenImg from '../../assets/images/kitchen.png';
import washroomImg from '../../assets/images/washroom.png';
import aboutImg from '../../assets/images/build.jpeg';

const images = [
  { id: 1, src: kitchenImg, alt: 'Modern Kitchen', span: 'col-span-2 row-span-2' },
  { id: 2, src: washroomImg, alt: 'Clean Washroom', span: 'col-span-1 row-span-1' },
  { id: 3, src: aboutImg, alt: 'Building View', span: 'col-span-1 row-span-1' },
  { id: 4, src: aboutImg, alt: 'Study Area', span: 'col-span-2 row-span-1' },
];

const GalleryPreview = () => {
  return (
    <section className="section-padding bg-white dark:bg-dark-card border-none">
      <div className="container-custom">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Explore the elegant interiors, clean facilities, and modern infrastructure of Royal Blue PG."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] mb-12">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${img.span} relative group rounded-2xl overflow-hidden cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery" className="btn-outline">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
