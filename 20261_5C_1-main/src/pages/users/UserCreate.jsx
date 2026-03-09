import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AlertMessage from "../../components/AlertMessage";
import { createUser } from "../../services/userService";

function UserCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        city: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({
        type: "info",
        text: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstname.trim()) newErrors.firstname = "El nombre es obligatorio";
        if (!form.lastname.trim()) newErrors.lastname = "El apellido es obligatorio";
        if (!form.username.trim()) newErrors.username = "El username es obligatorio";
        if (!form.email.trim()) newErrors.email = "El email es obligatorio";
        if (!form.password.trim()) newErrors.password = "La contraseña es obligatoria";
        if (!form.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
        if (!form.city.trim()) newErrors.city = "La ciudad es obligatoria";

        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Ingresa un email válido";
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
                text: "Debes corregir los campos del formulario.",
            });
            return;
        }

        const payload = {
            email: form.email.trim(),
            username: form.username.trim(),
            password: form.password.trim(),
            name: {
                firstname: form.firstname.trim(),
                lastname: form.lastname.trim(),
            },
            address: {
                city: form.city.trim(),
                street: "Principal",
                number: 1,
                zipcode: "00000",
                geolocation: {
                    lat: "0",
                    long: "0",
                },
            },
            phone: form.phone.trim(),
        };

        try {
            setIsSubmitting(true);
            await createUser(payload);

            setMessage({
                type: "success",
                text: "Usuario creado correctamente.",
            });

            setTimeout(() => {
                navigate("/users");
            }, 1000);
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="section-title">Crear usuario</h2>
            <p className="section-subtitle">
                Formulario validado para registrar un usuario.
            </p>

            <AlertMessage type={message.type} message={message.text} />

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <InputField
                        label="Nombre"
                        name="firstname"
                        placeholder="Ingresa el nombre"
                        value={form.firstname}
                        onChange={handleChange}
                        error={errors.firstname}
                    />

                    <InputField
                        label="Apellido"
                        name="lastname"
                        placeholder="Ingresa el apellido"
                        value={form.lastname}
                        onChange={handleChange}
                        error={errors.lastname}
                    />

                    <InputField
                        label="Username"
                        name="username"
                        placeholder="Ingresa el username"
                        value={form.username}
                        onChange={handleChange}
                        error={errors.username}
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Ingresa la contraseña"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <InputField
                        label="Teléfono"
                        name="phone"
                        placeholder="Ingresa el teléfono"
                        value={form.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />

                    <InputField
                        label="Ciudad"
                        name="city"
                        placeholder="Ingresa la ciudad"
                        value={form.city}
                        onChange={handleChange}
                        error={errors.city}
                    />
                </div>

                <div className="actions-row">
                    <Button
                        type="submit"
                        text={isSubmitting ? "Guardando..." : "Guardar usuario"}
                        variant="primary"
                        disabled={isSubmitting}
                    />
                    <Button
                        text="Cancelar"
                        variant="secondary"
                        action={() => navigate("/users")}
                    />
                </div>
            </form>
        </div>
    );
}

export default UserCreate;