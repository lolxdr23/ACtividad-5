import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import AlertMessage from "../../components/AlertMessage";
import { deleteUserById, getAllUsers } from "../../services/userService";

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({
        type: "info",
        text: "",
    });

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            `¿Seguro que deseas borrar el usuario con id ${id}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteUserById(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            setMessage({
                type: "success",
                text: `Usuario ${id} eliminado correctamente.`,
            });
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message,
            });
        }
    };

    return (
        <div>
            <div className="actions-row">
                <Button
                    text="Crear nuevo usuario"
                    variant="primary"
                    action={() => navigate("/users/create")}
                />
            </div>

            <AlertMessage type={message.type} message={message.text} />

            {isLoading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <div className="table-wrapper">
                    <table className="app-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Username</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        {user.name?.firstname} {user.name?.lastname}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <div className="table-actions">
                                            <Button
                                                text="Ver"
                                                variant="secondary"
                                                action={() => navigate(`/users/${user.id}`)}
                                            />
                                            <Button
                                                text="Borrar"
                                                variant="danger"
                                                action={() => handleDelete(user.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No hay usuarios para mostrar.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserList;