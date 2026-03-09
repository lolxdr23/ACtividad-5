import { Link, Outlet } from "react-router-dom";

function Users() {
    return (
        <div className="page-container">
            <div className="card">
                <h1 className="section-title">Users</h1>
                <p className="section-subtitle">
                    Gestión de usuarios usando Fake Store API.
                </p>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">Listado</Link>
                    <Link to="/users/create">Crear usuario</Link>
                </div>

                <hr />

                <Outlet />
            </div>
        </div>
    );
}

export default Users;