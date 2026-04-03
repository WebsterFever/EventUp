# EventUp - TP2

Este projeto corresponde ao segundo Teste de Performance (TP2) da disciplina de Desenvolvimento Front-End com Frameworks.

Nesta etapa, o foco está na implementação prática da aplicação utilizando ReactJS, com base nas histórias de usuário definidas anteriormente, priorizando a criação de componentes reutilizáveis e uma interface responsiva seguindo a abordagem Mobile-First.

---

## 🎯 Objetivo do TP2

Desenvolver uma aplicação web do tipo Single Page Application (SPA), utilizando ReactJS, que permita a visualização de eventos, com consumo de dados de uma API externa e foco na experiência do usuário em dispositivos móveis.

---

## 👤 História de Usuário Implementada

### História de Usuário 1 – Descobrir eventos relevantes

Como participante,  
eu quero visualizar uma lista de eventos disponíveis,  
para que eu possa encontrar atividades que sejam do meu interesse.

---

## ✅ Critérios de aceitação

- A aplicação deve exibir uma lista de eventos contendo:
  - título
  - data
  - localização
- Os eventos devem ser carregados a partir de uma API externa
- O usuário deve conseguir clicar em um evento para visualizar seus detalhes
- A interface deve ser responsiva, adaptando-se a diferentes tamanhos de tela
- Deve existir um indicador de carregamento durante a busca dos dados

---

## 📌 Tipos de requisitos atendidos

### Funcionais:
- Listar eventos
- Visualizar detalhes de eventos
- Consumir dados de uma API externa

### Não funcionais:
- Responsividade
- Usabilidade
- Performance (indicador de carregamento)

---

## ⚛️ Tecnologias utilizadas

- ReactJS
- Vite
- JavaScript
- CSS (Mobile-First)

---

## 🧩 Estrutura da aplicação

A aplicação foi organizada utilizando componentes reutilizáveis:

```bash
src/
  components/
    EventCard.jsx
    EventList.jsx
  pages/
    Home.jsx
    EventDetails.jsx