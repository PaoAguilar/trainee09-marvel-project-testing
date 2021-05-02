import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import ComicCard from '../../components/ComicCard';
const comic = {
    id: 1,
    title: 'Storm (2006)',
    thumbnail: {
      extension: '',
      path: '',
    },
    description: '',
    format: '',
  };
describe('testing bookmarks in comics', () => {
  test('should add or remove a bookmark from comics', () => {
    

    render(
      <GlobalProvider>
        <ComicCard comic={comic} hideButton={true} />
      </GlobalProvider>
    );
    expect(screen.getByRole('img', { name: 'bookmarkAdd' })).toBeInTheDocument();
    const addBookmark = screen.getByRole('img', { name: 'bookmarkAdd' });
    fireEvent.click(addBookmark);
    expect(screen.getByRole('img', { name: 'bookmarkRemove' })).toBeInTheDocument();
    const removeBookmark = screen.getByRole('img', { name: 'bookmarkRemove' });
    fireEvent.click(removeBookmark);
  });

  test('should hide a character', () => {
    const { getByText } = render(
      <GlobalProvider>
        <ComicCard comic={comic} hideButton={false} />
      </GlobalProvider>
    );
    expect(getByText('hide')).toBeInTheDocument();
    const hideButton = getByText('hide');
    fireEvent.click(hideButton);
  });
});
