interface CharacterProps {
    id: string;
    name: string;
    image: string;
    origin: string;
    species: string;
    status: string;
    setOpenModal: (openModal: boolean) => void;
    setCharId: (charId: string) => void;
}

const Character: React.FC<CharacterProps> = ({ id, name, image, origin, species, status, setOpenModal, setCharId }) => {
    const handleClick = () => {
        setOpenModal(true);
        setCharId(id);
    }
    return (
      <>
        <li className="character">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={image} alt={name} />
                    </div>
                    <div className="flip-card-back">
                        <h2>{name}</h2>
                        <p>Origin: {origin}</p>
                        <p>Species: {species}</p>
                        <p>Status:  {status}</p>
                        <button className="btn" onClick={handleClick}>More info</button>
                    </div>
                </div>
            </div>
        </li>
      </>
  );
}

export default Character;
