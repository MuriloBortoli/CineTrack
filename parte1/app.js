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

renderizarCards(filmesIniciais)

const TOTAL = filmesIniciais.length;
document.querySelector('footer small').textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados.`;