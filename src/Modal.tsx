import { CharacterData } from "./@types";

export interface ModalProps {
    characterData: CharacterData | null;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, characterData }) => {
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    const handleClose = () => setOpenModal(false);
    
    if (characterData) return (
        <div className={`modal ${openModal ? 'show' : ''}`} onClick={handleClose}>
            <div className='modal-content' onClick={handleContentClick}>
                <img src={characterData.image} alt={characterData.name} />
                <h1>{characterData.name}</h1>
                <p>Origin: {characterData.origin.name}</p>
                <p>Species: {characterData.species}</p>
                <p>Status: {characterData.status}</p>
                <button
                    className='close-btn'
                    onClick={handleClose}
                >Close
                </button>
            </div>
        </div>
    );
}

export default Modal;
    