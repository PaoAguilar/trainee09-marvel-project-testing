import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import StoryCard from '../../components/StoryCard';

const story = {
  id: 1,
  title: 'Marvel',
};

describe('testing bookmarks in stories', () => {
  test('should add or remove a bookmark from story', () => {
    const {getByRole} = render(
      <GlobalProvider>
        <StoryCard story={story} hideButton={true} />
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
        <StoryCard story={story} hideButton={false} />
      </GlobalProvider>
    );
    expect(getByText('hide')).toBeInTheDocument();
    const hideButton = getByText('hide');
    fireEvent.click(hideButton);
  });
});
