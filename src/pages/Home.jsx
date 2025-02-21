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
            <p className="text-center text-lg font-bold">
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Notes</h1>

            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered flex-grow"
                />
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="">All Categories</option>
                    {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <Link to="/create" className="btn btn-primary mb-4">
                Create Note
            </Link>

            <div className="flex flex-wrap">
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
                    <p>No notes found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
