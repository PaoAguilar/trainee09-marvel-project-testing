import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Characters from '../../pages/Characters';
import GlobalContext from '../../context/GlobalContext';
import GlobalProvider from '../../context/GlobalContext';
import { ChildrenProps } from '../../types/interfaces';

test('renders a message', async () => {
  const Wrapper = ({ children }: ChildrenProps) => {
    return <GlobalProvider>{children}</GlobalProvider>
  };




  render(<Characters />, {wrapper: ({ children }: ChildrenProps) => {
    return <GlobalProvider>{children}</GlobalProvider>
  }});




  // const showAll = await screen.findAllByTestId('char');
  // const { container, getByText } = render(<Greeting />)
  // expect(getByText('Hello, world!')).toBeInTheDocument()
  // expect(container.firstChild).toMatchInlineSnapshot(`
  //   <h1>Hello, World!</h1>
  // `)
});
