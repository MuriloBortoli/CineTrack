
function Header({ busca, aoBuscar, aoAdicionar }) {
  return (
    <header>
      <h1>CineTrack</h1>
      <input
        id="busca"
        aria-label="Buscar filme"
        placeholder="Buscar filme..."
        value={busca}
        onChange={(e) => aoBuscar(e.target.value)}
      />
      <button id="adicionar" aria-label="Adicionar filme" onClick={aoAdicionar}>
        <span className="mobile" aria-hidden="true">+</span>
        <span className="desktop">+ Adicionar</span>
      </button>
    </header>
  );
}

export default Header;