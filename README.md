# PGDH - Plataforma Gamificada de Desenvolvimento de Habilidades

Este projeto é uma plataforma educacional interativa desenvolvida com as mais recentes tecnologias web. O objetivo do **PGDH** é oferecer uma experiência de Onboarding (integração) engajadora através de elementos de gamificação, e uma interface de Chat inteligente (estilo Mentor de IA) integrada com fluxos automatizados.

## 🚀 Tecnologias Utilizadas

- **Angular 21**: Framework base do projeto, utilizando a nova arquitetura de Standalone Components.
- **Signals**: Gerenciamento de estado reativo e nativo do Angular para troca de dados entre os componentes.
- **Zoneless Change Detection**: Projeto configurado sem a dependência do _zone.js_ para ganho máximo de performance (`provideZonelessChangeDetection`).
- **Tailwind CSS (v3) + Typography**: Framework utilitário CSS para estilizações responsivas, _Dark Mode_ elegante e criação de interfaces em _Glassmorphism_. O plugin `@tailwindcss/typography` é usado para estilizar os blocos de Markdown.
- **Lucide Angular**: Biblioteca de ícones moderna e leve.
- **Marked & DOMPurify**: Ferramentas usadas para converter respostas da IA (em Markdown) para HTML seguro contra falhas de segurança (XSS) renderizado diretamente no chat.

---

## 🗺️ Estrutura do Projeto (Views)

A plataforma é dividida em dois fluxos principais:

### 1. The Quest (`/quest`)

A tela de boas-vindas gamificada.

- **Visual**: Design em _Glassmorphism_ com tema _Dark Mode_, gradientes baseados na classe escolhida e animações de _hover_ refinadas.
- **Funcionalidade**: O usuário ("Herói") deve escolher uma das trilhas de estudo (ex: Back-End, Front-End, Fullstack, QA, DevOps). A escolha é salva globalmente na aplicação e o redireciona para a próxima fase da jornada.

### 2. The Forge (`/forge`)

A interface do Mentor / Chat.

- **Visual**: Layout similar às principais IAs conversacionais do mercado (ChatGPT/Claude), com uma coluna centralizada e de largura controlada (`max-w-5xl`) para facilitar a leitura. Possui uma _Sidebar_ que resume o _Status do Herói_ (trilha escolhida na view anterior).
- **Funcionalidade**: Integração com API (N8N) via requisições assíncronas no padrão Angular (`HttpClient`). Conta com renderização dinâmica de **Markdown** para formatar a resposta das IAs com tabelas, negritos e blocos de código formatados com estilos do Tailwind. Conta também com efeitos visuais como _Shimmer Loading_ enquanto aguarda a resposta do N8N.

---

## 🏗️ Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado v20+).
- NPM (incluso no Node.js).

### Passos

1. Clone ou baixe este repositório.
2. Instale as dependências executando o comando na raiz do projeto:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   ng serve
   ```
4. Abra o navegador e acesse: [http://localhost:4200](http://localhost:4200).

---

## 🔌 Integração N8N (Webhook)

O serviço `N8nApiService` (`src/app/core/services/n8n-api.service.ts`) gerencia as requisições enviadas ao painel do N8N.

O payload enviado ao back-end (N8N) a cada mensagem enviada pelo usuário segue o formato:

```json
{
  "subject": "Front-End",
  "user_prompt": "Como funciona o CSS Grid?"
}
```

Para garantir que tudo funcione, lembre-se de sempre manter o seu Workflow no painel do N8N configurado como **Active/Ativo**.
