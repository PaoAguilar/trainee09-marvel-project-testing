import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import ComicInfo from '../../pages/ComicInfo';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    comicId: '1',
  }),
}));

describe('Testing Comic Info', () => {
  test('should bring the comic information', async () => {
    render(
        <GlobalProvider>
          <ComicInfo />
        </GlobalProvider>
      );

    // screen.debug()
    await waitFor(()=> expect(screen.getByText('Savage Avengers (2019) #19')).toBeInTheDocument());
    screen.debug()
    await waitFor(()=> expect(screen.getByText('Ben Urich')).toBeInTheDocument());
    await waitFor(()=> expect(screen.getByText('Cover #2769')).toBeInTheDocument());
  });
});
