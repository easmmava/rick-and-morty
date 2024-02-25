import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState(allCharacters);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results.slice(0,4)));
  }, []);


  return (
    <div className="app">
      <Navbar numOfResult={characters.length}/>
      <div className="main">
        <CharacterList characters={characters}/>
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
