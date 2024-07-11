import { useEffect, useState } from 'react'
import './App.css'
import Character from './Character'
import Modal from './Modal';
import { modalData, Info } from './@types';

const App = () => {

  interface CharacterData {
  id: string;
  name: string;
  image: string;
  origin: {
    name: string;
  }
  species: string;
  status: string;
  }

  const [info, setInfo] = useState({} as Info)
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>([]);
  const [charId, setCharId] = useState('');
  const [modalData, setModalData] = useState<modalData | null>(null);
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const url = 'https://rickandmortyapi.com/api/character'

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url + `?page=${page}`)
      const data = await response.json()
      setInfo(data.info)
      setCharacters(data.results)
      setFilteredCharacters(data.results)
    }
    fetchData()
  }, [page])

  // refactor to find character by id
  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await fetch(url + '/' + charId)
      const data = await response.json()
      console.log(data)
      setModalData(data)
    }
    fetchCharacter()
    }, [charId])

  const handleNextClick = () => {
    setPage(page + 1);
    setSearchQuery('');
  };
  const handlePrevClick = () => {
    setPage(page > 1 ? page - 1 : 1);
    setSearchQuery('');
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
      { modalData && <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalData={modalData}
      />} 
      <div className='header'>
        <input type="text" value={searchQuery} onChange={handleSearch} />
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
    </>
  )
}

export default App
