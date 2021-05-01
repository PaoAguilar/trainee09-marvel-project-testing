import React from 'react';
import {
    act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from '../../context/GlobalContext';
import Comics from '../../pages/Comics';
import user from '@testing-library/user-event';

describe('Testing Comic component', () => {
  test('shoud list comics when component is mount', async () => {
    render(
      <GlobalProvider>
        <Comics />
      </GlobalProvider>,
      { wrapper: BrowserRouter }
    );
    await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
    expect(screen.getByText(/comics/i)).toBeInTheDocument();
    // screen.debug();
  });

  test('should search comics by title', async() =>{
      jest.useFakeTimers();
      const { getByPlaceholderText } = render(
        <GlobalProvider>
          <Comics />
        </GlobalProvider>,
        { wrapper: BrowserRouter }
      );
      await waitForElementToBeRemoved(() => screen.getByText('No Results Found')); 
      act(() => {
        const input = getByPlaceholderText('Search');
        user.type(input, 'Women');
        jest.runAllTimers();
    });
    await waitForElementToBeRemoved(() => screen.queryByText(/searching/i)); 
    screen.debug()
  })
});
