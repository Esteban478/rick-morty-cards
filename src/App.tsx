import { useEffect, useState } from 'react'
import './App.css'
import Modal from './Modal';
import { Info, CharacterData, Response } from './@types';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import ThemeToggle from './ThemeToggle';

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
        console.log(data)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const findCharacter = () => {
      const character = characters.find((character) => character.id === charId);
      if (character) {
        setCharacterData(character);
      }
    }
    findCharacter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNextClick = () => {
    setPage(page + 1);
    scrollToTop();
  };
  const handlePrevClick = () => {
    setPage(page > 1 ? page - 1 : 1);
    scrollToTop();
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
      <Modal openModal={openModal} characterData={characterData} setOpenModal={setOpenModal}/>
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <ThemeToggle />
      <Content characters={filteredCharacters} setOpenModal={setOpenModal} setCharId={setCharId} />
      <Footer page={page} info={info} handlePrevClick={handlePrevClick} handleNextClick={handleNextClick} />
    </>
  )
}

export default App
