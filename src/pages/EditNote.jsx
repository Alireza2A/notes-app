import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
const predefinedCategories = ["Work", "Personal", "Ideas", "Important"]; // Default categories

function EditNote() {
    const { notes, dispatch } = useNotes();
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the note by ID
    const existingNote = notes.find((note) => note.id === parseInt(id));

    // Local state for editing
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);

    // Load existing note data
    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
            setCategories(existingNote.categories || []);
        }
    }, [existingNote]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedNote = { ...existingNote, title, content, categories };
        dispatch({ type: "EDIT_NOTE", payload: updatedNote });
        navigate("/home");
    };
    const handlePreDefCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory && !categories.includes(selectedCategory)) {
            setCategories([...categories, selectedCategory]);
        }
        e.target.value = ""; // Reset dropdown after selection
    };
    // Handle category input
    const handleCategoryChange = (e) => {
        e.preventDefault();
        const category = e.target.value.trim();
        if (category && !categories.includes(category)) {
            setCategories([...categories, category]);
        }
        e.target.value = "";
    };

    // Remove a category
    const removeCategory = (category) => {
        setCategories(categories.filter((cat) => cat !== category));
    };

    if (!existingNote)
        return <p className="text-center text-lg">Note not found</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    required
                ></textarea>
                {/* Predefined Categories */}
                <select
                    onChange={handlePreDefCategoryChange}
                    className="select-bordered w-full bg-yellow-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-yellow-600"
                >
                    <option value="">Select Category</option>
                    {predefinedCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {/* Category Input */}
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Add category and press Enter"
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleCategoryChange(e)
                        }
                        className="input input-bordered w-full"
                    />
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-3 py-1 rounded-full bg-yellow-200 text-brown-800 font-semibold text-sm"
                            >
                                <button
                                    type="button"
                                    className="ml-1 text-xs"
                                    onClick={() => removeCategory(cat)}
                                >
                                    {cat} ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        type="submit"
                        className="btn btn-primary p-6 border-2 border-yellow-900"
                    >
                        Update Note
                    </button>
                    <button className="btn btn-primary p-6 border-2 border-yellow-900">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditNote;
