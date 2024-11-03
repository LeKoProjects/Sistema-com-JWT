const apiBaseUrl = 'http://localhost:8000/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await axios.post(`${apiBaseUrl}/register`, {
            name: name,
            email: email,
            password: password
        });

        sessionStorage.setItem('token', response.data.token);
        alert("Cadastro realizado com sucesso!");
        window.location.href = 'login.html';

    } catch (error) {
        // console.error(error);
        alert("Erro no registro. Verifique os dados e tente novamente.");
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

        localStorage.removeItem('token');
        alert("Logout realizado com sucesso!");

    } catch (error) {
        // console.error(error);
        alert("Erro ao realizar logout. Tente novamente.");
    }
}
