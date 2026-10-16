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