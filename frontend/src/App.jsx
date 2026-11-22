
import { useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

function App() {
  const [filmes, setFilmes] = useState(filmesIniciais);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null);

  function adicionar(novoFilme) {
    setFilmes((anteriores) => [
      ...anteriores,
      {
        ...novoFilme,
        id: gerarId(anteriores),
      },
    ]);
  }

  function remover(id) {
    if (!window.confirm("Remover este filme?")) return;
    setFilmes((anteriores) => anteriores.filter((f) => f.id !== id));
  }

  function editar(id, alteracoes) {
    setFilmes((anteriores) =>
      anteriores.map((f) => (f.id === id ? { ...f, ...alteracoes } : f))
    );
  }

  function salvar(dados) {
    if (editando.id) {
      editar(editando.id, dados);
    } else {
      adicionar(dados);
    }

    setEditando(null);
  }

  const visiveis = filmes
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <Filtros ativo={status} aoMudar={setStatus} />
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={remover}
      />
      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}

export default App;