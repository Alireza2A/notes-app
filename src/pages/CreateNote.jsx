import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]); // Multiple categories
    const [customCategory, setCustomCategory] = useState(""); // Custom category input

    const { dispatch } = useNotes();
    const { user } = useAuth();
    const navigate = useNavigate();

    const predefinedCategories = ["Work", "Personal", "Ideas", "Important"]; // Default categories

    // Handle selecting a predefined category
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory && !categories.includes(selectedCategory)) {
            setCategories([...categories, selectedCategory]);
        }
        e.target.value = ""; // Reset dropdown after selection
    };

    // Handle adding a custom category
    const handleCustomCategory = () => {
        if (
            customCategory.trim() &&
            !categories.includes(customCategory.trim())
        ) {
            setCategories([...categories, customCategory.trim()]);
            setCustomCategory(""); // Clear input after adding
        }
    };

    // Handle removing a category
    const removeCategory = (cat) => {
        setCategories(categories.filter((c) => c !== cat));
    };

    // Handle form submission
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Note</h1>
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

                {/* Predefined Category Selection */}
                <select
                    onChange={handleCategoryChange}
                    className="select select-bordered w-full"
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
                        className="input input-bordered flex-grow"
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCustomCategory}
                    >
                        Add
                    </button>
                </div>

                {/* Display Selected Categories with Remove Option */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, index) => (
                        <span
                            key={index}
                            className="badge badge-primary flex items-center gap-2"
                        >
                            {cat}
                            <button
                                type="button"
                                className="ml-1 text-xs"
                                onClick={() => removeCategory(cat)}
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
