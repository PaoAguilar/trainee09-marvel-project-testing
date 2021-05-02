import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/commons/Pagination';
import StoryCard from '../components/StoryCard';
import {
  getComic,
  getComicsCharacters,
  getComicsStories,
} from '../config/actions';
import { GlobalContext } from '../context/GlobalContext';
import { Character, Story } from '../types/interfaces';

const ComicInfo = () => {
  const { comicId } = useParams<{ comicId: string }>();
  const { state, dispatch } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageChar, setCurrentPageChar] = useState<number>(1);
  const { comic, comicCharacters, comicStories } = state;
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState(0);
  const hideButton = true;

  useEffect(() => {
    setIsSearching(true);
    getComic(comicId).then((response) => {
      setIsSearching(false);
      dispatch({
        type: 'SET_COMIC',
        payload: { comic: response.data.results[0] },
      });
    });
  }, [comicId, dispatch]);

  useEffect(() => {
    setIsSearching(true);
    getComicsCharacters(comicId, currentPageChar).then((response) => {
      setIsSearching(false);
      if (response) setTotal(response.data.total);
      dispatch({
        type: 'SET_COMIC_CHARACTERS',
        payload: { comicCharacters: response.data.results },
      });
    });
  }, [comicId, currentPageChar, dispatch]);

  useEffect(() => {
    setIsSearching(true);
    getComicsStories(comicId, currentPage).then((response) => {
      setIsSearching(false);
      if (response) setTotal(response.data.total);
      dispatch({
        type: 'SET_COMIC_STORIES',
        payload: { comicStories: response.data.results },
      });
    });
  }, [comicId, currentPage, dispatch]);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };
  const paginateChar = (page: number) => {
    setCurrentPageChar(page);
  };
  const limitPage = total / 8;

  return (
    <>
      <h1>COMIC INFORMATION</h1>
      <div className="comic">
      {isSearching && <div>Searching ...</div>}
        <div className="comic__image">
          <img
            src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
            alt="comic-img"
          />
        </div>
        <div className="comic__info">
          <div>
            <p>{comic?.id}</p>
          </div>
          <div>
            <h2>{comic?.title}</h2>
          </div>
        </div>
      </div>
      <div className="comic__description">
        <div className="comic__text">
          <h2>{comic?.description}</h2>
        </div>
      </div>
      {comicCharacters?.length === 0 ? <> </> : <h1>CHARACTERS</h1>}
      {isSearching && <div>Searching Characters...</div>}
      <div className="characters">
        {comicCharacters?.map((character: Character) => {
          return (
            <CharacterCard
              key={character.id}
              character={character}
              hideButton={hideButton}
            />
          );
        })}
      </div>
      {comicCharacters?.length === 0 ? (
        <> </>
      ) : (
        <Pagination
          total={limitPage}
          currentPage={currentPageChar}
          paginate={paginateChar}
        />
      )}
      {comicStories?.length === 0 ? <> </> : <h1>STORIES</h1>}
      {isSearching && <div>Searching Stories...</div>}
      <div className="stories">
        {comicStories?.map((story: Story) => {
          return (
            <StoryCard key={story.id} story={story} hideButton={hideButton} />
          );
        })}
      </div>
      {comicStories?.length === 0 ? (
        <> </>
      ) : (
        <Pagination
          total={limitPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default ComicInfo;
