# Rick and Morty Explorer 🛸

Uma aplicação Angular moderna que utiliza a API pública do Rick and Morty para explorar o universo da série. Este projeto apresenta informações detalhadas sobre personagens, localizações e episódios da popular série animada.

## 🚀 Tecnologias Utilizadas

- **Angular 20.3.0** - Framework principal
- **Angular SSR** - Server-Side Rendering
- **NgRx Store** - Gerenciamento de estado
- **Bootstrap 5.3.8** - Framework CSS
- **RxJS** - Programação reativa
- **TypeScript** - Linguagem de programação

## 📋 Funcionalidades

### 🔐 Login

Página de autenticação para acesso ao sistema com formulário de login seguro.

### 🏠 Dashboard (`/`)

Página inicial com visão geral e estatísticas do universo Rick and Morty, apresentando dados gerais da API e navegação principal.

### 👥 Personagens (`/characters`)

Lista de personagens do universo Rick and Morty com informações básicas de cada personagem.

**Detalhes do Personagem (`/characters/:id`)**
Página dedicada com informações completas sobre um personagem específico, incluindo status, espécie, gênero, origem e localização atual.

### 🌍 Localizações (`/locations`)

Catálogo de todas as localizações e dimensões do universo Rick and Morty.

**Detalhes da Localização (`/locations/:id`)**
Informações detalhadas sobre uma localização específica, incluindo tipo, dimensão e lista de residentes conhecidos.

### 📺 Episódios (`/episodes`)

Lista completa de episódios da série com informações básicas de cada um.

**Detalhes do Episódio (`/episodes/:id`)**
Página com informações completas do episódio, incluindo código, nome, data de exibição e lista de personagens que aparecem.

## 🌐 API

Este projeto consome dados da [Rick and Morty API](https://rickandmortyapi.com/), uma API REST pública que fornece informações sobre:

- 826+ Personagens com detalhes individuais
- 126+ Localizações de diferentes dimensões
- 51+ Episódios com informações completas

### Endpoints Utilizados

- `GET /character` - Lista de personagens
- `GET /character/:id` - Detalhes de um personagem específico
- `GET /location` - Lista de localizações
- `GET /location/:id` - Detalhes de uma localização específica
- `GET /episode` - Lista de episódios
- `GET /episode/:id` - Detalhes de um episódio específico

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Henrique0498/rick-and-morty

# Navegue até o diretório
cd rick-and-morty

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm start

# Ou usando Angular CLI
ng serve
```

Acesse `http://localhost:4200/` no seu navegador.

### Build de Produção

```bash
# Build para produção
npm run build

# Servir aplicação com SSR
npm run serve:ssr:rick-and-morty
```

## 🧪 Testes

```bash
# Executar testes unitários
npm test

# Executar testes em modo watch
ng test --watch
```

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── app.config.server.ts     # Configuração do servidor SSR
│   ├── app.config.ts           # Configuração principal da aplicação
│   ├── app.html                # Template principal
│   ├── app.routes.server.ts    # Rotas do servidor
│   ├── app.routes.ts           # Configuração de rotas
│   ├── app.scss                # Estilos globais da aplicação
│   ├── app.spec.ts             # Testes do componente principal
│   ├── app.ts                  # Componente principal da aplicação
│   ├── features/               # Páginas e funcionalidades principais
│   │   ├── characters/         # Funcionalidade de personagens
│   │   │   └── pages/          # Páginas relacionadas a personagens
│   │   │       ├── characters.html
│   │   │       ├── characters.scss
│   │   │       └── characters.ts
│   │   ├── dashboard/          # Página inicial/dashboard
│   │   │   └── pages/          # Página do dashboard
│   │   │       ├── dashboard.html
│   │   │       ├── dashboard.scss
│   │   │       └── dashboard.ts
│   │   └── notfound/           # Página 404
│   │       └── page/           # Página de erro 404
│   │           ├── notfound.html
│   │           ├── notfound.scss
│   │           └── notfound.ts
│   └── shared/                 # Componentes e utilitários compartilhados
│       └── components/         # Componentes reutilizáveis
│           ├── button/         # Componente de botão customizado
│           │   ├── button.html
│           │   ├── button.scss
│           │   └── button.ts
│           └── header/         # Cabeçalho da aplicação
│               ├── header.html
│               ├── header.scss
│               └── header.ts
├── assets/                     # Recursos estáticos
│   └── images/                 # Imagens e ícones
├── index.html                  # Arquivo HTML principal
├── main.server.ts              # Ponto de entrada do servidor SSR
├── main.ts                     # Ponto de entrada da aplicação
├── server.ts                   # Configuração do servidor Express
└── styles.scss                 # Estilos globais SCSS
```

## 🎨 Estilização

O projeto utiliza Bootstrap 5 para um design responsivo e moderno, com customizações específicas em SCSS.

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e utiliza a API pública do Rick and Morty.
