# PGDH - Plataforma Gamificada de Desenvolvimento de Habilidades

Este projeto é uma plataforma educacional interativa desenvolvida com as mais recentes tecnologias web. O objetivo do **PGDH** é oferecer uma experiência de Onboarding (integração) engajadora através de elementos de gamificação, e uma interface de Chat inteligente (estilo Mentor de IA) integrada com fluxos automatizados.

## 🚀 Tecnologias Utilizadas

- **Angular 21**: Framework base do projeto, utilizando a nova arquitetura de Standalone Components.
- **Signals**: Gerenciamento de estado reativo e nativo do Angular para troca de dados entre os componentes.
- **Zoneless Change Detection**: Projeto configurado sem a dependência do *zone.js* para ganho máximo de performance (`provideZonelessChangeDetection`).
- **Tailwind CSS (v3)**: Framework utilitário CSS para estilizações responsivas, *Dark Mode* elegante e criação de interfaces em *Glassmorphism*.
- **Lucide Angular**: Biblioteca de ícones moderna e leve.

---

## 🗺️ Estrutura do Projeto (Views)

A plataforma é dividida em dois fluxos principais:

### 1. The Quest (`/quest`)
A tela de boas-vindas gamificada.
- **Visual**: Design em *Glassmorphism* com tema *Dark Mode*, gradientes baseados na classe escolhida e animações de *hover* refinadas.
- **Funcionalidade**: O usuário ("Herói") deve escolher uma das trilhas de estudo (ex: Back-End, Front-End, Fullstack, QA, DevOps). A escolha é salva globalmente na aplicação e o redireciona para a próxima fase da jornada.

### 2. The Forge (`/forge`)
A interface do Mentor / Chat.
- **Visual**: Layout similar às principais IAs conversacionais do mercado (ChatGPT/Claude). Possui uma *Sidebar* que resume o *Status do Herói* (trilha escolhida na view anterior).
- **Funcionalidade**: Integração com API (N8N) via requisições assíncronas no padrão Angular (`HttpClient`). Conta com efeitos visuais como *Shimmer Loading* enquanto aguarda a resposta do webhook do N8N.

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
Atualmente, as requisições estão apontadas para uma `webhookUrl` genérica e são simuladas em caso de falha de conexão (para testar os fluxos da UI). 

Para conectar ao seu próprio fluxo real:
1. Abra o arquivo `n8n-api.service.ts`.
2. Substitua o valor de `webhookUrl` pela URL do seu webhook de produção/teste do N8N. O payload enviado segue o formato:
   ```json
   {
     "subject": "Front-End",
     "user_prompt": "Como funciona o CSS Grid?"
   }
   ```
