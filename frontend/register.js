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

        alert('Cadastro realizado com sucesso!');
    } catch (error) {
        console.error('Erro no cadastro:', error.response.data);
        alert('Erro no cadastro!');
    }
});