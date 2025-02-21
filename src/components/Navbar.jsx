import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, signOut } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-brown-700 to-brown-900 text-yellow-300 p-4 flex justify-between items-center shadow-md">
            <Link to="/home" className="text-2xl font-bold">
                Notes App
            </Link>
            {user ? (
                <button onClick={signOut} className="btn-secondary">
                    Sign Out
                </button>
            ) : (
                <Link to="/signin" className="btn-primary">
                    Sign In
                </Link>
            )}
        </nav>
    );
}

export default Navbar;
