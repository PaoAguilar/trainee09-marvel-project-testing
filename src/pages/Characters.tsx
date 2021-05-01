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
  const [filterBy, setFilterBy] = useState('Name');
  const { characters } = state;
  const hideButton = false

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    console.log(filterBy);
    
    if (filterBy === '' || filterBy === 'Name') {
      // console.log("Serching name");
      
      if (searchTerm) {
        // console.log("Entro al if del name");
        setIsSearching(true);
        filterCharactersByName(debouncedSearchTerm, currentPage).then(
          (response) => {
            // console.log(JSON.stringify(response) );
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
      // console.log('en filter comic');
      if (searchTerm) {
        filterCharactersByComic(debouncedSearchTerm, currentPage).then(
          (response) => {
            // console.log(response);
            
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
    setIsSearching(true)
    if (debouncedSearchTerm) {
      return;
    } else {
      console.log("En get list of char");   
      getListOfCharacters(currentPage).then((response) => {
        setTotal(response.data.total);
        dispatch({
          type: 'LIST_OF_CHARACTER',
          payload: { characters: response.data.results },
        });
      });
    }
    setIsSearching(false)
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
          onChange={(e) => {
            const value= e.target.value
            setSearchTerm(value);
          }}
        />
        <select
          defaultValue="Name"
          data-testid="filterSelect"
          className="search__select"
          onChange={(e) => {
            setSearchTerm('');
            setFilterBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Name" data-testid="select-option">Name</option>
          <option value="Comic" data-testid="select-option">Comic</option>
          <option value="Story" data-testid="select-option">Story</option>
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
          <div className="characters" data-testid="char">
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
