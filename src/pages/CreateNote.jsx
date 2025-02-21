import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { dispatch } = useNotes();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = { id: Date.now(), title, content };
        dispatch({ type: "ADD_NOTE", payload: newNote });
        navigate("/home");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Note</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full" required></textarea>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
