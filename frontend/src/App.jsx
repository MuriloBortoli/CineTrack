
import { useState, useEffect } from "react";
import { listar, criar, atualizar, remover } from "./api.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [falha, setFalha] = useState(null);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, []);

 
  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`;
  }, [filmes.length]);

  function abrirModal(filme) {
    setFalha(null);
    setEditando(filme);
  }

  function fecharModal() {
    setFalha(null);
    setEditando(null);
  }


  async function salvar(filme) {
    try {
      if (filme.id) {
        const at = await atualizar(filme.id, filme);
        setFilmes((fs) => fs.map((f) => (f.id === at.id ? at : f)));
      } else {
        const novo = await criar(filme);
        setFilmes((fs) => [...fs, novo]);
      }
      fecharModal();
    } catch (e) {
      setFalha(`Não foi possível salvar: ${e.message}`);
    }
  }

  async function removerFilme(id) {
    if (!window.confirm("Remover este filme?")) return;
    try {
      await remover(id);
      setFilmes((fs) => fs.filter((f) => f.id !== id));
      setFalha(null);
    } catch (e) {
      setFalha(`Não foi possível remover: ${e.message}`);
    }
  }

  const visiveis = filmes
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );

  let conteudo;
  if (carregando) {
    conteudo = <p>Carregando...</p>;
  } else if (erro) {
    conteudo = <p className="erro">Erro: {erro}</p>;
  } else {
    conteudo = (
      <ListaFilmes
        filmes={visiveis}
        aoEditar={abrirModal}
        aoRemover={removerFilme}
      />
    );
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => abrirModal({})}
      />
      <Filtros ativo={status} aoMudar={setStatus} />
      <main>
        {falha && editando === null && (
          <p className="erro" role="alert">{falha}</p>
        )}
        {conteudo}
      </main>
      {editando !== null && (
        <ModalFilme
          filme={editando}
          erro={falha}
          aoSalvar={salvar}
          aoFechar={fecharModal}
        />
      )}
    </>
  );
}

export default App;