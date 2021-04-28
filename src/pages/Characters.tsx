/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useState, useEffect } from 'react';

import CharacterCard from '../components/CharacterCard';
import {
  filterCharactersByComic,
  filterCharactersByName,
  filterCharactersByStory,
  getListOfCharacters,
} from '../config/actions';
import { Character } from '../types/interfaces';
import { GlobalContext } from '../context/GlobalContext';
import Pagination from '../components/commons/Pagination';
import useDebounce from '../hooks/useDebounce';

import '../styles/characters.scss';

const Characters = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const { characters } = state;
  const hideButton = false

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (filterBy === '' || filterBy === 'Name') {
      if (searchTerm) {
        setIsSearching(true);
        filterCharactersByName(debouncedSearchTerm, currentPage).then(
          (response) => {
            if (response) setTotal(response.data.total);
            setIsSearching(false);
            dispatch({
              type: 'LIST_OF_CHARACTER',
              payload: { characters: response.data.results },
            });
          }
        );
      }
    } else if (filterBy === 'Comic') {
      if (searchTerm) {
        filterCharactersByComic(debouncedSearchTerm, currentPage).then(
          (response) => {
            if (response) setTotal(response.data.total);
            setIsSearching(false);
            dispatch({
              type: 'LIST_OF_CHARACTER',
              payload: { characters: response.data.results },
            });
          }
        );
      }
    } else {
      if (filterBy === 'Story') {
        if (searchTerm) {
          filterCharactersByStory(debouncedSearchTerm, currentPage).then(
            (response) => {
              if (response) setTotal(response.data.total);
              setIsSearching(false);
              dispatch({
                type: 'LIST_OF_CHARACTER',
                payload: { characters: response.data.results },
              });
            }
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearchTerm, dispatch, filterBy]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      return;
    } else {
      getListOfCharacters(currentPage).then((response) => {
        setTotal(response.data.total);
        dispatch({
          type: 'LIST_OF_CHARACTER',
          payload: { characters: response.data.results },
        });
      });
    }
  }, [currentPage, debouncedSearchTerm, dispatch]);
  
  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const limitPage = total / 8;

  return (
    <>
      <h1>CHARACTERS</h1>
      <div className="search">
        <input
          type={filterBy === 'Name' ? 'text' : 'number'}
          value={searchTerm}
          className="search__input"
          placeholder="Search"
          disabled={filterBy === ''}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <select
          defaultValue="Search By..."
          className="search__select"
          onChange={(e) => {
            setSearchTerm('');
            setFilterBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option disabled>Search By...</option>
          <option value="Name">Name</option>
          <option value="Comic">Comic</option>
          <option value="Story">Story</option>
        </select>
      </div>
      {isSearching && <div>Searching ...</div>}
      {characters?.length === 0 ? (
        <h1>No Results Found</h1>
      ) : (
        <>
          <Pagination
            total={limitPage}
            currentPage={currentPage}
            paginate={paginate}
          />
          <div className="characters">
            {characters?.map((character: Character) => {
              return <CharacterCard key={character.id} character={character} hideButton={hideButton}/>;
            })}
          </div>
          <Pagination
            total={limitPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </>
  );
};

export default Characters;
