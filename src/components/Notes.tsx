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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

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

  const handleEditEntry = (id: number) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setTitle(entryToEdit.title);
      setContent(entryToEdit.content);
      setEditingId(id);
    }
  };

  const handleSaveEdit = () => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === editingId ? { ...entry, title, content } : entry
      )
    );
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const handleDeleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
  };

  const handleCloseSelectedEntry = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 bg-gray-900 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Section: Add/Edit Notes */}
      <div className="text-black bg-white p-4 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {editingId ? "Edit Entry" : "Add Entry"}
        </h2>
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
          onClick={editingId ? handleSaveEdit : handleAddEntry}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editingId ? "Save Changes" : "Add Entry"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setContent("");
            }}
            className="w-full mt-2 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Right Section: Display Notes */}
      <div className="text-white bg-gray-800 p-4 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-4">
          {selectedEntry ? "View Entry" : "Your Notes"}
        </h2>
        {selectedEntry ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {selectedEntry.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{selectedEntry.date}</p>
            <p className="text-gray-200">{selectedEntry.content}</p>
            <button
              onClick={handleCloseSelectedEntry}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Back to Notes
            </button>
          </div>
        ) : (
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "400px" }}
          >
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white p-4 rounded-md shadow flex justify-between items-start cursor-pointer"
                  onClick={() => handleSelectEntry(entry)}
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-400">{entry.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering select
                        handleEditEntry(entry.id);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering select
                        handleDeleteEntry(entry.id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No entries yet. Start writing!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
