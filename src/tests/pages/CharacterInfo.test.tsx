import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
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
    await waitForElementToBeRemoved(() => screen.getAllByText(/searching/i));
    
      expect(screen.getByText('Wolverine')).toBeInTheDocument();
      // expect(screen.getByText('Weapon X: Days of Future Now (2005) #5')).toBeInTheDocument();
      // expect(screen.getByText('Interior #11')).toBeInTheDocument();
    screen.debug();
  });
});
