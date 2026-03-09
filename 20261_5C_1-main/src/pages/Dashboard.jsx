import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../security/authContext";

function Dashboard() {
    const navigate = useNavigate();
    const { logout, session } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="section-title">Dashboard</h1>
                <p className="section-subtitle">
                    Bienvenido, <strong>{session?.username}</strong>
                </p>

                <div className="nav-links">
                    <Link to="/profile">Profile</Link>
                    <Link to="/users">Users</Link>
                </div>

                <div className="actions-row">
                    <Button text="Cerrar sesión" action={handleLogout} variant="danger" />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;