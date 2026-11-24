
import { useState } from "react";


const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  poster: "",
  status: "quero",
  nota: 3,
  comentario: "",
};

function ModalFilme({ filme, erro, aoSalvar, aoFechar }) {
  const [dados, setDados] = useState({
    ...VAZIO,
    ...filme,
  });

  function atualizar(campo, valor) {
    setDados((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  function submeter(evento) {
    evento.preventDefault();
    aoSalvar({
      ...dados,
      ano: Number(dados.ano),
      nota: Number(dados.nota),
    });
  }

  return (
    <div id="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
      <div className="modal-conteudo">
        <h2 id="titulo-modal">
          {filme.id ? "Editar filme" : "Adicionar filme"}
        </h2>
        <form id="form-filme" onSubmit={submeter}>
          <div className="campo">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              value={dados.titulo}
              onChange={(e) => atualizar("titulo", e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="ano">Ano</label>
            <input
              id="ano"
              type="number"
              min="1888"
              max="2030"
              value={dados.ano}
              onChange={(e) => atualizar("ano", e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="genero">Gênero</label>
            <input
              id="genero"
              value={dados.genero}
              onChange={(e) => atualizar("genero", e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="poster">URL do pôster (opcional)</label>
            <input
              id="poster"
              value={dados.poster}
              onChange={(e) => atualizar("poster", e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={dados.status}
              onChange={(e) => atualizar("status", e.target.value)}
            >
              <option value="quero">Quero assistir</option>
              <option value="assistindo">Assistindo</option>
              <option value="assistido">Assistido</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="nota">Nota (1 a 5)</label>
            <input
              id="nota"
              type="number"
              min="1"
              max="5"
              value={dados.nota}
              onChange={(e) => atualizar("nota", e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="comentario">Comentário (opcional)</label>
            <input
              id="comentario"
              value={dados.comentario}
              onChange={(e) => atualizar("comentario", e.target.value)}
            />
          </div>

          {erro && <p className="erro" role="alert">{erro}</p>}

          <div className="acoes-form">
            <button type="button" onClick={aoFechar}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalFilme;