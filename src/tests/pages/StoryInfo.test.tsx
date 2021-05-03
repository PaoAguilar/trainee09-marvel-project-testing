import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import StoryInfo from '../../pages/StoryInfo';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: () => ({
      storyId: '1',
    }),
  }));

describe('Testion Story Info', () => {
  test('should bring the story information', async() => {
    render(
      <GlobalProvider>
        <StoryInfo />
      </GlobalProvider>
    );
    await waitFor(()=> expect(screen.getByText('Interior #11')).toBeInTheDocument());
    await waitFor(()=> expect(screen.getByText('Abyss')).toBeInTheDocument());
    await waitFor(()=> expect(screen.getByText('Savage Avengers (2019) #19')).toBeInTheDocument());
  });
});
