import {
  filterCharactersByComic,
  filterCharactersByName,
  filterCharactersByStory,
  filterComicsByFormat,
  filterComicsByTitle,
  filterStoriesByComic,
  getCharacter,
  getCharactersComics,
  getCharacterStories,
  getComic,
  getComicsCharacters,
  getComicsStories,
  getListOfCharacters,
  getListOfComics,
  getListOfStories,
  getOffSetAndLimit,
  getStoriesComics,
  getStory,
  getStoryCharacters,
} from '../../config/actions';
import {
  comicCharactersResponse,
  comicFormatFilterResponse,
  comicListResponse,
  comicResponse,
  comicStoriesResponse,
  comicTitleFilterResponse,
} from './comicsResponse';
import {
  characterComicsResponse,
  characterListResponse,
  characterResponse,
  characterStoriesResponse,
  filterByComicResponse,
  filterCharByStoryResponse,
  response,
  searchResponse,
} from './response';
import {
  filterStoryByComicResponse,
  storyListResponse,
} from './storiesResponse';

test('should asign a page number', () => {
  const page = 4;
  const expected = { itemPerPage: 8, offSet: 24 };
  expect(getOffSetAndLimit(page)).toStrictEqual(expected);
});

describe('All the fetches', () => {
  test('should return the list of characters', async () => {
    // const res = { results: [response] };
    const data = await getListOfCharacters(1);
    expect(data).toEqual(characterListResponse);
  });

  test('should return a character', async () => {
    // const res = { results: [response] };
    const data = await getCharacter('1');
    expect(data).toEqual(characterResponse);
  });

  test('should filter a character by name', async () => {
    // const res = { results: [response] };
    const data = await filterCharactersByName('spider', 1);
    // console.log(data);

    expect(data).toEqual(searchResponse);
  });

  test('should filter a character by comic', async () => {
    const data = await filterCharactersByComic('1', 1);
    expect(data).toEqual(filterByComicResponse);
  });

  test('should filter a character by story', async () => {
    const data = await filterCharactersByStory('1', 1);
    expect(data).toEqual(filterCharByStoryResponse);
  });

  test('should get characters Comics', async () => {
    const data = await getCharactersComics('1', 1);
    expect(data).toEqual(characterComicsResponse);
  });

  test('should get characters Stories', async () => {
    const data = await getCharacterStories('1', 1);
    expect(data).toEqual(characterStoriesResponse);
  });

  test('should return the list of comics', async () => {
    const data = await getListOfComics(1);
    expect(data).toEqual(comicListResponse);
  });

  test('should return a comic', async () => {
    const data = await getComic('1');
    expect(data).toEqual(comicResponse);
  });

  test('should filter a comic by format', async () => {
    const res = comicFormatFilterResponse;
    const data = await filterComicsByFormat('magazine', 1);
    expect(data).toEqual(res);
  });

  test('should filter a comic by title', async () => {
    const data = await filterComicsByTitle('women', 1);
    expect(data).toEqual(comicTitleFilterResponse);
  });

  test('should get comics characters', async () => {
    const data = await getComicsCharacters('1', 1);
    expect(data).toEqual(filterByComicResponse);
  });

  test('should get comics stories', async () => {
    const res = { results: [response] };
    const data = await getComicsStories('1', 1);
    expect(data).toEqual(comicStoriesResponse);
  });

  test('should get list of stories', async () => {
    const res = storyListResponse;
    const data = await getListOfStories(1);
    expect(data).toEqual(res);
  });

  test('should get a story', async () => {
    const res = { results: [response] };
    const data = await getStory('1');
    expect(data).toEqual(res);
  });

  test('should get stories comics', async () => {
    const res = { results: [response] };
    const data = await getStoriesComics('1', 1);
    expect(data).toEqual(res);
  });

  test('should get stories characters', async () => {
    const data = await getStoryCharacters('1', 1);
    expect(data).toEqual(filterCharByStoryResponse);
  });

  test('should filter stories by comic', async () => {
    const data = await filterStoriesByComic('1', 1);
    expect(data).toEqual(filterStoryByComicResponse);
  });
});
