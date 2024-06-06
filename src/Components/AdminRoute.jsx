import AdminPortal from "../pages/Admin/AdminPortal.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function AdminRoute() {
    const { isAdmin, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/login');
        }
    }, [loading, isAdmin, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <AdminPortal />;
}

export default AdminRoute;