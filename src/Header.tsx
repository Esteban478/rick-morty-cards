interface HeaderProps {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, handleSearch }) => {
  return (
    <div className='header'>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search"
        onChange={handleSearch}
      />
      <span
        className={!searchQuery ? 'clear-btn hide' : 'clear-btn'}
        onClick={() => handleSearch({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
      >
        X
      </span>
    </div>
  );
};

export default Header;
