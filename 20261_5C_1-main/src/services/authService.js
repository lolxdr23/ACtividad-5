const API_URL = "https://fakestoreapi.com";

export async function loginRequest(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "No fue posible iniciar sesión");
    }

    return data;
}