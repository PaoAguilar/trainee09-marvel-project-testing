import React, { useState, useEffect, useContext } from 'react';

import ComicCard from '../components/ComicCard';
import {
  filterComicsByFormat,
  filterComicsByTitle,
  getListOfComics,
} from '../config/actions';
import Pagination from '../components/commons/Pagination';
import useDebounce from '../hooks/useDebounce';
import { Comic } from '../types/interfaces';
import { GlobalContext } from '../context/GlobalContext';
import { formatList } from '../config/constants';

import '../styles/comics.scss';

const Comics = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const { comics } = state;
  const hideButton = false

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (filterBy === 'Title') {
      if (searchTerm) {
        setIsSearching(true);
        filterComicsByTitle(debouncedSearchTerm, currentPage).then(
          (response) => {
            if (response) setTotal(response.data.total);
            setIsSearching(false);
            dispatch({
              type: 'LIST_OF_COMICS',
              payload: { comics: response.data.results },
            });
          }
        );
      }
    } else {
      if (searchTerm) {
        setIsSearching(true);
        filterComicsByFormat(debouncedSearchTerm, currentPage).then(
          (response) => {
            if (response) setTotal(response.data.total);
            setIsSearching(false);
            dispatch({
              type: 'LIST_OF_COMICS',
              payload: { comics: response.data.results },
            });
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearchTerm, dispatch, filterBy]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      return;
    } else {
      getListOfComics(currentPage).then((response) => {
        setTotal(response.data.total);
        dispatch({
          type: 'LIST_OF_COMICS',
          payload: { comics: response.data.results },
        });
      });
    }
  }, [dispatch, currentPage, debouncedSearchTerm]);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };

  const limitPage = total / 8;
  return (
    <div>
      <h1>COMICS</h1>
      <div className="search">
        {filterBy === 'Format' ? (
          <select
            defaultValue="Select Format"
            className="search__input"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          >
            <option disabled>Select Format</option>
            {formatList?.map((format, key) => {
              return (
                <option key={key} value={encodeURI(format)}>
                  {format}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            value={searchTerm}
            className="search__input"
            placeholder="Search"
            disabled={filterBy === ''}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}

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
          <option value="Title">Title</option>
          <option value="Format">Format</option>
        </select>
      </div>
      {isSearching && <div>Searching ...</div>}
      {comics?.length === 0 ? (
        <h1>No Results Found</h1>
      ) : (
        <>
          <Pagination
            total={limitPage}
            currentPage={currentPage}
            paginate={paginate}
          />
          <div className="comics">
            {comics?.map((comic: Comic) => {
              return <ComicCard key={comic.id} comic={comic} hideButton={hideButton}/>;
            })}
          </div>
          <Pagination
            total={limitPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Comics;
