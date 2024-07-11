import { useEffect, useState } from 'react'
import './App.css'
import Character from './Character'
import Modal from './Modal';
import { Info, CharacterData, Response } from './@types';

const App = () => {
  const [info, setInfo] = useState({} as Info)
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>([]);
  const [charId, setCharId] = useState('');
  const [characterData, setCharacterData] = useState<CharacterData | null>(null);
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const url = 'https://rickandmortyapi.com/api/character'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url + `?page=${page}`)
      if (response.ok) {
        const data = await response.json() as Response
        setInfo(data.info)
        setCharacters(data.results)
  
        setFilteredCharacters(data.results)
  
        if (searchQuery === '') {
          setFilteredCharacters(data.results);
        } else {
        const filtered = data.results.filter(character =>
          character.name.toLowerCase().includes(searchQuery)
        );
        setFilteredCharacters(filtered);
      }
      } else {
        const errResponse = await response.json()
        console.error(errResponse)
        alert(errResponse)
      }
    }
    fetchData()
  }, [page])

  useEffect(() => {
    const character = characters.find((character) => character.id === charId);
    if (character) {
      setCharacterData(character);
    }
  }, [charId, characters]);

  const handleNextClick = () => {
    setPage(page + 1);
  };
  const handlePrevClick = () => {
    setPage(page > 1 ? page - 1 : 1);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);  
    
    if (query === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(query)
      );
      setFilteredCharacters(filtered);
    }
  };

  return (
    <>
      { characterData && <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        characterData={characterData}
      />} 
      <div className='header'>
        <input type="text" value={searchQuery} placeholder="Search" onChange={handleSearch} />
      </div>

      <div className='content'>
        <h1>Rick and Morty Characters</h1>
        <ul>
          {filteredCharacters.map((character: { id: string, name: string, image: string, origin: { name: string }, species: string, status: string}) => (
            <Character
              id={character.id}
              key={character.id}
              name={character.name}
              image={character.image}
              origin={character.origin.name}
              species={character.species}
              status={character.status}
              setOpenModal={setOpenModal}
              setCharId={setCharId}
            />
          ))}
        </ul>
      </div>

      <div className='footer'>
        <div className='max-width'>
          <button
            className='prev-btn'
            onClick={handlePrevClick}
            disabled={page === 1}>Prev
          </button>
          <button
            className='next-btn'
            onClick={handleNextClick}
            disabled={page === info.pages}>Next
          </button>
        </div>
      </div>
    </>
  )
}

export default App
