import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/CustomElements";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy data for demonstration
  const featuredContent = {
    title: "Featured Playlist",
    description: "Curated collection of the best tracks",
    image: "https://picsum.photos/800/400",
  };

  const contentGrid = [
    { id: 1, title: "Recently Played", image: "https://picsum.photos/200/200" },
    { id: 2, title: "Made for You", image: "https://picsum.photos/200/201" },
    { id: 3, title: "Popular Artists", image: "https://picsum.photos/200/202" },
    { id: 4, title: "New Releases", image: "https://picsum.photos/200/203" },
    { id: 5, title: "Chill Vibes", image: "https://picsum.photos/200/204" },
    { id: 6, title: "Top Hits", image: "https://picsum.photos/200/205" },
  ];

  useEffect(() => {
    document.title = "Zia Library - Home";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-500">Zia Library</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/home" className="text-gray-400 hover:text-white cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-gray-400 hover:text-white cursor-pointer">
                Search
              </Link>
            </li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Albums</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Artists</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Liked Songs</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Featured Section */}
        <div className="mb-8">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <img
              src={featuredContent.image}
              alt={featuredContent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full">
              <h2 className="text-4xl font-bold mb-2">{featuredContent.title}</h2>
              <p className="text-gray-300">{featuredContent.description}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contentGrid.map((item) => (
            <Link
              key={item.id}
              to={`/album/${item.id}`}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="aspect-square mb-4 relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-primary text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="font-semibold">{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
