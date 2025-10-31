# Rick and Morty

Aplicação Angular moderna com SSR que consome a API pública do Rick and Morty para explorar personagens, localizações e episódios. Deploy e repositório:

- Demo (SSR): <https://rick-morty-henrique.vercel.app/>
- Repositório: <https://github.com/Henrique0498/rick-and-morty>

Tempo total de desenvolvimento: 4 dias.

## Usuário de Teste (pré-carregado)

Use este usuário para login imediato:

- E-mail: <henrique@example.com>
- Senha: 1234

Você também pode se cadastrar via página de cadastro (mock) e entrar automaticamente após o cadastro.

## Tecnologias

- Angular 20 (standalone components) + SSR (@angular/ssr)
- NgRx Store (estado de autenticação, persistência em localStorage)
- RxJS (streams e controle de estado reativo)
- Bootstrap 5 + SCSS (UI responsiva)
- ngx-toastr (notificações)
- @ng-icons/heroicons (ícones)

## Páginas e Fluxos

- Autenticação
- Login: formulário com validação, loading e feedback via Toastr; após sucesso, redireciona para o dashboard.
- Cadastro: formulário com validação, confirmação de senha e login automático após cadastro.
- Logout centralizado: via AuthService.logout(), limpa store/localStorage e redireciona para /auth/login.

- Dashboard (`/`)
- Apresentação do projeto, atalhos para features e estatísticas ao vivo (contagem de personagens, episódios e localizações) consumidas da API.

- Personagens (`/characters`)
- Lista com busca por nome e paginação infinita (IntersectionObserver).
- Estado de busca persistido ao navegar entre rotas (termo e página retornam ao voltar).
- Detalhes (`/characters/:id`): status, espécie, gênero (pipe de formatação), origem e localização.

- Localizações (`/locations`)
- Lista com busca por nome e paginação infinita.
- Detalhes (`/locations/:id`): tipo, dimensão e residentes.

- Episódios (`/episodes`)
- Lista com busca por nome e paginação infinita.
- Detalhes (`/episodes/:id`): código, nome, data e personagens participantes.

- Não encontrado (`*`)
- Página 404 para rotas inexistentes.

  Observação: existe uma página de Perfil (em construção) nas rotas lazy.

## Versão Mobile

- Layout responsivo com Bootstrap 5.
- Sidebar com auto-fechamento ao clicar em links quando a largura da janela < 768px.
- Inputs e tabelas adaptados para telas pequenas.

## Arquitetura e Como Funciona

- SSR e Prerender
- Rotas estáticas são prerenderizadas; rotas dinâmicas usam renderização no servidor.
- Server custom em `src/server.ts` (Express) para integração SSR.

- Estado e Persistência
- Auth no NgRx: loginSuccess e logout atualizam store e localStorage (user e token).
- Na inicialização, o estado lê user/token do localStorage para evitar logout ao recarregar.

- Busca com Estado Persistente
- Serviços de estado (Characters/Episodes/Locations) guardam termo da busca, página e resultados acumulados (BehaviorSubject), mantendo a posição ao navegar.

- Detecção de Mudanças Zoneless
- O app usa provideZonelessChangeDetection(). Operações assíncronas disparam `ChangeDetectorRef.detectChanges()` em pontos-chave (ex.: ao setar loading) para refletir o UI imediatamente.

- Serviços de API DRY
- `BaseApiService` padroniza `findAll` e `findOne`; serviços específicos apenas configuram baseUrl e tipos.

## API

API pública: <https://rickandmortyapi.com/>

Endpoints principais utilizados:

- `GET /character` e `GET /character/:id`
- `GET /location` e `GET /location/:id`
- `GET /episode` e `GET /episode/:id`

## 🛠️ Como rodar

Pré-requisitos: Node 18+ e npm.

Instalação:

```bash
git clone https://github.com/Henrique0498/rick-and-morty
cd rick-and-morty
npm install
```

Desenvolvimento:

```bash
npm start
# app em http://localhost:4200/
```

Build de produção + SSR:

```bash
npm run build
npm run serve:ssr:rick-and-morty
# SSR em http://localhost:4000/ (conforme config do Angular SSR)
```

## Testes

```bash
npm test
```

## Estrutura de Pastas (resumo)

```text
src/
├── app/
│   ├── app.config.ts              # Providers (SSR, NgRx, HTTP, Toastr, Zoneless, etc.)
│   ├── app.routes*.ts             # Rotas do app e do servidor
│   ├── core/
│   │   ├── guards/                # Auth guard
│   │   ├── services/
│   │   │   ├── apis/              # Serviços de API (BaseApiService e recursos)
│   │   │   └── auth.service.ts    # Mock de autenticação (login/register/logout)
│   │   └── store/auth/            # NgRx: actions, reducer, selectors, state
│   ├── features/
│   │   ├── auth/                  # Login e Cadastro (sing-up)
│   │   ├── dashboards/            # Dashboard inicial
│   │   ├── characters/            # Lista e detalhes de personagens
│   │   ├── locations/             # Lista e detalhes de localizações
│   │   ├── episodes/              # Lista e detalhes de episódios
│   │   └── notfound/              # Página 404
│   └── shared/
│       ├── components/            # Header, Sidebar, etc.
│       └── pipes/                 # Pipes utilitários (ex.: gender-format)
├── main.ts                        # Bootstrap do app
├── main.server.ts                 # Bootstrap SSR
├── server.ts                      # Server Express p/ SSR
└── styles.scss                    # Estilos globais
```

## O que foi feito até aqui

- Dashboard com destaques, atalhos e estatísticas em tempo real.
- Busca com estado persistido em Characters/Episodes/Locations e scroll infinito.
- Sidebar com auto-fechamento no mobile (<768px).
- SSR: ajuste de prerender para rotas estáticas e renderização server-side para dinâmicas.
- Limpeza de warnings de build e budgets ajustados.
- Autenticação: persistência em localStorage, leitura na inicialização, logout centralizado.
- Correções de UX no modo zoneless (loading imediato em Login e Cadastro).
- Serviços DRY com BaseApiService e tipos padronizados.

## Observações

- Autenticação é mockada.
- Rotas e nomes: a rota de cadastro está como `/auth/sing-up` por convenção interna deste projeto.

  ***

  Feito com Angular 20 e em 4 dias.
