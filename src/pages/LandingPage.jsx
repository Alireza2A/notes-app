import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router";
function LandingPage() {
    const { user } = useAuth();

    if (user) return <Navigate to="/home" />;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to Notes App</h1>
            <p className="text-lg mb-6">Organize your notes efficiently.</p>
            <div className="space-x-4">
                <Link to="/signin" className="btn btn-primary">
                    Sign In
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
