# CineTrack

O **CineTrack** é uma aplicação web para gerenciamento e acompanhamento de filmes assistidos e de interesse. O projeto foi desenvolvido como parte das atividades da disciplina de Programação de Sistemas Web da Universidade Estadual de Maringá (UEM).

---

## 🚀 Funcionalidades (Marco 1)

- **Catálogo de Filmes:** Visualização de cards dinâmicos com pôster, título, ano, gênero, nota em estrelas e badge de status.
- **Gerenciamento (CRUD em Memória):**
  - **Adicionar:** Cadastro de novos filmes via formulário modal com validação.
  - **Editar:** Alteração de dados de filmes existentes reabrindo o modal preenchido.
  - **Remover:** Exclusão de itens da lista com confirmação prévia.
- **Filtros por Status:** Visualização por categorias ("Todos", "Assistido", "Assistindo" e "Quero assistir").
- **Renderização Dinâmica e Segura:** Construção dos elementos com `createElement` e `DocumentFragment` para evitar vulnerabilidades de XSS.
- **Acessibilidade:** Estrutura HTML semântica e adaptada para leitores de tela.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da página, formulários e modal acessível.
- **CSS3:** Estilização responsiva com variáveis CSS, CSS Grid e Flexbox.
- **JavaScript (ES6+):** Manipulação do DOM, funções puras, eventos, delegação e FormData.

---

## 🔧 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/MuriloBortoli/CineTrack.git](https://github.com/MuriloBortoli/CineTrack.git)


# CineTrack

Aplicação para acompanhar filmes: cadastre, avalie, filtre e busque o que você já assistiu, está assistindo ou quer assistir.

**Autor(es):** [Murilo de Bortoli Agudo] · RA [142085]

## Versões

- **v1.0 (Parte 1):** frontend em HTML, CSS e JavaScript puro, em `parte1/`.
- **v2.0 (Parte 2):** aplicação full stack: interface React (Vite) em `frontend/` e API REST em Node.js/Express em `backend/`, com os dados em um arquivo JSON.

## Estrutura

```
cinetrack/
├── README.md
├── .gitignore
├── docs/
├── parte1/
├── backend/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   ├── .env.example
│   └── data/
│       └── filmes.json
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
```

## API

| Método | Rota | O que faz |
|--------|------|-----------|
| GET | `/filmes` | Lista os filmes (aceita `?status=`) |
| GET | `/filmes/:id` | Retorna um filme (404 se não existir) |
| POST | `/filmes` | Cria um filme (400 sem título ou ano; 201 se criado) |
| PUT | `/filmes/:id` | Atualiza um filme (404 se não existir) |
| DELETE | `/filmes/:id` | Remove um filme (204; 404 se não existir) |

## Como rodar o backend

Requer Node.js 20.6 ou superior.

```bash
cd backend
npm install
cp .env.example .env     # no Windows: copie o arquivo e renomeie para .env
npm run seed             # grava data/filmes.json com os 6 filmes iniciais
npm run dev              # servidor com recarga automática em http://localhost:3000
```

O `.env` não é versionado; o `.env.example` mostra as variáveis necessárias (`PORT`).

## Como rodar o frontend

Com o backend no ar, em outro terminal:

```bash
cd frontend
npm install
npm run dev              # abre em http://localhost:5173
```

Para gerar o build de produção: `npm run build`.

## Funcionalidades

- Lista de filmes em cards, carregada da API
- Busca por título e filtro por status, combinados
- Adicionar e editar filmes em um modal
- Remover filme com confirmação
- Estados de carregando, erro e lista vazia
- Mensagem visível quando uma operação falha