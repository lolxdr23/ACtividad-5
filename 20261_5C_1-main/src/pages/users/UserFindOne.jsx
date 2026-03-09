import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import AlertMessage from "../../components/AlertMessage";
import { getUserById } from "../../services/userService";

function UserFindOne() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({
        type: "info",
        text: "",
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                setIsLoading(true);
                const data = await getUserById(id);
                setUser(data);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error.message,
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [id]);

    return (
        <div>
            <div className="actions-row">
                <Button
                    text="Volver al listado"
                    variant="secondary"
                    action={() => navigate("/users")}
                />
            </div>

            <AlertMessage type={message.type} message={message.text} />

            {isLoading ? (
                <p>Cargando usuario...</p>
            ) : user ? (
                <div className="user-detail-grid">
                    <div className="user-detail-item">
                        <strong>ID</strong>
                        <p>{user.id}</p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Username</strong>
                        <p>{user.username}</p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Nombre</strong>
                        <p>
                            {user.name?.firstname} {user.name?.lastname}
                        </p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Email</strong>
                        <p>{user.email}</p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Teléfono</strong>
                        <p>{user.phone}</p>
                    </div>

                    <div className="user-detail-item">
                        <strong>Ciudad</strong>
                        <p>{user.address?.city || "Sin información"}</p>
                    </div>
                </div>
            ) : (
                <p>No se encontró el usuario.</p>
            )}
        </div>
    );
}

export default UserFindOne;