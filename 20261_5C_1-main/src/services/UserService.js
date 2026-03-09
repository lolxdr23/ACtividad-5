const API_URL = "https://fakestoreapi.com";

export async function getAllUsers() {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error("No fue posible obtener los usuarios");
    }

    return data;
}

export async function getUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error("No fue posible obtener el usuario");
    }

    return data;
}

export async function deleteUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error("No fue posible borrar el usuario");
    }

    return data;
}

export async function createUser(user) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("No fue posible crear el usuario");
    }

    return data;
}