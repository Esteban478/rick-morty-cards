import Character from './Character';

interface CharacterData {
  id: string;
  name: string;
  image: string;
  origin: { name: string };
  species: string;
  status: string;
}

interface ContentProps {
  characters: CharacterData[];
  setOpenModal: (open: boolean) => void;
  setCharId: (id: string) => void;
}

const Content: React.FC<ContentProps> = ({ characters, setOpenModal, setCharId }) => {
  return (
    <div className='content'>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map(character => (
          <Character
            key={character.id}
            id={character.id}
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
  );
};

export default Content;
