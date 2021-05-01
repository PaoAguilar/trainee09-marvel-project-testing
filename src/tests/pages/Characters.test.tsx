import React from 'react';
import {
  getByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Characters from '../../pages/Characters';
import user from '@testing-library/user-event';
import GlobalProvider from '../../context/GlobalContext';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('search characters when mount', async () => {
  render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>,
    { wrapper: BrowserRouter }
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
  expect(screen.getByText(/characters/i)).toBeInTheDocument();
  // estos vienen del characterListResponse
  expect(screen.getByText('Spider Man')).toBeInTheDocument();
  expect(screen.getByText('Wolfpack')).toBeInTheDocument();
  expect(screen.getByText('Wolf Cub')).toBeInTheDocument();
  // console.log(screen.getAllByText('Wolf Cub'));
  // screen.debug()
});

test('should get characters by name', async () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>,
    { wrapper: BrowserRouter }
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found')); // xq se tuvo que esperar que terminara el primer useeffect (del primer test)
  act(() => {
    const input = getByPlaceholderText('Search');
    user.type(input, 'spide');
    jest.runAllTimers();
  });
  // screen.debug()

  await waitForElementToBeRemoved(() => screen.queryByText(/searching/i)); // cuando se elimine searching, es porque ya resolvio el fetch
  expect(screen.queryByText(/characters/i)).toBeInTheDocument();
  expect(screen.getByText('Wolfpack')).toBeInTheDocument();
});

test('should get characters by comic id', async () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>,
    { wrapper: BrowserRouter }
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
  const select = screen.getByTestId('filterSelect');
  userEvent.selectOptions(select, "Comic");
  userEvent.click(screen.getByText('Comic'));

  act(() => {
    const input = getByPlaceholderText('Search');
    user.type(input, '1011281');
    jest.runAllTimers();
  });
  await waitForElementToBeRemoved(() => screen.queryByText(/searching/i));
  screen.debug();
  // screen.debug()
});
