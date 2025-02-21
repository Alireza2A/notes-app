import { Link } from "react-router-dom";

function NoteCard({ note, onDelete }) {
    return (
        <div className="bg-yellow-100 shadow-lg rounded-xl p-4 w-80 m-2 border border-yellow-500 flex flex-col">
            <div className="mb-3 flex-grow">
                <h2 className="text-xl font-bold text-brown-800 truncate">
                    {note.title.length > 30
                        ? note.title.slice(0, 30) + "..."
                        : note.title}
                </h2>
                <p className="text-brown-700">
                    {note.content.length > 30
                        ? note.content.slice(0, 30) + "..."
                        : note.content}
                </p>
            </div>

            {/* Display Categories */}
            {note.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 truncate">
                    {note.categories.map((cat) => (
                        <span
                            key={cat}
                            className="px-3 py-1 rounded-full bg-yellow-200 text-brown-800 font-semibold text-sm"
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-4 pt-4 border-t border-brown-300">
                <Link
                    to={`/edit/${note.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
                >
                    👁️ View / ✏ Edit
                </Link>
                <button
                    onClick={onDelete}
                    className="bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
                >
                    🗑 Delete
                </button>
            </div>
        </div>
    );
}

export default NoteCard;
