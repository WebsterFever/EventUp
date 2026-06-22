# EventUp (Web)

Aplicação web para descobrir e visualizar eventos musicais reais, construída com React + Vite, com autenticação via Firebase e dados ao vivo da API do Ticketmaster.

## Funcionalidades

- **Autenticação**: cadastro e login de usuário com Firebase Authentication
- **Listagem de eventos**: busca eventos musicais reais (Toronto) na API do Ticketmaster e exibe em cards
- **Detalhes do evento**: tela dedicada com imagem, data e local do evento selecionado
- **Navegação protegida**: usuário não logado só acessa Login/Cadastro; usuário logado acessa Home/Detalhes
- **Logout**: disponível na barra de navegação (Navbar)
- **Design responsivo**: layout se adapta a celular, tablet e desktop

## Tecnologias

- **React 19** + **Vite** — interface e build
- **Firebase Authentication** — cadastro/login de usuários
- **styled-components** — estilização de alguns componentes (Navbar, EventCard, telas de Login/Cadastro)
- **CSS Modules** — estilização das páginas (Home, EventDetails)
- **Ticketmaster Discovery API** — fonte dos dados de eventos reais
- **Cypress** — testes end-to-end

## Estrutura do projeto

```
eventup/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # barra de navegação (logo + logout)
│   │   ├── EventList.jsx       # busca eventos na API e renderiza os cards
│   │   ├── EventCard.jsx       # card individual de um evento
│   │   └── Alert.jsx           # mensagens de sucesso/erro (login/cadastro)
│   ├── pages/
│   │   ├── Home.jsx            # página inicial, mostra EventList
│   │   ├── EventDetails.jsx    # detalhes do evento selecionado
│   │   ├── LoginUsuario.jsx    # tela de login
│   │   └── CadastroUsuario.jsx # tela de cadastro
│   ├── service/
│   │   └── firebase.js         # configuração do Firebase
│   └── App.jsx                 # raiz da aplicação: controla autenticação e qual página é exibida
├── cypress/                    # testes end-to-end
└── .env                        # chaves de API (não versionado)
```

## Como o fluxo da aplicação funciona

A navegação **não usa React Router** — é controlada manualmente por um estado `page` dentro de `App.jsx` (`"cadastro"`, `"login"`, `"home"`, `"event"`), e por um estado `user` que vem do Firebase (`onAuthStateChanged`).

1. `main.jsx` renderiza `<App />` na div `#root`.
2. `App.jsx` decide o que mostrar:
   - Sem usuário logado → `LoginUsuario` ou `CadastroUsuario`.
   - Com usuário logado → `Navbar` + `Home` (ou `EventDetails`, se um evento foi selecionado).
3. `Home.jsx` renderiza `EventList.jsx`, que busca os eventos na API do Ticketmaster (`fetch`) e os exibe como `EventCard`s.
4. Clicar em um card chama `onSelect(evento)`, que sobe a cadeia de callbacks até `App.jsx`, guardando o evento escolhido e mudando `page` para `"event"`.
5. `EventDetails.jsx` mostra os dados desse evento, com botão de voltar para a Home.

## Configuração

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
VITE_TICKETMASTER_API_KEY=sua_chave_do_ticketmaster
VITE_FIREBASE_API_KEY=sua_chave_do_firebase
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Rodando o projeto

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` por padrão.

### Testes

```bash
npx cypress open
```


