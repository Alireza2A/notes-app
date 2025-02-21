import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
