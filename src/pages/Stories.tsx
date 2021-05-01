import React, { useEffect, useState, useContext } from 'react';

import StoryCard from '../components/StoryCard';
import { filterStoriesByComic, getListOfStories } from '../config/actions';
import { Story } from '../types/interfaces';
import { GlobalContext } from '../context/GlobalContext';
import Pagination from '../components/commons/Pagination';
import useDebounce from '../hooks/useDebounce';

import '../styles/stories.scss';

const Stories = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterBy, setFilterBy] = useState('Comic');
  const { stories } = state;
  const hideButton = false;
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    console.log(filterBy);
    
    if (filterBy === 'Comic') {
      if (searchTerm) {
        setIsSearching(true);
        filterStoriesByComic(debouncedSearchTerm, currentPage).then(
          (response) => {
            if (response) setTotal(response.data.total);
            setIsSearching(false);
            dispatch({
              type: 'LIST_OF_STORIES',
              payload: { stories: response.data.results },
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
      getListOfStories(currentPage).then((response) => {
        // console.log(JSON.stringify(response));

        setTotal(response.data.total);
        dispatch({
          type: 'LIST_OF_STORIES',
          payload: { stories: response.data.results },
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
      <h1>STORIES</h1>

      <div className="search">
        <input
          type="number"
          value={searchTerm}
          className="search__input"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <select
          defaultValue="Comic"
          className="search__select"
          onChange={(e) => {
            setSearchTerm('');
            setFilterBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Comic">Comic</option>
        </select>
      </div>

      {isSearching && <div>Searching ...</div>}
      {stories?.length === 0 ? (
        <h1>No Results Found</h1>
      ) : (
        <>
          <Pagination
            total={limitPage}
            currentPage={currentPage}
            paginate={paginate}
          />
          <div className="stories">
            {stories?.map((story: Story) => {
              return (
                <StoryCard
                  key={story.id}
                  story={story}
                  hideButton={hideButton}
                />
              );
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

export default Stories;
