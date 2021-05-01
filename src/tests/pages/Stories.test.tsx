import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import GlobalProvider from '../../context/GlobalContext';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';
import Stories from '../../pages/Stories';

describe('Testing Stories component', () => {
  test('should list stories when component is mount', async () => {
    render(
      <GlobalProvider>
        <Stories />
      </GlobalProvider>
    );
    await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
    expect(screen.getByText(/stories/i)).toBeInTheDocument();
  });

  test('should filter stories by comic id', async () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(
      <GlobalProvider>
        <Stories />
      </GlobalProvider>
    );
    await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
    act(() => {
      const input = getByPlaceholderText('Search');
      user.type(input, '1');
      jest.runAllTimers();
    });
    await waitForElementToBeRemoved(() => screen.queryByText(/searching/i));
    expect(screen.getByText("Interior #11")).toBeInTheDocument();
    // screen.debug();
  });
});
