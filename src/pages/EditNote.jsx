import { useState, useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
    const { id } = useParams();
    const { notes, dispatch } = useNotes();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const noteToEdit = notes.find((note) => note.id === parseInt(id));
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        }
    }, [id, notes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "EDIT_NOTE", payload: { id: parseInt(id), title, content } });
        navigate("/home");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full" required></textarea>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditNote;
