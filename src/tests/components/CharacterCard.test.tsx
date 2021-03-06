import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CharacterCard from '../../components/CharacterCard';
import GlobalProvider from '../../context/GlobalContext';

const character = {
    id: 1,
    name: 'wolverine',
    thumbnail: {
      extension: '',
      path: '',
    },
    description: '',
  };

describe('testing bookmarks in characters', () => {
  test('should add or remove a bookmark character', () => {
    const { getByRole } = render(
      <GlobalProvider>
        <CharacterCard character={character} hideButton={true} />
      </GlobalProvider>
    );
    expect(getByRole('img', { name: 'bookmarkAdd' })).toBeInTheDocument();
    const addBookmark = getByRole('img', { name: 'bookmarkAdd' });
    fireEvent.click(addBookmark);
    expect(getByRole('img', { name: 'bookmarkRemove' })).toBeInTheDocument();
    const removeBookmark = getByRole('img', { name: 'bookmarkRemove' });
    fireEvent.click(removeBookmark);
  });

  test('should hide a character', () => {
    const { getByText } = render(
      <GlobalProvider>
        <CharacterCard character={character} hideButton={false} />
      </GlobalProvider>
    );
    expect(getByText('hide')).toBeInTheDocument();
    const hideButton = getByText('hide');
    fireEvent.click(hideButton);
  });
});
