// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { NotesProvider } from "./context/NotesContext";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import MainLayout from "./components/MainLayout";

function App() {

    return (
        <AuthProvider>
            <NotesProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/" element={<MainLayout />}>
                            <Route path="signin" element={<SignIn />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route path="home" element={<Home />} />
                            <Route path="create" element={<CreateNote />} />
                            <Route path="edit/:id" element={<EditNote />} />
                        </Route>
                    </Routes>
                </Router>
            </NotesProvider>
        </AuthProvider>
    );
}

export default App;
