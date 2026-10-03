import React, { useState } from 'react';
import { Heart, Sparkles, PlusCircle } from 'lucide-react';
import { CONFIG } from '../data/config';
import { playCardFlip, playPop } from '../utils/sound';

const PhotoGallery = () => {
  const [memories, setMemories] = useState(CONFIG.memories);
  const [flippedId, setFlippedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCardClick = (id) => {
    playCardFlip();
    setFlippedId(flippedId === id ? null : id);
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playPop();
    const newMemory = {
      id: Date.now(),
      title: newTitle,
      date: "Special Memory",
      description: newDesc || "A precious moment locked in our hearts forever. 💖",
      bgGradient: "from-pink-500 to-rose-400",
      emoji: "✨"
    };
    setMemories([...memories, newMemory]);
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <section className="glass-card p-6 sm:p-10 rounded-3xl border border-pink-500/30 max-w-4xl mx-auto my-2 text-center flex flex-col items-center justify-center">
      <h2 className="font-dancing text-5xl sm:text-6xl font-bold text-white mb-2 glow-text text-center">
        Our Special Memories 📸
      </h2>
      <p className="text-sm sm:text-base text-pink-100/90 mb-6 font-medium text-center">
        Tap any card to flip it over and read the special note! ✨
      </p>

      {/* Grid of Polaroid Memory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {memories.map((mem) => {
          const isFlipped = flippedId === mem.id;
          return (
            <div
              key={mem.id}
              onClick={() => handleCardClick(mem.id)}
              className="h-68 sm:h-72 rounded-2xl cursor-pointer perspective-1000 transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center"
            >
              <div
                className={`w-full h-full rounded-2xl transition-all duration-500 p-5 flex flex-col justify-between items-center shadow-xl text-center ${
                  isFlipped 
                    ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-pink-950 border-2 border-pink-400 text-center' 
                    : `bg-gradient-to-br ${mem.bgGradient} border border-white/30 text-center`
                }`}
              >
                {!isFlipped ? (
                  <>
                    <div className="w-14 h-14 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                      {mem.emoji}
                    </div>
                    <div>
                      <h3 className="font-fredoka text-xl font-bold text-white mb-1.5 drop-shadow text-center">
                        {mem.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-black/20 text-pink-100 text-center">
                        {mem.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 font-medium text-center">
                      (Tap to flip 🔄)
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-pink-500/30 pb-2 w-full">
                      <span className="font-dancing text-2xl font-bold text-pink-300 text-center w-full">
                        {mem.title}
                      </span>
                      <Heart className="w-5 h-5 text-pink-400 fill-pink-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed font-medium text-center">
                      {mem.description}
                    </p>
                    <span className="text-xs text-pink-300/80 text-center w-full">
                      Tap again to flip back
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Memory Button */}
      <div className="mt-8 flex justify-center w-full">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-sm sm:text-base font-semibold border border-pink-400/30 flex items-center justify-center space-x-2 mx-auto"
        >
          <PlusCircle className="w-5 h-5 text-pink-300" />
          <span>Add Custom Memory Card ✨</span>
        </button>
      </div>

      {/* Modal for adding memory */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddMemory} className="glass-card max-w-md w-full p-6 text-center border-pink-400/50 space-y-4 flex flex-col items-center justify-center">
            <h3 className="font-fredoka text-xl font-bold text-white flex items-center justify-center space-x-2 text-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Create New Memory Card</span>
            </h3>
            <div className="w-full text-center">
              <label className="block text-xs sm:text-sm font-semibold text-pink-200 mb-1 text-center">Memory Title</label>
              <input
                type="text"
                placeholder="e.g. Our First Date 🍦"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm border border-pink-500/30 outline-none focus:border-pink-400 text-center"
                required
              />
            </div>
            <div className="w-full text-center">
              <label className="block text-xs sm:text-sm font-semibold text-pink-200 mb-1 text-center">Special Note / Memory</label>
              <textarea
                placeholder="Write a sweet message or memory details..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm border border-pink-500/30 outline-none focus:border-pink-400 text-center"
              />
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm text-pink-200 bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm text-white font-semibold bg-pink-600 hover:bg-pink-500 shadow-lg"
              >
                Add Card 💖
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
