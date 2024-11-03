const apiBaseUrl = 'http://localhost:8000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    try {
        const response = await axios.post(`${apiBaseUrl}/login`, {
            email: email,
            password: password
        });

        localStorage.setItem('token', response.data.token);
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Login realizado com sucesso!';
        errorMessage.style.display = 'block';
        
    } catch (error) {
        errorMessage.style.color = 'red';
        if (error.response) {
            if (error.response.status === 404) {
                errorMessage.textContent = 'Credenciais inválidas!';
            } else {
                errorMessage.textContent = 'Erro no login! Tente novamente.';
            }
        } else {
            // console.error('Erro no login:', error);
            errorMessage.textContent = 'Verifique sua conexão e tente novamente.';
        }
        errorMessage.style.display = 'block';
    }
});