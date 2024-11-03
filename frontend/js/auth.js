const apiBaseUrl = 'http://localhost:8000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await axios.post(`${apiBaseUrl}/login`, {
            email: email,
            password: password
        });

        sessionStorage.setItem('token', response.data.token);
        alert("Login realizado com sucesso!");
        window.location.href = 'index.html';

    } catch (error) {
        // console.error(error);
        alert("Erro no login. Verifique as credenciais e tente novamente.");
    }
});

async function logoutUser() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Token ausente. Faça login novamente.");
        window.location.href = 'login.html';
        return;
    }

    try {
        await axios.post(`${apiBaseUrl}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        sessionStorage.removeItem('token');
        alert("Logout realizado com sucesso!");

    } catch (error) {
        // console.error(error);
        alert("Erro ao realizar logout. Tente novamente.");
    }
}

async function accessProtectedRoute() {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${apiBaseUrl}/protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert('Usuário Autenticado');

    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Você não tem permissão para acessar esta rota.");
        } else {
            // console.error(error);
        }
    }
}

// Mostra spinner enquanto a operação está em andamento
document.getElementById('spinner').style.display = 'block';

try {
    const response = await axios.post(`${apiBaseUrl}/login`, { email, password });
    sessionStorage.setItem('token', response.data.token);
    alert("Login realizado com sucesso!");
    window.location.href = 'index.html';
} catch (error) {
    console.error("Erro no login:", error);
    alert("Erro: " + (error.response?.data.message || "Verifique as credenciais e tente novamente."));
} finally {
    // Esconde o spinner após a operação
    document.getElementById('spinner').style.display = 'none';
}

