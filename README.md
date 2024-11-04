# Sistema de Autenticação JWT

Este projeto é um sistema de autenticação baseado em JWT (JSON Web Token). Ele implementa funcionalidades de cadastro, login, verificação de sessão e logout com foco em segurança e separação entre front-end e back-end.

## Índice

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Funcionalidades do Sistema](#funcionalidades-do-sistema)
6. [Rotas da API](#rotas-da-api)
7. [Front-end e Comunicação com o Back-end](#front-end-e-comunicação-com-o-back-end)


## Tecnologias Utilizadas

- **Back-end:** PHP 8.x e Laravel 10
- **JWT (JSON Web Token):** para autenticação e controle de sessão
- **Banco de Dados:** MySQL ou PostgreSQL
- **Front-end:** HTML, CSS, JavaScript (Axios para chamadas HTTP)

## Pré-requisitos

- **PHP** 8.x
- **Composer** para gerenciamento de dependências PHP
- **Node.js e NPM** para instalação de pacotes do front-end
- **Banco de dados SQL** (MySQL ou PostgreSQL)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LeKoProjects/Sistema-com-JWT.git
   cd Sistema-com-JWT
   ```

2. **Instale as dependências do back-end:**
   ```bash
   composer install
   ```

3. **Instale as dependências do front-end:**
   ```bash
   npm install && npm run dev
   ```

## Configuração

1. **Configuração do ambiente:**
   - Crie um arquivo `.env` com base no `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Configure as seguintes variáveis de ambiente:
     - **Banco de Dados:** Preencha `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` com as configurações do seu banco de dados.
     - **JWT_SECRET:** Gere a chave secreta para o JWT com o comando:
       ```bash
       php artisan jwt:secret
       ```

2. **Configuração do banco de dados:**
   - Execute as migrações para criar as tabelas necessárias:
     ```bash
     php artisan migrate
     ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   php artisan serve
   ```
   - O servidor estará disponível em `http://localhost:8000`.
   - 
3. **Inicie o FrontEnd**
   - O front-end pode ser iniciado utilizando a extensão Live Server do VS Code.

## Funcionalidades do Sistema

1. **Cadastro de Usuário:** Permite que novos usuários se registrem com e-mail e senha, armazenando as credenciais de login de forma segura.
2. **Login:** Gera um token JWT quando o usuário fornece credenciais corretas. Esse token é retornado ao usuário para acessar rotas protegidas.
3. **Verificação de Sessão:** Cada requisição a uma rota protegida valida o token JWT, garantindo que o usuário esteja autenticado.
4. **Logout:** Invalida o token JWT para finalizar a sessão do usuário de forma segura.

## Rotas da API

Abaixo estão as rotas principais da API para interação com o sistema de autenticação:

- **POST /api/register:** Registra um novo usuário.
  - **Parâmetros:** `name`, `email`, `password`
  - **Resposta:** Confirmação do registro.

  ```bash
  curl -X POST http://localhost:8000/api/register -H "Content-Type: application/json" -d '{"name": "Seu Nome", "email": "seuemail@example.com", "password": "suasenha"}'
  ```

- **POST /api/login:** Autentica o usuário e gera um token JWT.
  - **Parâmetros:** `email`, `password`
  - **Resposta:** Token JWT para uso nas rotas protegidas.

  ```bash
  curl -X POST http://localhost:8000/api/login -H "Content-Type: application/json" -d '{"email": "seuemail@example.com", "password": "suasenha"}'
  ```

- **GET /api/user:** Retorna as informações do usuário autenticado.
  - **Cabeçalho:** `Authorization: Bearer {token}`
  - **Resposta:** Dados do usuário autenticado.

  ```bash
  curl -X GET http://localhost:8000/api/user -H "Authorization: Bearer {token}"
  ```

- **POST /api/logout:** Invalida o token JWT do usuário.
  - **Cabeçalho:** `Authorization: Bearer {token}`
  - **Resposta:** Confirmação do logout.

  ```bash
  curl -X POST http://localhost:8000/api/logout -H "Authorization: Bearer {token}"
  ```

## Front-end e Comunicação com o Back-end

O front-end foi projetado para cadastro e login de usuários, usando HTML, CSS e JavaScript. A comunicação com o back-end é feita via Axios, enviando tokens JWT nas requisições protegidas.

Exemplo de requisição com Axios:
```javascript
axios.post('/api/login', {
  email: 'usuario@exemplo.com',
  password: 'senha'
}).then(response => {
  const token = response.data.token;
  localStorage.setItem('token', token);
}).catch(error => {
  console.error('Erro ao autenticar', error);
});
```
