import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";
import { useAuth } from "../security/authContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({
        type: "info",
        text: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!form.username.trim()) {
            newErrors.username = "El username es obligatorio";
        }

        if (!form.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setMessage({
            type: "info",
            text: "",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            setMessage({
                type: "error",
                text: "Debes completar los campos obligatorios.",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            await login(form.username.trim(), form.password.trim());

            setMessage({
                type: "success",
                text: "Inicio de sesión correcto.",
            });

            navigate("/dashboard");
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message || "Credenciales inválidas.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <div className="card" style={{ maxWidth: "520px", margin: "0 auto" }}>
                <h1 className="section-title">Login</h1>
                <p className="section-subtitle">
                    Autenticación consumiendo Fake Store API.
                </p>

                <AlertMessage type={message.type} message={message.text} />

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        name="username"
                        placeholder="Ingresa tu username"
                        value={form.username}
                        onChange={handleChange}
                        error={errors.username}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <div className="actions-row">
                        <Button
                            type="submit"
                            text={isSubmitting ? "Ingresando..." : "Login"}
                            variant="primary"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;