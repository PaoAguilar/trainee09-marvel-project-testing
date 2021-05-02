import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import CharacterInfo from '../../pages/CharacterInfo';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    characterId: '1',
  }),
}));

beforeEach(() => {
  render(
    <GlobalProvider>
      <CharacterInfo />
    </GlobalProvider>
  );
});

describe('Testing Character Info', () => {
  test('should bring the character information', async () => {
    await waitFor(()=> expect(screen.getByText('Wolverine')).toBeInTheDocument());
    await waitFor(()=> expect(screen.getByText('Weapon X: Days of Future Now (2005) #5')).toBeInTheDocument());
    await waitFor(()=> expect(screen.getByText('Interior #11')).toBeInTheDocument());
  });
});
