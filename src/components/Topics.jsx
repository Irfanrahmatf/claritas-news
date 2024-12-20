import * as React from 'react';
import classNames from "classnames";

const Topic = ({ selectedTopic, setSelectedTopic }) => {
  const topics = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
  ];

  return (
    <div className="lg:w-64 bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Choose topics:</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
            className={classNames(
              "px-4 py-2 rounded-full text-sm transition-colors duration-200",
              selectedTopic === topic
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Topic;