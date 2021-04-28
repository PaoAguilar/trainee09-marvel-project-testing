import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import CharacterCard from '../components/CharacterCard';
import ComicCard from '../components/ComicCard';
import Pagination from '../components/commons/Pagination';
import {
  getStoriesComics,
  getStory,
  getStoryCharacters,
} from '../config/actions';
import { GlobalContext } from '../context/GlobalContext';
import { Character, Comic } from '../types/interfaces';

const StoryInfo = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { state, dispatch } = useContext(GlobalContext);
  const { story, storyComics, storyCharacters } = state;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageComic, setCurrentPageComic] = useState<number>(1);
  const [total, setTotal] = useState(0);
  const hideButton = true

  useEffect(() => {
    getStory(storyId).then((response) => {
      dispatch({
        type: 'SET_STORY',
        payload: { story: response.data.results[0] },
      });
    });
  }, [dispatch, storyId]);

  useEffect(() => {
    getStoriesComics(storyId, currentPageComic).then((response) => {
      if (response) setTotal(response.data.total);
      dispatch({
        type: 'SET_STORY_COMICS',
        payload: { storyComics: response.data.results },
      });
    });
  }, [currentPageComic, dispatch, storyId]);

  useEffect(() => {
    getStoryCharacters(storyId, currentPage).then((response) => {
      if (response) setTotal(response.data.total);
      dispatch({
        type: 'SET_STORY_CHARACTERS',
        payload: { storyCharacters: response.data.results },
      });
    });
  }, [currentPage, dispatch, storyId]);

  const paginate = (page: number) => {
    setCurrentPage(page);
  };
  const paginateComic = (page: number) => {
    setCurrentPageComic(page);
  };

  const limitPage = total / 8;

  return (
    <>
    <h1>STORY INFORMATION</h1>
      <div className="story">
        <div className="story__info">
          <h1>Story ID: {story?.id}</h1>
          <h1>{story?.title}</h1>
        </div>
      </div>
      {storyCharacters?.length === 0 ? <> </> : <h1>CHARACTERS</h1>}
      <div className="characters">
        {storyCharacters?.map((character: Character) => {
          return <CharacterCard key={character.id} character={character} hideButton={hideButton}/>;
        })}
      </div>
      {storyCharacters?.length === 0 ? (
        <> </>
      ) : (
        <Pagination
          total={limitPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
      {storyComics?.length === 0 ? <> </> : <h1>COMICS</h1>}
      <div className="comics">
        {storyComics?.map((comic: Comic) => {
          return <ComicCard key={comic.id} comic={comic} hideButton={hideButton}/>;
        })}
      </div>
      {storyComics?.length === 0 ? (
        <> </>
      ) : (
        <Pagination
          total={limitPage}
          currentPage={currentPageComic}
          paginate={paginateComic}
        />
      )}
    </>
  );
};

export default StoryInfo;
