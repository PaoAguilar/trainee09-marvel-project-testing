import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CharacterCard from '../../components/CharacterCard';
import GlobalProvider from '../../context/GlobalContext';

describe('testing bookmarks in characters', () => {
  test('should add or remove a bookmark character', () => {
    const character = {
      id: 1,
      name: 'wolverine',
      thumbnail: {
        extension: '',
        path: '',
      },
      description: '',
    };

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
    const character = {
      id: 1,
      name: 'spider man',
      thumbnail: {
        extension: '',
        path: '',
      },
      description: '',
    };

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
