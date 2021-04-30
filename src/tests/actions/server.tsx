import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handler } from './handler';

const server = setupServer(...handler);
export {server, rest}
