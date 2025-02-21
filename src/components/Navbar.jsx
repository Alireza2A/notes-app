import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, signOut } = useAuth();

    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between">
            <Link to="/home" className="text-lg font-bold">
                Notes App
            </Link>
            {user ? (
                <button onClick={signOut} className="btn btn-secondary">
                    Sign Out
                </button>
            ) : (
                <Link to="/signin" className="btn btn-primary">
                    Sign In
                </Link>
            )}
        </nav>
    );
}

export default Navbar;
