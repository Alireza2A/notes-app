import { createContext, useContext, useReducer, useEffect } from "react";
import { handleNote, getAllNotes } from "../data/notes";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const { user } = useAuth(); // Get logged-in user
    const [notes, dispatch] = useReducer(handleNote, []);

    useEffect(() => {
        const storedNotes = getAllNotes();

        // Only load notes for the logged-in user
        if (storedNotes && user) {
            const userNotes = storedNotes.filter(
                (note) => note.userEmail === user.email
            );
            dispatch({ type: "LOAD_NOTES", payload: userNotes });
        }
    }, [user]); // Run when the user changes

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }, [notes]);

    return (
        <NotesContext.Provider value={{ notes, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
