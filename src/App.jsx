import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult, Search } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 4));
      } catch (err) {
        setCharacters([]);
        // console.log(err.response.data.error);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  // useEffect(() => {
  //   console.log("CALL EFFECT WITH QUERY CHANGES");
  // }, [query]);

const handleSelectCharacter = (id) => {
  setSelectedId(id);
};

console.log(selectedId);

return (
  <div className="app">
    <Toaster />
    <Navbar>
      <Search query={query} setQuery={setQuery} />
      <SearchResult numOfResult={characters.length} />
    </Navbar>

    <div className="main">
      <CharacterList
        characters={characters}
        isLoading={isLoading}
        onSelectCharacter={
          handleSelectCharacter
        }
      />
      <CharacterDetail selectedId={selectedId} />
    </div>
  </div>
);
}
export default App;
