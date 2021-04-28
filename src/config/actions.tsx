import {
  CHARACTERS_ENDPOINTS,
  COMICS_ENDPOINTS,
  STORIES_ENDPOINTS,
} from './constants';

const fetchingData = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOffSetAndLimit = (page: number) => {
  const itemPerPage = 8;
  const indexOfLastItem = page * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const offSet = indexOfFirstItem;
  return { itemPerPage, offSet };
};

export const getListOfCharacters = (page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.GET_LIST_OF_CHARACTERS.replace(
      ':limit',
      `${numberOfItem.itemPerPage}`
    ).replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getCharacter = (id: string) => {
  return fetchingData(
    CHARACTERS_ENDPOINTS.GET_CHARACTER.replace(':id', `${id}`)
  );
};

export const filterCharactersByName = (word: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.FILTER_CHARACTERS_BY_NAME.replace(':word', `${word}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const filterCharactersByComic = (comicId: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.FILTER_CHARACTERS_BY_COMIC.replace(':id', `${comicId}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const filterCharactersByStory = (storyId: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.FILTER_CHARACTERS_BY_STORY.replace(':id', `${storyId}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getCharactersComics = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.GET_CHARACTERS_COMICS.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getCharacterStories = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    CHARACTERS_ENDPOINTS.GET_CHARACTERS_STORIES.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getListOfComics = (page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    COMICS_ENDPOINTS.GET_LIST_OF_COMICS.replace(
      ':limit',
      `${numberOfItem.itemPerPage}`
    ).replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getComic = (id: string) => {
  return fetchingData(COMICS_ENDPOINTS.GET_COMIC.replace(':id', `${id}`));
};

export const filterComicsByFormat = (format: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    COMICS_ENDPOINTS.FILTER_COMICS_BY_FORMAT.replace(':format', `${format}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const filterComicsByTitle = (word: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    COMICS_ENDPOINTS.FILTER_COMICS_BY_TITLE.replace(':word', `${word}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getComicsCharacters = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    COMICS_ENDPOINTS.GET_COMICS_CHARACTERS.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getComicsStories = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    COMICS_ENDPOINTS.GET_COMICS_STORIES.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getListOfStories = (page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    STORIES_ENDPOINTS.GET_LIST_OF_STORIES.replace(
      ':limit',
      `${numberOfItem.itemPerPage}`
    ).replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getStory = (id: string) => {
  return fetchingData(STORIES_ENDPOINTS.GET_STORY.replace(':id', `${id}`));
};

export const getStoriesComics = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    STORIES_ENDPOINTS.GET_STORIES_COMICS.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const getStoryCharacters = (id: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    STORIES_ENDPOINTS.GET_STORY_CHARACTERS.replace(':id', `${id}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};

export const filterStoriesByComic = (comicId: string, page: number) => {
  let numberOfItem = getOffSetAndLimit(page);
  return fetchingData(
    STORIES_ENDPOINTS.FILTER_STORIES_BY_COMIC.replace(':id', `${comicId}`)
      .replace(':limit', `${numberOfItem.itemPerPage}`)
      .replace(':offset', `${numberOfItem.offSet}`)
  );
};
