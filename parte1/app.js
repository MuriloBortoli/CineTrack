function rotuloStatus(status) {
    if (status === 'assistido') {
        return 'Assistido'
    }
    if (status === 'assistindo') {
        return 'Assistindo'
    }
    if (status === 'quero assistir') {
        return 'Quero assistir'
    }
    else {
        return status
    }
}

const estrelas = (nota) => {
    let resultado = ''
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? '★' : '☆';
        
    }
    return resultado
}


const filmesIniciais = [
    {
        id: 'origem',
        titulo: 'A Origem',
        ano: 2010,
        genero: 'Ficção Científica',
        poster: 'poster/A_Origem_400.png',
        nota: 5,
        status: 'assistido',
        comentario: ''
},
    {
        id: 'parasita',
        titulo: 'Parasita',
        ano: 2019,
        genero: 'Suspense',
        poster: 'poster/Parasita_400.webp',
        nota: 4,
        status: 'assistido',
        comentario: ''

    
    },
    {
        id: 'autodacompadeida',
        titulo: 'O auto da compadecida',
        ano: 2000,
        genero: 'Comédia',
        poster: 'poster/Auto_da_Compadecida_400.webp',
        nota: 5,
        status: 'assistido',
        comentario: ''
    },
    {
        id: 'Duna',
        titulo: 'Duna: Parte Dois',
        ano: 2024,
        genero: 'Ficção Científica',
        poster: 'poster/Duna_parteDois_400.webp',
        nota: 5,
        status: 'assistindo',
        comentario: ''
    },
    {
        id: 'Interestelar',
        titulo: 'Interestelar',
        ano: 2014,
        genero: 'Ficção Científica',
        poster: 'poster/Interestelar_400.webp',
        nota: 5,
        status: 'quero assistir',
        comentario: ''
    },
    {
        id: 'cidadedeDeus',
        titulo: 'Cidade de Deus',
        ano: 2010,
        genero: 'Drama e Crime',
        poster: 'poster/CIdade_de_Deus_400.webp',
        nota: 5,
        status: 'assistido',
        comentario: ''
    }
]

let filmes = [...filmesIniciais];
let statusAtual = 'todos';

function renderizarCards(lista) {
  const containerLista = document.querySelector('#lista');
  
  const htmlCards = lista.map((filme) => {
    return `
      <article class="card" data-id="${filme.id}">
        <img src="${filme.poster}" alt="Poster ${filme.titulo}">
        <h2>${filme.titulo}</h2>
        <p>${filme.ano} - ${filme.genero}</p>
        <p>Nota: ${estrelas(filme.nota)}</p>
        <p class="badge ${filme.status}">${rotuloStatus(filme.status)}</p>
        <div class="acoes">
          <button class="btn-editar">Editar</button>
          <button class="btn-remover">Remover</button>
        </div>
      </article>
    `;
  }).join(""); 

  containerLista.innerHTML = htmlCards;
}

function atualizarRodape() {
  const TOTAL = filmes.length;
  document.querySelector('footer small').textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados.`;
}

function atualizar() {
  const visiveis = filmes.filter((f) => statusAtual === 'todos' || f.status === statusAtual);
  renderizarCards(visiveis);
  atualizarRodape();
}

const listaContainer = document.querySelector('#lista');

listaContainer.addEventListener('click', (e) => {
  const botaoRemover = e.target.closest('.btn-remover');
  if (!botaoRemover) return;

  if (!confirm('Remover este filme?')) return;

  const card = botaoRemover.closest('.card');
  const id = card.dataset.id;

  filmes = filmes.filter((f) => String(f.id) !== String(id));
  atualizar();
});

const navFiltros = document.querySelector('nav');

navFiltros.addEventListener('click', (e) => {
  const botao = e.target.closest('button');
  if (!botao) return;

  navFiltros.querySelector('.ativo')?.classList.remove('ativo');
  botao.classList.add('ativo');

  statusAtual = botao.dataset.status;
  atualizar();
});

atualizar();