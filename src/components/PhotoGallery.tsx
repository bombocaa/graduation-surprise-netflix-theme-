import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { useStory } from '../context/StoryContext';
import type { GalleryPhoto } from '../data/types';
import { LightboxModal } from './LightboxModal';

type CategoryFilter = 'all' | 'childhood' | 'school' | 'family' | 'graduation';

export const PhotoGallery: React.FC = () => {
  const { storyData, setActiveGalleryPhoto } = useStory();
  const { gallery } = storyData;
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredPhotos = filter === 'all' ? gallery : gallery.filter((p) => p.category === filter);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Moments' },
    { key: 'childhood', label: 'Childhood' },
    { key: 'school', label: 'School & College' },
    { key: 'family', label: 'Family Time' },
    { key: 'graduation', label: 'Graduation' }
  ];

  return (
    <section id="gallery" className="py-16 px-4 md:px-12 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>PHOTO ARCHIVES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Documentary Stills & Memories
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filter === cat.key
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-900/50'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo: GalleryPhoto, index: number) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveGalleryPhoto(photo)}
              className="break-inside-avoid bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-600/60 shadow-lg cursor-pointer group relative transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                  {photo.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">{photo.title}</h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-1 italic font-serif">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LightboxModal />
    </section>
  );
};
