import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Characters from '../../pages/Characters';
import user from '@testing-library/user-event';
import GlobalProvider from '../../context/GlobalContext';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('search characters when mount', async () => {
  render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
  expect(screen.getByText(/characters/i)).toBeInTheDocument();
  // This data comes from characterListResponse
  expect(screen.getByText('Spider Man')).toBeInTheDocument();
  expect(screen.getByText('Wolfpack')).toBeInTheDocument();
  expect(screen.getByText('Wolf Cub')).toBeInTheDocument();
});

test('should get characters by name', async () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found')); 
  act(() => {
    const input = getByPlaceholderText('Search');
    user.type(input, 'spide');
    jest.runAllTimers();
  });

  await waitForElementToBeRemoved(() => screen.queryByText(/searching/i)); 
  expect(screen.queryByText(/characters/i)).toBeInTheDocument();
  expect(screen.getByText('Wolfpack')).toBeInTheDocument();
});

test('should get characters by comic id', async () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
  const select = screen.getByTestId('filterSelect');
  userEvent.selectOptions(select, 'Comic');
  userEvent.click(screen.getByText('Comic'));

  act(() => {
    const input = getByPlaceholderText('Search');
    user.type(input, '1011281');
    jest.runAllTimers();
  });
  await waitForElementToBeRemoved(() => screen.queryByText(/searching/i));
  expect(screen.queryByText(/characters/i)).toBeInTheDocument();
});

test('should get characters by story id', async () => {
  jest.useFakeTimers();
  const { getByPlaceholderText } = render(
    <GlobalProvider>
      <Characters />
    </GlobalProvider>
  );
  await waitForElementToBeRemoved(() => screen.getByText('No Results Found'));
  const select = screen.getByTestId('filterSelect');
  userEvent.selectOptions(select, 'Story');
  userEvent.click(screen.getByText('Story'));

  act(() => {
    const input = getByPlaceholderText('Search');
    user.type(input, '101');
    jest.runAllTimers();
  });
  await waitForElementToBeRemoved(() => screen.queryByText(/searching/i));
  expect(screen.queryByText(/characters/i)).toBeInTheDocument();
});
