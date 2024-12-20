import * as React from 'react';
import Navbar from "../components/Navbar";
import BentoGrid from "../components/BentoGrid";
import Topics from "../components/Topics";
import BlogGrid from "../components/BlogNews";
import Footer from "../components/Footer";

const HomePage = () => {
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow mt-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Card Grid */}
          <main className="flex-1">
            <BentoGrid selectedTopic={selectedTopic} />
          </main>

          {/* Sidebar (Topics) */}
          {/* <aside className="lg:w-64">
            <Topics
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          </aside> */}
        </div>

        {/* Blog Grid - Card Berita */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Latest News
          </h2>
          <BlogGrid selectedTopic={selectedTopic} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
