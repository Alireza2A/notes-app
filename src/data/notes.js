export const handleNote = (state, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return [...state, action.payload];
        case "EDIT_NOTE":
            return state.map((note) =>
                note.id === action.payload.id ? action.payload : note
            );
        case "DELETE_NOTE":
            return state.filter((note) => note.id !== action.payload);
        case "LOAD_NOTES":
            return action.payload;
        default:
            return state;
    }
};
export const getAllNotes = () => {
    return JSON.parse(localStorage.getItem("notes"));
};
