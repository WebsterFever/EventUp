# EventUp Mobile - Versão React Native

Versão mobile do EventUp, construída com React Native e Expo, permitindo que os usuários descubram e visualizem eventos musicais reais.

## Funcionalidades

- **Autenticação**: cadastro e login com Firebase Authentication
- **Descoberta de eventos**: lista de eventos musicais reais (Toronto) vindos da API do Ticketmaster
- **Pull-to-refresh**: arraste a lista de eventos pra baixo para recarregar os dados
- **Detalhes do evento**: informações completas (local, data/hora, gêneros, faixa de preço)
- **Compra de ticket**: link direto para o Ticketmaster
- **Perfil**: visualização dos dados do usuário, foto de perfil (galeria), e logout

## Tecnologias

- **Framework**: React Native com Expo
- **Navegação**: React Navigation (Bottom Tabs + Stack Navigation)
- **Backend**: Firebase (Authentication)
- **UI**: NativeBase
- **API**: Ticketmaster Discovery API
- **Gerenciamento de estado**: React Hooks (`useState`, `useEffect`)
- **Ícones**: React Native Vector Icons

## Estrutura do projeto

```
EventUpMobileVersion/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.jsx          # Lista de eventos + pull-to-refresh
│   │   ├── ProfileScreen.jsx       # Perfil do usuário + logout
│   │   ├── LoginScreen.jsx         # Login
│   │   ├── SignupScreen.jsx        # Cadastro
│   │   ├── ForgotPasswordScreen.jsx# Recuperação de senha
│   │   └── EventDetailsScreen.jsx  # Detalhes e compra de ticket
│   ├── components/
│   │   └── HeaderRightActions.jsx  # Botões "Profile"/"Logout" no cabeçalho
│   └── service/
│       └── firebase.js             # Configuração do Firebase
├── App.jsx                         # Componente raiz: autenticação + navegação
├── app.json                        # Configuração do Expo
├── babel.config.js                 # Configuração do Babel
├── package.json                    # Dependências e scripts
├── .env                             # Variáveis de ambiente (não versionado)
└── README.md                       # Este arquivo
```

## Como o fluxo da navegação funciona

A navegação usa a biblioteca **React Navigation** (não é feita "na mão" como na versão web):

1. `App.jsx` escuta o login via `auth.onAuthStateChanged`.
2. Sem usuário logado → `AuthStack` (telas `Login` e `Signup`).
3. Com usuário logado → `MainStack`, que contém:
   - `MainTabs` (`AppTabs`) — as abas inferiores **Home** e **Profile**.
   - `EventDetails` — tela de detalhes, aberta por cima das abas (a barra de abas fica escondida nessa tela).
4. Tocar em um evento na Home chama `navigation.navigate('EventDetails', { event })`.
5. O cabeçalho (preto, com "Profile" e "Logout") aparece em todas as telas, configurado uma única vez em `headerScreenOptions` (`App.jsx`).

## Configuração

### Pré-requisitos

- Node.js e npm instalados
- Expo CLI: `npm install -g expo-cli` (opcional, pode usar `npx expo`)

### Instalação

```bash
cd EventUpMobileVersion
npm install
```

Crie um arquivo `.env` na raiz com suas credenciais (ver seção abaixo), depois:

```bash
npx expo start
```

### Rodando em dispositivos

```bash
npm run android   # Android
npm run ios       # iOS
npm run web       # Web (preview)
```

## Variáveis de ambiente

Crie um `.env` na raiz do projeto com (prefixo `EXPO_PUBLIC_` é obrigatório para o Expo expor a variável no app):

```
EXPO_PUBLIC_TICKETMASTER_API_KEY=sua_chave_do_ticketmaster
EXPO_PUBLIC_FIREBASE_API_KEY=sua_chave_do_firebase
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

## Integração com APIs

### Ticketmaster API
- Endpoint: `https://app.ticketmaster.com/discovery/v2/events.json`
- Busca eventos de música em Toronto (mesmo filtro usado na versão web)
- Retorna nome, data, local e imagem de cada evento

### Firebase
- **Authentication**: cadastro/login de usuários, e controle de quais telas o usuário pode acessar

## Limitações conhecidas

- A foto de perfil é escolhida da **galeria** do celular (não usa a câmera diretamente)
- Eventos vêm só do Ticketmaster, sem cache offline

## Resolução de problemas

### Problemas ao iniciar
- Limpar cache: `npx expo start -c`
- Limpar node_modules: `rm -rf node_modules && npm install`

### Problemas de conexão com Firebase
- Verifique se o `.env` tem as credenciais corretas
- Verifique as configurações do projeto no Firebase Console

### Problemas com a API do Ticketmaster
- Verifique se a chave de API é válida e não expirou
- Verifique os limites de requisição (rate limit) no painel do Ticketmaster Developer
