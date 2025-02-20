import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <p className="text-red-600">this is a text</p>
            <button class="btn  btn-accent ">Button</button>
        </>
    );
}

export default App;
