import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryAlbums() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [albums, setAlbums] = useState([]);

  // Dummy data for demonstration
  useEffect(() => {
    // Simulate API call to get category and albums
    const categoryData = {
      id: categoryId,
      title: "Quran",
      subtitle: "Holy Book",
      description: "Complete Quran recitations by renowned reciters",
      image: "https://picsum.photos/800/400",
    };

    const albumsData = [
      {
        id: 1,
        title: "Complete Quran",
        subtitle: "By Sheikh Mishary Rashid Alafasy",
        description: "Complete recitation of the Holy Quran",
        image: "https://picsum.photos/400/400",
        trackCount: 114,
        subalbums: [
          { id: "juz1", title: "Juz 1" },
          { id: "juz2", title: "Juz 2" },
          { id: "juz3", title: "Juz 3" },
        ],
      },
      {
        id: 2,
        title: "Selected Surahs",
        subtitle: "By Sheikh Abdul Rahman Al-Sudais",
        description: "Collection of frequently recited surahs",
        image: "https://picsum.photos/400/401",
        trackCount: 20,
      },
      {
        id: 3,
        title: "Tajweed Rules",
        subtitle: "By Sheikh Ayman Swaid",
        description: "Learn proper Quran recitation rules",
        image: "https://picsum.photos/400/402",
        trackCount: 15,
      },
    ];

    setCategory(categoryData);
    setAlbums(albumsData);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative h-80">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="bg-surface-container text-on-surface-variant p-3 rounded-full hover:bg-surface-container-high transition-colors shadow-lg mb-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{category.title}</h1>
            <p className="text-xl text-gray-300 mb-2">{category.subtitle}</p>
            <p className="text-gray-400">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => navigate(`/album/${album.id}`)}
              className="bg-surface-container rounded-2xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group"
            >
              <div className="aspect-square relative">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-2xl font-bold mb-1">{album.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">{album.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-3">{album.description}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    {album.trackCount} Tracks
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

export default CategoryAlbums; 