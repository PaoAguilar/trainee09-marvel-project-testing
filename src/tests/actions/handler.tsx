import { rest } from 'msw';
import {
  comicFormatFilterResponse,
  comicListResponse,
  comicResponse,
  comicStoriesResponse,
  comicTitleFilterResponse,
} from './comicsResponse';
import {
  characterListResponse,
  searchResponse,
  filterByComicResponse,
  filterCharByStoryResponse,
  characterResponse,
  characterComicsResponse,
  characterStoriesResponse,
} from './response';
import {
  filterStoryByComicResponse,
  storyListResponse,
} from './storiesResponse';

export const handler = [
  rest.get(
    'https://gateway.marvel.com/v1/public/characters',
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const nameStartsWith = query.get('nameStartsWith');
      if (nameStartsWith) {
        return res(ctx.status(200), ctx.json(searchResponse));
      }
      return res(ctx.status(200), ctx.json(characterListResponse));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(characterResponse));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/comics/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(filterByComicResponse));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(filterCharByStoryResponse));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1/comics',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(characterComicsResponse));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1/stories',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(characterStoriesResponse));
    }
  ),

  rest.get('https://gateway.marvel.com/v1/public/comics', (req, res, ctx) => {
    const query = req.url.searchParams;
    const title = query.get('titleStartsWith');
    const format = query.get('format');
    if (title) {
      return res(ctx.status(200), ctx.json(comicTitleFilterResponse));
    } else if (format) {
      return res(ctx.status(200), ctx.json(comicFormatFilterResponse));
    }
    return res(ctx.status(200), ctx.json(comicListResponse));
  }),

  rest.get('https://gateway.marvel.com/v1/public/comics/1', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(comicResponse));
  }),

  rest.get(
    'https://gateway.marvel.com/v1/public/comics/1/stories',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(comicStoriesResponse));
    }
  ),

  rest.get('https://gateway.marvel.com/v1/public/stories', (req, res, ctx) => {
    const query = req.url.searchParams;
    const comics = query.get('comics');
    if (comics) {
      return res(ctx.status(200), ctx.json(filterStoryByComicResponse));
    }
    return res(ctx.status(200), ctx.json(storyListResponse));
  }),

  rest.get('https://gateway.marvel.com/v1/public/stories/1', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(filterStoryByComicResponse));
  }),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories/1/comics',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(comicResponse));
    }
  ),
];
