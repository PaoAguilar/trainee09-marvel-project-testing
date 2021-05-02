import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import ComicCard from '../components/ComicCard';
import Pagination from '../components/commons/Pagination';
import StoryCard from '../components/StoryCard';
import {
  getCharacter,
  getCharactersComics,
  getCharacterStories,
} from '../config/actions';
import { GlobalContext } from '../context/GlobalContext';
import { Comic, Story } from '../types/interfaces';

const CharacterInfo = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { state, dispatch } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageComic, setCurrentPageComic] = useState<number>(1);
  const { character, charactersComics, characterStories } = state;
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState(0);
  const hideButton = true;

  useEffect(() => {
    setIsSearching(true);
    getCharacter(characterId).then((response) => {
      setIsSearching(false);
      dispatch({
        type: 'SET_CHARACTER',
        payload: { character: response.data.results[0] },
      });
    });
  }, [characterId, dispatch]);

  useEffect(() => {
    setIsSearching(true);
    getCharactersComics(characterId, currentPageComic).then((response) => {
      if (response) setTotal(response.data.total);
      setIsSearching(false);
      dispatch({
        type: 'SET_CHARACTERS_COMICS',
        payload: { charactersComics: response.data.results },
      });
    });
  }, [characterId, currentPageComic, dispatch]);

  useEffect(() => {
    setIsSearching(true);
    getCharacterStories(characterId, currentPage).then((response) => {
      if (response) setTotal(response.data.total);
      setIsSearching(false);
      dispatch({
        type: 'SET_CHARACTER_STORIES',
        payload: { characterStories: response.data.results },
      });
    });
  }, [characterId, currentPage, dispatch]);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };
  const paginateComic = (page: number) => {
    setCurrentPageComic(page);
  };

  const limitPage = total / 8;
  return (
    <>
      <h1>CHARACTER INFORMATION</h1>
      <div className="character">
        {isSearching && <div>Searching ...</div>}
        <div className="character__image">
          <img
            src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
            alt="character-img"
          />
        </div>
        <div className="character__info">
          <div>
            <p>{character?.id}</p>
          </div>
          <div>
            <h2>{character?.name}</h2>
          </div>
        </div>
      </div>
      <div className="character__description">
        <div className="character__text">
          <h2>{character?.description}</h2>
        </div>
      </div>
      {charactersComics?.length === 0 ? <> </> : <h1>COMICS</h1>}
      {isSearching && <div>Searching Comics...</div>}
      <div className="characters">
        {charactersComics?.map((comic: Comic) => {
          return (
            <ComicCard key={comic.id} comic={comic} hideButton={hideButton} />
          );
        })}
      </div>
      {charactersComics?.length === 0 ? (
        <> </>
      ) : (
        <Pagination
          total={limitPage}
          currentPage={currentPageComic}
          paginate={paginateComic}
        />
      )}
      {characterStories?.length === 0 ? <> </> : <h1>STORIES</h1>}
      {isSearching && <div>Searching Stories...</div>}
      <div className="stories">
        {characterStories?.map((story: Story) => {
          return (
            <StoryCard key={story.id} story={story} hideButton={hideButton} />
          );
        })}
      </div>
      {characterStories?.length === 0 ? (
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

export default CharacterInfo;
