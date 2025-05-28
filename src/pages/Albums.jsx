import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Albums() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy data for demonstration
  const categories = [
    {
      id: 1,
      title: "Quran",
      subtitle: "Holy Book",
      description: "Complete Quran recitations by renowned reciters",
      image: "https://picsum.photos/400/400",
      albumsCount: 12,
    },
    {
      id: 2,
      title: "Hadith",
      subtitle: "Prophetic Traditions",
      description: "Collections of authentic hadith narrations",
      image: "https://picsum.photos/400/401",
      albumsCount: 8,
    },
    {
      id: 3,
      title: "Islamic Lectures",
      subtitle: "Educational Content",
      description: "Scholarly lectures and discussions",
      image: "https://picsum.photos/400/402",
      albumsCount: 15,
    },
    {
      id: 4,
      title: "Nasheeds",
      subtitle: "Islamic Songs",
      description: "Beautiful Islamic songs and hymns",
      image: "https://picsum.photos/400/403",
      albumsCount: 20,
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/albums/category/${category.id}`);
  };

  return (
    <div className="min-h-screen bg-surface p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-surface-container text-on-surface-variant p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-surface-container rounded-2xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">{category.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    {category.albumsCount} Albums
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Albums; 