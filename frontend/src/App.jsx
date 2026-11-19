import Titulo from "./components/Titulo.jsx";

export default function App() {
  return (
    <main className="app">
      <Titulo />
      <small>CineTrack © {new Date().getFullYear()}</small>
    </main>
  );
}