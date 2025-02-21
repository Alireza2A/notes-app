import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/signin");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full mb-2" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full mb-4" />
                <button type="submit" className="btn btn-primary w-full">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
