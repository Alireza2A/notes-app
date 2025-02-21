import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]); // Multiple categories
    const [customCategory, setCustomCategory] = useState(""); // Custom category input

    const { notes, dispatch } = useNotes();
    const { user } = useAuth();
    const navigate = useNavigate();

    const predefinedCategories = ["Work", "Personal", "Ideas", "Important"]; // Default categories

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory && !categories.includes(selectedCategory)) {
            setCategories([...categories, selectedCategory]);
        }
        e.target.value = ""; // Reset dropdown after selection
    };

    const handleCustomCategory = (e) => {
        if (e.key === "Enter") return;
        if (
            customCategory.trim() &&
            !categories.includes(customCategory.trim())
        ) {
            setCategories([...categories, customCategory.trim()]);
            setCustomCategory(""); // Clear input after adding
        }
    };

    const removeCategory = (cat) => {
        setCategories(categories.filter((c) => c !== cat));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return;

        const newNote = {
            id: Date.now(),
            title,
            content,
            categories, // Now categories are properly saved!
            userEmail: user.email, // Link note to logged-in user
            date: new Date().toISOString(), // Add timestamp
        };

        dispatch({ type: "ADD_NOTE", payload: newNote });
        navigate("/home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-500 to-brown-700 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-yellow-600 mb-6 text-center">
                    Create Note
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-bordered w-full bg-yellow-100 text-brown-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                        }} // Ensure text wrapping here
                        required
                    />

                    {/* Content */}
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea-bordered w-full bg-yellow-100 text-brown-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                        }} // Add word wrapping here
                        required
                    ></textarea>

                    {/* Predefined Categories */}
                    <select
                        onChange={(e) => handleCategoryChange(e)}
                        className="select-bordered w-full bg-yellow-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                        <option value="">Select Category</option>
                        {predefinedCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Custom Category Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add Custom Category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="input-bordered flex-grow bg-yellow-100 text-brown-900 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <button
                            type="button"
                            className="btn-secondary p-3"
                            onClick={(e) => handleCustomCategory(e)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleCustomCategory(e)
                            }
                        >
                            Add
                        </button>
                    </div>

                    {/* Display Selected Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, index) => (
                            <span
                                key={index}
                                className="badge-primary flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500 text-white"
                            >
                                {cat}
                                <button
                                    type="button"
                                    className="ml-1 text-xs text-white"
                                    onClick={() => removeCategory(cat)}
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Save Button */}
                    <button type="submit" className="btn-primary w-full">
                        💾 Save Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNote;
