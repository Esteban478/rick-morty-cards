import { modalData } from "./@types";

export interface ModalProps {
    modalData: modalData
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal, modalData }) => {
    const handleClose = () => setOpenModal(false);
    return (
        <div className={`modal ${openModal ? 'show' : ''}`}>
            <div className='modal-content'>
                <button
                className='close-btn'
                onClick={handleClose}
                >X
                </button>
                <h1>{modalData.name}</h1>
                <img src={modalData.image} alt={modalData.name} />
                {/* <p>Origin: {modalData.origin.name}</p> */}
                <p>Species: {modalData.species}</p>
                <p>Status: {modalData.status}</p>
            </div>
        </div>
    );
}

export default Modal;
    