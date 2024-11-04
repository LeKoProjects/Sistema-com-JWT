const apiBaseUrl = 'http://localhost:8000/api';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
        window.location.href = '/index.html';

    } catch (error) {
        console.error(error);
        alert("Erro no login. Verifique as credenciais e tente novamente.");
    }
});

// Função de logout
async function logoutUser() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        alert("Você não está logado.");
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
        window.location.href = '/views/login.html';
    } catch (error) {
        console.error("Erro ao realizar logout:", error);
        alert("Erro ao realizar logout. Tente novamente.");
    }
}

// Função para acessar rota protegida
async function accessProtectedRoute() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        alert("Você precisa estar logado para acessar esta rota.");
        window.location.href = '/views/login.html';
        return;
    }

    try {
        const response = await axios.get(`${apiBaseUrl}/protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    alert(response.data.message);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Acesso negado. Você não tem permissão para acessar esta rota.");
            window.location.href = '/views/login.html';
        } else {
            console.error("Erro ao acessar rota protegida:", error);
        }
    }
}