function Header() {
  return (
    <header>
      <h1>CineTrack</h1>
      <input id="busca" aria-label="Buscar filme" placeholder="Buscar filme..." />
      <button id="adicionar" aria-label="Adicionar filme">
        <span className="mobile" aria-hidden="true">+</span>
        <span className="desktop">+ Adicionar</span>
      </button>
    </header>
  );
}

export default Header;
