import { createContext, useContext, useReducer, useEffect } from "react";
import { handleNote, getAllNotes } from "../data/notes";
const NotesContext = createContext();
//A reducer is a function that determines how the state should change based on the action.
//  It's similar to how a function updates state in a class-based component,
// but in the case of hooks, it's a more structured approach.
// Here, the dispatch function sends an action to the handleNote from the repository notes.
// The action has a type (to indicate what kind of change to make)
// and an optional payload (which contains the data to be used by the reducer for updating the state).

export const NotesProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(handleNote, []);
    useEffect(() => {
        const storedNotes = getAllNotes();
        if (storedNotes) {
            dispatch({ type: "LOAD_NOTES", payload: storedNotes });
        }
    }, []);

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
