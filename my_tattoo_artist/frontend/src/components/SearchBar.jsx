import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import '../styles/SearchBar.css';

function SearchBar() {
  const [styles, setStyles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tattoo-style/');
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (data) => {
    const searchTerm = data.searchTerm;
    const searchStyleTerm = data.style;

    try {
      let url = 'http://127.0.0.1:8000/api/search/?';

      if (searchTerm && searchStyleTerm) {
        url += `search=${searchTerm}&style_name=${searchStyleTerm}`;
      } else if (searchTerm) {
        url += `search=${searchTerm}`;
      } else if (searchStyleTerm) {
        url += `style_name=${searchStyleTerm}`;
      }

      const response = await fetch(url);
      const searchData = await response.json();
      setSearchResults(searchData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='preview-zone'>
        <section className='search--icon'>
          <form className='search__form' onSubmit={handleSubmit(handleSearch)}>
            <input
              className='search-input'
              type='search'
              placeholder='Rechercher par artiste, par ville ou n°de département'
              {...register('searchTerm')}
            />
            <select
              className='search-input-style'
              placeholder='styles'
              {...register('style')}
            >
              <option>Styles</option>
              {styles.map((style) => (
                <option key={style.id} value={style.style_name}>
                  {style.style_name}
                </option>
              ))}
            </select>
            <button className='search-btn-submit' type='submit'>
              <Search />
            </button>
          </form>
        </section>
      </div>
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <Card className='custom-card' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title style={{ color: 'black' }}>
                  {result.artist_name}
                </Card.Title>
                <Card.Text style={{ color: 'black' }}>
                  {result.biography}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
