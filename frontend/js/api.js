const apiBaseUrl = 'http://localhost:8000/api';

// Função para obter o token de forma segura
export function getToken() {
    return localStorage.getItem('token');
}

// Função de requisição GET
export async function apiGet(endpoint) {
    try {
        const response = await axios.get(`${apiBaseUrl}/${endpoint}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro na requisição GET:", error);
        throw error;
    }
}

// Função de requisição POST
export async function apiPost(endpoint, data) {
    try {
        const response = await axios.post(`${apiBaseUrl}/${endpoint}`, data, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro na requisição POST:", error);
        throw error;
    }
}