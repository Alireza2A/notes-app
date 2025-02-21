import { Link } from "react-router-dom";

function NoteCard({ note, onDelete }) {
    return (
        <div className="card w-80 bg-base-100 shadow-xl m-2">
            <div className="card-body">
                <h2 className="card-title">{note.title}</h2>
                <p>{note.content}</p>

                {/* Display categories */}
                {note.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {note.categories.map((cat) => (
                            <span key={cat} className="badge badge-secondary">
                                {cat}
                            </span>
                        ))}
                    </div>
                )}

                <div className="card-actions justify-end mt-4">
                    <Link to={`/edit/${note.id}`} className="btn btn-primary">
                        Edit
                    </Link>
                    <button onClick={onDelete} className="btn btn-error">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
