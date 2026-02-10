import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { Movie } from '../types';

interface StoryViewerProps {
  movie: Movie;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ movie, onClose }) => {
  const [progress, setProgress] = useState(0);

  // Auto-close after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose(); 
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col font-sans"
    >
      {/* Story Content */}
      <div className="relative flex-1 overflow-hidden">
         <motion.img 
            src={movie.thumbnail} 
            alt="Story"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear" }}
         />
         
         {/* Vignette */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

         {/* Header Controls */}
         <div className="absolute top-0 left-0 right-0 p-4 z-20 pt-8">
            {/* Progress Bar */}
            <div className="flex gap-1 mb-4">
               <div className="h-0.5 bg-white/20 flex-1 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
               </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-gold/50 p-0.5 bg-black/40 backdrop-blur">
                        <img src={movie.thumbnail} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white drop-shadow-md tracking-wide">{movie.title}</p>
                        <span className="text-[10px] text-gray-200 font-medium opacity-90">Just now</span>
                    </div>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} className="text-white drop-shadow-md" />
                </button>
            </div>
         </div>

         {/* Tap Areas for Navigation */}
         <div className="absolute inset-y-20 inset-x-0 z-10 flex">
             <div className="w-1/2 h-full" onClick={onClose} />
             <div className="w-1/2 h-full" onClick={onClose} />
         </div>

         {/* Footer Actions */}
         <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pb-10 flex flex-col gap-4">
            <p className="text-white text-center text-lg font-serif font-bold leading-tight drop-shadow-xl">
                {movie.description || "Tap to watch full movie"}
            </p>

            <button 
                onClick={onClose}
                className="w-full bg-white text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
                <Play size={18} fill="black" />
                WATCH NOW
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default StoryViewer;
