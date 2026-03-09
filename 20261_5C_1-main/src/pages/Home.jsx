import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="card">
                <h1 className="section-title">Home</h1>
                <p className="section-subtitle">
                    Bienvenido al sistema. Solo Home y Login son rutas públicas.
                </p>

                <div className="actions-row">
                    <Link to="/login">Ir al login</Link>

                    <Button
                        text="Iniciar sesión"
                        action={() => navigate("/login")}
                        variant="primary"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;