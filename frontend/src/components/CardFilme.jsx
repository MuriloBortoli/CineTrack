function estrelas(nota) {
  return "★".repeat(nota) + "✩".repeat(5 - nota);
}

const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function CardFilme({ filme }) {
  return (
    <article className="card">
      <img src={filme.poster} alt={`Poster ${filme.titulo}`} />
      <h2>{filme.titulo}</h2>
      <p>{filme.ano} · {filme.genero}</p>
      <p>Nota: {estrelas(filme.nota)}</p>
      <p className={`badge ${filme.status}`}>{ROTULOS[filme.status]}</p>
      <div className="acoes">
        <button>Editar</button>
        <button>Remover</button>
      </div>
    </article>
  );
}

export default CardFilme;