interface FooterProps {
  page: number;
  info: { pages: number };
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ page, info, handlePrevClick, handleNextClick }) => {
  return (
    <div className='footer'>
      <div className='max-width'>
        <button
          className='prev-btn'
          onClick={handlePrevClick}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className='next-btn'
          onClick={handleNextClick}
          disabled={page === info.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Footer;
