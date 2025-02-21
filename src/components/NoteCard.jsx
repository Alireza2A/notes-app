import { Link } from "react-router-dom";

function NoteCard({ note, onDelete }) {
    return (
        <div className="card w-80 bg-base-100 shadow-xl m-4">
            <div className="card-body">
                <h2 className="card-title">{note.title}</h2>
                <p>{note.content.substring(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <Link to={`/edit/${note.id}`} className="btn btn-primary">
                        Edit
                    </Link>
                    <button onClick={() => onDelete(note.id)} className="btn btn-error">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
