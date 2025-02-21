import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

function Home() {
    const { notes, dispatch } = useNotes();
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    if (!user) {
        return (
            <p className="text-center text-lg font-bold text-brown-800">
                Please sign in to see your notes.
            </p>
        );
    }

    // Filter notes based on user, search term, and selected category
    const filteredNotes = notes
        .filter((note) => note.userEmail === user.email) // Only show user's notes
        .filter(
            (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((note) =>
            selectedCategory ? note.categories.includes(selectedCategory) : true
        );

    // Get unique categories from all notes
    const allCategories = [
        ...new Set(notes.flatMap((note) => note.categories)),
    ];

    return (
        <div className="container">
            <div className="sticky top-20 z-10 bg-gradient-to-br from-yellow-300 via-yellow-500">
                <h1 className="text-4xl font-bold text-yellow-600 mb-6">
                    Your Notes
                </h1>

                {/* SEARCH AND CATEGORY FILTER */}
                <div className="flex flex-wrap gap-4 mb-4">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="🔍 Search notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-bordered flex-grow bg-yellow-100 text-brown-900 placeholder-brown-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    {/* Category Dropdown */}
                    <select
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select select-bordered bg-yellow-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                        <option value="">All Categories</option>
                        {allCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CREATE BUTTON */}
                <Link to="/create" className="btn-primary">
                    ➕ Create Note
                </Link>
            </div>
            {/* NOTES DISPLAY */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={() =>
                                dispatch({
                                    type: "DELETE_NOTE",
                                    payload: note.id,
                                })
                            }
                        />
                    ))
                ) : (
                    <p className="text-brown-700 text-lg">
                        No notes available. Create one!
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
