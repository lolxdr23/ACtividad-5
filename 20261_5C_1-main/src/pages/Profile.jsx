import { useAuth } from "../security/authContext";

function Profile() {
    const { session } = useAuth();

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="section-title">Profile</h1>
                <p className="section-subtitle">Información de la sesión actual.</p>

                <div className="user-detail-grid">
                    <div className="user-detail-item">
                        <strong>Username</strong>
                        <p>{session?.username || "Sin información"}</p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Estado</strong>
                        <p>{session?.token ? "Sesión activa" : "Sin sesión"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;