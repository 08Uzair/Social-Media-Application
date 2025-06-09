import React, { useEffect, useState } from "react";

const StoryViewer = ({ user, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const total = user.stories.length;

  // Auto-play every 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIdx < total - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIdx]);

  // Click zones: left → prev, right → next
  const handleClick = (e) => {
    const x = e.clientX;
    const width = window.innerWidth;

    if (x < width / 2) {
      // Left half
      if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
    } else {
      // Right half
      if (currentIdx < total - 1) setCurrentIdx(currentIdx + 1);
      else onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
      onClick={handleClick}
    >
      {/* Progress bars */}
      <div className="flex w-full max-w-md gap-1 p-4">
        {user.stories.map((_, i) => (
          <div key={i} className="relative flex-1 h-1 bg-white/30 rounded">
            <div
              className={`absolute top-0 left-0 h-full rounded transition-all duration-[3000ms] ease-linear ${
                i < currentIdx
                  ? "w-full bg-white"
                  : i === currentIdx
                  ? "w-full bg-white animate-[progress_3s_linear]"
                  : "w-0 bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Current story */}
      <img
        src={user.stories[currentIdx]}
        alt={`story-${currentIdx}`}
        className="w-80 h-96 object-cover rounded-lg shadow-lg"
      />

      {/* Optional Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Close
      </button>
    </div>
  );
};

export default StoryViewer;
