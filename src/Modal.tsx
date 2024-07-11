import { CharacterData } from "./@types";

export interface ModalProps {
    characterData: CharacterData
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, characterData }) => {
    const handleClose = () => setOpenModal(false);
    return (
        <div className={`modal ${openModal ? 'show' : ''}`}>
            <div className='modal-content'>
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
    