import AdminPortal from "../pages/Admin/AdminPortal.jsx";
import Login from "./Login/Login.jsx";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";

function AdminRoute() {
    const { isAdmin, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>;
    }
    return isAdmin ? <AdminPortal /> : <Login />;
}

export default AdminRoute;