import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import video1 from '../assets/images/video 1.mp4';

import heroBg from '../assets/images/hero-bg.jpeg';
import build1 from '../assets/images/build 1.jpeg';
import build2 from '../assets/images/build 2.jpeg';
import build3 from '../assets/images/build 3.jpeg';
import build4 from '../assets/images/build 4.jpeg';
import build5 from '../assets/images/build 5.jpeg';
import build6 from '../assets/images/build 6.jpeg';
import build7 from '../assets/images/build 7.jpeg';
import build8 from '../assets/images/build 8.jpeg';
import build9 from '../assets/images/build 9.jpeg';
import build10 from '../assets/images/build 10.jpeg';
import build11 from '../assets/images/build 11.jpeg';
import build12 from '../assets/images/build 12.jpeg';
import kitchen1 from '../assets/images/kitchen 1.jpeg';
import kitchen2 from '../assets/images/kitchen 2.jpeg';
import kitchen3 from '../assets/images/kitchen 3.jpeg';
import wash1 from '../assets/images/wash 1.jpeg';
import wash2 from '../assets/images/wash 2.jpeg';
import room1 from '../assets/images/room 1.jpeg';
import room2 from '../assets/images/room 2.jpeg';
import room3 from '../assets/images/room 3.jpeg';
import room4 from '../assets/images/room 4.jpeg';
import room5 from '../assets/images/room 5.jpeg';
import room6 from '../assets/images/room 6.jpeg';

const ALL_IMAGES = [
  { id: 1, src: build1, category: 'Building', caption: 'Building' },
  { id: 2, src: build2, category: 'Building', caption: 'Building' },
  { id: 3, src: build3, category: 'Building', caption: 'Building' },
  { id: 4, src: build4, category: 'Building', caption: 'Building' },
  { id: 13, src: kitchen1, category: 'Kitchen', caption: 'Kitchen' },
  { id: 14, src: kitchen2, category: 'Kitchen', caption: 'Kitchen' },
  { id: 15, src: kitchen3, category: 'Kitchen', caption: 'Kitchen' },
  { id: 16, src: wash1, category: 'Washroom', caption: 'Washroom' },
  { id: 17, src: wash2, category: 'Washroom', caption: 'Washroom' },
  { id: 18, src: room1, category: 'Rooms', caption: 'Room' },
  { id: 19, src: room2, category: 'Rooms', caption: 'Room' },
  { id: 20, src: room3, category: 'Rooms', caption: 'Room' },
  { id: 21, src: room4, category: 'Rooms', caption: 'Room' },
  { id: 22, src: room5, category: 'Rooms', caption: 'Room' },
  { id: 23, src: room6, category: 'Rooms', caption: 'Room' },
  { id: 5, src: build5, category: 'Building', caption: 'Building' },
  { id: 6, src: build6, category: 'Building', caption: 'Building' },
  { id: 7, src: build7, category: 'Building', caption: 'Building' },
  { id: 8, src: build8, category: 'Building', caption: 'Building' },
  { id: 9, src: build9, category: 'Building', caption: 'Building' },
  { id: 10, src: build10, category: 'Building', caption: 'Building' },
  { id: 11, src: build11, category: 'Building', caption: 'Building' },
  { id: 12, src: build12, category: 'Building', caption: 'Building' },
];

const CATEGORIES = ['All', 'Building', 'Rooms', 'Kitchen', 'Washroom', 'Video'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Filter images based on selected category
  const baseImages = activeCategory === 'All' ? ALL_IMAGES : activeCategory === 'Video' ? [] : ALL_IMAGES.filter(img => img.category === activeCategory);
  const showVideo = activeCategory === 'All' || activeCategory === 'Video' || activeCategory === 'Washroom';

  // Build mixed list: for All, insert video at position 9 (index 8)
  const mixedList = (() => {
    if (!showVideo) return baseImages.map(img => ({ ...img, type: 'image' }));
    const items = baseImages.map(img => ({ ...img, type: 'image' }));
    const videoItem = { id: 'video', type: 'video' };
    if (activeCategory === 'All') {
      items.splice(8, 0, videoItem);
      return items;
    }
    return [...items, videoItem];
  })();

  const onInit = useCallback((detail) => {
    if (detail) {
      // lg instance is ready
    }
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-light-bg dark:bg-dark-bg">
      <div 
        className="h-64 relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="overlay-gradient" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-gray-200">Explore the premium facilities at Royal Blue PG</p>
        </div>
      </div>

      <div className="container-custom py-16">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-md scale-105'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border border border-gray-200 dark:border-dark-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          mode="lg-fade"
          download={false}
          elementClassNames="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {mixedList.map((item, index) =>
            item.type === 'video' ? (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative group rounded-2xl overflow-hidden glass-card shadow-sm hover:shadow-xl transition-all duration-300 aspect-square w-full"
              >
                <video
                  src={video1}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.a
                key={item.id}
                href={item.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                data-src={item.src}
                data-sub-html={`<h4>${item.caption}</h4><p>${item.category}</p>`}
                className="block relative group rounded-2xl overflow-hidden glass-card shadow-sm hover:shadow-xl transition-all duration-300 aspect-square w-full"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-4 py-2 bg-black/50 backdrop-blur rounded-full border border-white/20">
                    View
                  </span>
                </div>
              </motion.a>
            )
          )}
        </LightGallery>

        {mixedList.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No items found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
