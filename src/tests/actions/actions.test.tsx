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
import { response } from './response';

test('should asign a page number', () => {
  const page = 4;
  const expected = { itemPerPage: 8, offSet: 24 };
  expect(getOffSetAndLimit(page)).toStrictEqual(expected);
});

describe('All the fetches', () => {
  test('should return the list of characters', async () => {
    const res = { results: [response] };
    const data = await getListOfCharacters(1);
    expect(data).toEqual(res);
  });

  test('should return a character', async () => {
    const res = { results: [response] };
    const data = await getCharacter('1');
    expect(data).toEqual(res);
  });

  test('should filter a character by name', async () => {
    const res = { results: [response] };
    const data = await filterCharactersByName('spider',1);
    expect(data).toEqual(res);
  });

  test('should filter a character by comic', async () => {
    const res = { results: [response] };
    const data = await filterCharactersByComic('1',1);
    expect(data).toEqual(res);
  });

  test('should filter a character by story', async () => {
    const res = { results: [response] };
    const data = await filterCharactersByStory('1',1);
    expect(data).toEqual(res);
  });

  test('should get characters Comics', async () => {
    const res = { results: [response] };
    const data = await getCharactersComics('1',1);
    expect(data).toEqual(res);
  });

  test('should get characters Stories', async () => {
    const res = { results: [response] };
    const data = await getCharacterStories('1',1);
    expect(data).toEqual(res);
  });

  test('should return the list of comics', async () => {
    const res = { results: [response] };
    const data = await getListOfComics(1);
    expect(data).toEqual(res);
  });

  test('should return a comic', async () => {
    const res = { results: [response] };
    const data = await getComic('1');
    expect(data).toEqual(res);
  });

  test('should filter a comic by format', async () => {
    const res = { results: [response] };
    const data = await filterComicsByFormat('trade%20paperback',1);
    expect(data).toEqual(res);
  });

  test('should filter a comic by title', async () => {
    const res = { results: [response] };
    const data = await filterComicsByTitle('spider',1);
    expect(data).toEqual(res);
  });

  test('should get comics characters', async () => {
    const res = { results: [response] };
    const data = await getComicsCharacters('1',1);
    expect(data).toEqual(res);
  });

  test('should get comics stories', async () => {
    const res = { results: [response] };
    const data = await getComicsStories('1',1);
    expect(data).toEqual(res);
  });

  test('should get list of stories', async () => {
    const res = { results: [response] };
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
    const data = await getStoriesComics('1',1);
    expect(data).toEqual(res);
  });

  test('should get stories characters', async () => {
    const res = { results: [response] };
    const data = await getStoryCharacters('1',1);
    expect(data).toEqual(res);
  });

  test('should filter stories by comic', async () => {
    const res = { results: [response] };
    const data = await filterStoriesByComic('1',1);
    expect(data).toEqual(res);
  });
});
