import React, { useState } from "react";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Notes: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddEntry = () => {
    if (title && content) {
      const newEntry: JournalEntry = {
        id: entries.length + 1,
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      setEntries([newEntry, ...entries]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">My Journal</h1>

      {/* Form Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Entry Title"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your thoughts..."
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleAddEntry}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Entry
        </button>
      </div>

      {/* Entries Section */}
      <div>
        {entries.length > 0 ? (
          <ul className="space-y-4">
            {entries.map((entry) => (
              <li key={entry.id} className="bg-white p-4 rounded-md shadow">
                <h2 className="text-xl font-semibold">{entry.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{entry.date}</p>
                <p>{entry.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            No entries yet. Start writing!
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
