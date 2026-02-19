<br clear="both">

<h1 align="center">Auth Application</h1>

###

<p align="center">Esta é uma aplicação de autenticação completa, desenvolvida para demonstrar fluxos de login e gerenciamento de usuários utilizando containers.</p>

###

<h2 align="left">💻Pré-requisitos</h2>

###

<p align="left">Antes de começar, você precisará ter instalado em sua máquina:<br><br>- Docker<br>
  
  ![Docker](./assets/DockerDesk.GIF)
  https://docs.docker.com/desktop/setup/install/windows-install/
  
  <br>- Git<br>
  
  ![Git](./assets/Git.GIF)</p>
  https://git-scm.com/install/windows

###

<h2 align="left">🏃Como Rodar a Aplicação</h2>

###

<p align="left">Siga os passos abaixo para colocar o projeto em execução:<br><br>1. Clonar o Repositório<br><br>Abra o seu terminal e execute:<br>
  
```bash
git clone https://github.com/joaocastro2/Auth.git
cd CAMINHO_DO_REPOSITORIO
```
<br><br>
  2. Configurar Variáveis de Ambiente<br><br>O projeto depende de variáveis de ambiente para funcionar.<br>Copie o arquivo de exemplo e cole ma pasta raiz do seu projeto:
<br>

```bash
DB_NAME=NOME_BANCO
DB_PORT=5432
DB_USER=SEU_USUARIO
DB_PASSWORD=SUA_SENHA
MAIL_USERNAME=SEU_EMAIL
MAIL_PASSWORD=SENHA_DE_APP
API_URL=http://localhost:8080
```

<br>Depois abra a pasta "frontend/src", crie outro arquivo .env e adicione:<br>

```bash
VITE_API_URL=http://localhost:8080
```

<br>Abra os arquivos .env e preencha com as suas configurações.<br><br><br>2.1. No campo "MAIL_PASSWORD"
será preciso colocar uma senha de app do gmail para conseguir realizar o envio do token, para conseguir essa senha, será preciso criar uma nova senha de app:<br><br>Defina um nome para sua senha de app, clique em criar e guarde o código, ele será usado para definir sua variável de ambiente

![SenhaApp](./assets/SenhaDeApp.GIF)
<br>https://myaccount.google.com/apppasswords

<br><br>3. Subir o Docker<br><br>Com o Docker aberto, execute o comando:<br>

```bash
docker-compose up -d
```
Isso irá baixar as imagens necessárias e subir os containers em segundo plano.</p>

###

<h2 align="left">⚙️Configuração Pós-Instalação</h2>

###

<p align="left">Para testar o fluxo completo, você precisará ajustar o usuário de teste que já vem pré-cadastrado no banco de dados:<br><br>Acesse o terminal na pasta do seu projeto e execute:<br><br>
  
```bash
docker exec -it auth-db psql -U SEU_USUARIO_AQUI -d SEU_BANCO_AQUI -c "UPDATE customers SET email = 'EMAIL_PARA_TOKEN' WHERE cnpj = '12345678000199';"
```
###

<h2 align="left">🚀Testando a Aplicação</h2>

###

<p align="left">Após seguir os passos acima, a aplicação estará disponível em: http://localhost:5173<br><br>Login: Utilize o cnpj que estará previamente cadastrado no banco "12345678000199". <br>Após isso chegará um token no e-mail cadastrado.<br><br>Logs: Para visualizar o que está acontecendo em tempo real, use docker-compose logs -f.</p>

###
