# Weather Information App

Aplicação que fornece informações meteorológicas e registra as interações do usuário. A aplicação é composta por um backend em Django e um frontend em React.

## Funcionalidades

- Consultar informações meteorológicas de uma cidade especificada pelo usuário.
- Exibir a temperatura, descrição, latitude e longitude da cidade consultada.
- Armazenar e exibir um histórico de interações.
- Limpar o histórico de interações.

## Tecnologias Utilizadas

- Backend: Django, Django REST Framework
- Frontend: React, Axios
- API de Dados Meteorológicos: OpenWeatherMap

## Como Executar a Aplicação

### Pré-requisitos

- Python 3.x
- Node.js
- npm ou yarn

### Backend (Django)

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/weather-information-app.git
   cd weather-information-app
Crie um ambiente virtual e ative-o:

bash
Copy code
python -m venv myenv
source myenv/bin/activate  # Linux/Mac
myenv\Scripts\activate  # Windows
Instale as dependências:

bash
Copy code
pip install -r requirements.txt
Execute as migrações:

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Inicie o servidor Django:

bash
Copy code
python manage.py runserver
Frontend (React)
Navegue até o diretório do frontend:

bash
Copy code
cd frontend
Instale as dependências:

bash
Copy code
npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:

bash
Copy code
npm start
# ou
yarn start
Uso
Abra o navegador e acesse http://localhost:3000.
Digite o nome de uma cidade e clique em "GET NO BIXO" para obter informações meteorológicas.
Veja as interações anteriores listadas em uma tabela.
Use o botão "Limpar Interações" para limpar o histórico de interações.
Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature ou correção de bug (git checkout -b feature/nome-da-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Envie para a branch (git push origin feature/nome-da-feature).
Abra um Pull Request.



