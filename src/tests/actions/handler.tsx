import { rest } from 'msw';
import { response } from './response';

export const handler = [
  rest.get('https://gateway.marvel.com/v1/public/characters', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [response] }));
  }),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters',
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const nameStartsWith = query.get('nameStartsWith');
      return res(
        ctx.status(200),
        ctx.json({ results: [response], nameStartsWith })
      );
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/comics/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1/comics',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1/stories',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get('https://gateway.marvel.com/v1/public/comics', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [response] }));
  }),

  rest.get('https://gateway.marvel.com/v1/public/comics/1', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [response] }));
  }),

  rest.get('https://gateway.marvel.com/v1/public/comics', (req, res, ctx) => {
    const query = req.url.searchParams;
    const format = query.get('trade%20paperback');
    return res(ctx.status(200), ctx.json({ results: [response], format }));
  }),

  rest.get('https://gateway.marvel.com/v1/public/comics', (req, res, ctx) => {
    const query = req.url.searchParams;
    const title = query.get('spider');
    return res(ctx.status(200), ctx.json({ results: [response], title }));
  }),

  rest.get(
    'https://gateway.marvel.com/v1/public/comics/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/comics/1/stories',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get('https://gateway.marvel.com/v1/public/stories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [response] }));
  }),

  rest.get('https://gateway.marvel.com/v1/public/stories/1', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [response] }));
  }),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories/1/comics',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories/1/characters',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ results: [response] }));
    }
  ),

  rest.get(
    'https://gateway.marvel.com/v1/public/stories',
    (req, res, ctx) => {
      const query = req.url.searchParams
        const comics = query.get("comics")
      return res(ctx.status(200), ctx.json({ results: [response], comics }));
    }
  ),
];
