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
    </div>
  );
};

export default Header;
