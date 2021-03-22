import 'regenerator-runtime/runtime'
import React from 'react';
import { render, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import useState from '../components/hooks/useState';
import useHttp from '../components/hooks/useHttp';

jest.mock('../components/hooks/useState');
jest.mock('../components/hooks/useHttp');

beforeEach(() => {
  useState.mockClear();
  useHttp.mockClear();
})

const setup = () => {
  const utils = render(<App />);
  const input = utils.queryByPlaceholderText('Enter a url');
  const button = utils.queryByText('Shorten!');
  return {
    input,
    button,
    ...utils
  }
};

it('should init correctly', () => {
  useState.mockImplementation(() => {
    return [{}, jest.fn()];
  });

  const { queryByText, queryByPlaceholderText, container } = setup();

  expect(useState).toBeCalledWith({ errors: null, url: null, loading: false });

  expect(queryByPlaceholderText('Enter a url')).toBeInTheDocument();
  expect(queryByText('Shorten!')).toBeInTheDocument();
  expect(queryByText(/visitor!/)).toBeInTheDocument();
});

it('should set correct value', async () => { 
  const setStateMock = jest.fn().mockImplementation(() => {
  });

  useState.mockImplementation((state) => {
    return [{}, setStateMock];
  });

  const postMock = jest.fn().mockImplementation(() => {
    return Promise.resolve({ data: { url: '/shortened-url' } });
  });

  useHttp.mockImplementation(() => {
    return {
      post: postMock
    };
  });

  const { input, button, container } = setup();
  fireEvent.change(input, { target: { value: 'test1' } })
  expect(input.value).toBe('test1');

  fireEvent.click(button);

  await waitFor(() => {
    expect(postMock).toBeCalledWith('/shorten', { url: 'test1' });
    expect(setStateMock).toHaveBeenCalledTimes(3);
    expect(setStateMock).toBeCalledWith({ url: '/shortened-url' });
  });
});
