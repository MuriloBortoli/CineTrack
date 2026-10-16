function rotuloStatus(status) {
  if (status === 'assistido') return 'Assistido';
  if (status === 'assistindo') return 'Assistindo';
  if (status === 'quero') return 'Quero assistir';
  return status;
}

const estrelas = (nota) => {
  let resultado = '';
  for (let i = 1; i <= 5; i++) {
    resultado += i <= nota ? '★' : '☆';
  }
  return resultado;
};

const filmesIniciais = [
  { id: 1, titulo: 'A Origem', ano: 2010, genero: 'Ficção Científica', poster: 'poster/A_Origem_400.png', nota: 5, status: 'assistido', comentario: '' },
  { id: 2, titulo: 'Parasita', ano: 2019, genero: 'Suspense', poster: 'poster/Parasita_400.webp', nota: 4, status: 'assistido', comentario: '' },
  { id: 3, titulo: 'O auto da compadecida', ano: 2000, genero: 'Comédia', poster: 'poster/Auto_da_Compadecida_400.webp', nota: 5, status: 'assistido', comentario: '' },
  { id: 4, titulo: 'Duna: Parte Dois', ano: 2024, genero: 'Ficção Científica', poster: 'poster/Duna_parteDois_400.webp', nota: 5, status: 'assistindo', comentario: '' },
  { id: 5, titulo: 'Interestelar', ano: 2014, genero: 'Ficção Científica', poster: 'poster/Interestelar_400.webp', nota: 5, status: 'quero', comentario: '' },
  { id: 6, titulo: 'Cidade de Deus', ano: 2010, genero: 'Drama e Crime', poster: 'poster/CIdade_de_Deus_400.webp', nota: 5, status: 'assistido', comentario: '' }
];


const CHAVE = 'cinetrack:filmes';

const salvar = () => localStorage.setItem(CHAVE, JSON.stringify(filmes));

function carregar() {
  const txt = localStorage.getItem(CHAVE);
  return txt ? JSON.parse(txt) : [...filmesIniciais];
}

let filmes = carregar();
let termoAtual = '';
let statusAtual = 'todos';
let editandoId = null; 

const listaContainer = document.querySelector('#lista');
const modal = document.querySelector('#modal');
const form = document.querySelector('#form-filme');
const tituloModal = document.querySelector('#titulo-modal');
const navFiltros = document.querySelector('nav');
const busca = document.querySelector('#busca');


function validarFilme(filme) {
  const erros = [];
  if (!filme.titulo) erros.push('Título obrigatório');
  if (filme.ano < 1888 || filme.ano > 2030) erros.push('Ano inválido');
  return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

function aplicarFiltros(lista, opcoes) {
  const termo = opcoes.termo.toLowerCase();
  return lista
    .filter((f) => f.titulo.toLowerCase().includes(termo))
    .filter((f) => opcoes.status === 'todos' || f.status === opcoes.status);
}

function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}


function criarCard(f) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = f.id;

  const img = document.createElement('img');
  if (f.poster) img.src = f.poster;
  img.alt = `Poster ${f.titulo}`;

  const titulo = document.createElement('h2');
  titulo.textContent = f.titulo; 

  const info = document.createElement('p');
  info.textContent = `${f.ano} - ${f.genero}`;

  const nota = document.createElement('p');
  nota.textContent = `Nota: ${estrelas(f.nota)}`;

  const badge = document.createElement('p');
  badge.className = `badge ${f.status}`;
  badge.textContent = rotuloStatus(f.status);

  const acoes = document.createElement('div');
  acoes.className = 'acoes';

  const btnEditar = document.createElement('button');
  btnEditar.className = 'btn-editar';
  btnEditar.textContent = 'Editar';

  const btnRemover = document.createElement('button');
  btnRemover.className = 'btn-remover';
  btnRemover.textContent = 'Remover';

  acoes.append(btnEditar, btnRemover);
  card.append(img, titulo, info, nota, badge, acoes);
  return card;
}

function renderizarCards(lista) {
  const frag = document.createDocumentFragment();
  lista.forEach((f) => frag.appendChild(criarCard(f)));
  listaContainer.replaceChildren(frag); 
}

function atualizarRodape() {
  const TOTAL = filmes.length;
  document.querySelector('footer small').textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados.`;
}

function atualizar() {
  const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual });
  renderizarCards(visiveis);
  atualizarRodape();
}


const abrir = () => (modal.hidden = false);
const fechar = () => (modal.hidden = true);


document.querySelector('#adicionar').addEventListener('click', () => {
  editandoId = null;
  form.reset();
  tituloModal.textContent = 'Adicionar filme';
  abrir();
});


document.querySelector('#cancelar').addEventListener('click', fechar);


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) {
    fechar();
  }
});


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dados = Object.fromEntries(new FormData(form));
  dados.titulo = dados.titulo.trim();
  dados.ano = Number(dados.ano);   
  dados.nota = Number(dados.nota);

  const { valido, erros } = validarFilme(dados);
  if (!valido) {
    alert(erros.join('\n'));
    return;
  }

  if (editandoId !== null) {
    filmes = filmes.map((f) => (f.id === editandoId ? { ...f, ...dados } : f));
  } else {
    filmes = [...filmes, { id: gerarId(filmes), ...dados }];
  }

  salvar();
  atualizar();
  fechar();
});


listaContainer.addEventListener('click', (e) => {
  const botaoEditar = e.target.closest('.btn-editar');
  if (botaoEditar) {
    const card = botaoEditar.closest('.card');
    editandoId = Number(card.dataset.id);
    const f = filmes.find((x) => x.id === editandoId);

    form.elements.titulo.value = f.titulo;
    form.elements.ano.value = f.ano;
    form.elements.genero.value = f.genero;
    form.elements.poster.value = f.poster ?? '';
    form.elements.status.value = f.status;
    form.elements.nota.value = f.nota;
    form.elements.comentario.value = f.comentario ?? '';

    tituloModal.textContent = 'Editar filme';
    abrir();
    return;
  }

  const botaoRemover = e.target.closest('.btn-remover');
  if (!botaoRemover) return;
  if (!confirm('Remover este filme?')) return;

  const id = Number(botaoRemover.closest('.card').dataset.id);
  filmes = filmes.filter((f) => f.id !== id);
  salvar();
  atualizar();
});


navFiltros.addEventListener('click', (e) => {
  const botao = e.target.closest('button');
  if (!botao) return;

  navFiltros.querySelector('.ativo')?.classList.remove('ativo');
  botao.classList.add('ativo');

  statusAtual = botao.dataset.status;
  atualizar();
});


const aoDigitar = (e) => {
  termoAtual = e.target.value;
  atualizar();
};

busca.addEventListener('input', debounce(aoDigitar, 300));

atualizar();