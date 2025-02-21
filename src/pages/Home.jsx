// src/pages/Home.jsx
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
            <p className="text-center text-lg font-bold text-yellow-600">
                Please sign in to see your notes.
            </p>
        );
    }

    const filteredNotes = notes
        .filter((note) => note.userEmail === user.email)
        .filter(
            (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((note) =>
            selectedCategory ? note.categories.includes(selectedCategory) : true
        );

    const allCategories = [
        ...new Set(notes.flatMap((note) => note.categories)),
    ];

    return (
        <div className="container bg-gradient-to-br from-yellow-300 via-yellow-500 to-brown-700 text-brown-900 p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-yellow-600 mb-6 text-center">
                Your Notes
            </h1>

            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-bordered flex-grow p-2 rounded shadow-md"
                />
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered p-2 rounded shadow-md"
                >
                    <option value="">All Categories</option>
                    {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <Link to="/create" className="btn-primary mb-4 block text-center">
                Create Note
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <p className="text-center text-lg text-brown-700 font-semibold">
                        No notes found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
