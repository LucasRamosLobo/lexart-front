import React, { useState } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const [search, setSearch] = useState(searchTerm);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={search}
        onChange={handleInputChange}
        style={styles.inputField}
      />
      <button onClick={handleSearch} style={styles.searchButton}>
        Pesquisar
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  inputField: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SearchBar;
