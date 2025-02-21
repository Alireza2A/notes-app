import { useNotes } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

function Home() {
    const { notes, dispatch } = useNotes();
    console.log("current notes:", notes);
    const handleDelete = (id) => {
        dispatch({ type: "DELETE_NOTE", payload: id });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Notes</h1>
            <Link to="/create" className="btn btn-primary mb-4">
                Create Note
            </Link>
            <div className="flex flex-wrap">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p>No notes available. Create one!</p>
                )}
            </div>
        </div>
    );
}

export default Home;
