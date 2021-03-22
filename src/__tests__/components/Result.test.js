import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import Result from '../../components/Result';
import * as urlUtils from '../../utils/urlUtils';

const testDomain = 'http://www.domain.com/'
urlUtils.getActualShortUrl = jest.fn().mockImplementation(() => {
  return testDomain;
});

it('should display empty result', () => {
  const { container } = render(<Result />);

  expect(container.firstChild).toBe(null);
});

it('should retrieve actual url from util', () => {
  render(<Result url={testDomain} />);

  expect(urlUtils.getActualShortUrl).toBeCalledWith(testDomain);

  render(<Result url='/a' />);
  expect(urlUtils.getActualShortUrl).toBeCalledWith('/a');
});

it('should render display result', () => {
  const { container, getByText } = render(<Result url='/aba' />);
  const element = container.querySelector('#result-url');
  getByText('Copy');
  expect(element.href).toBe(testDomain);
});

it('should render string errors', () => {
  const { queryByText } = render(<Result errors="error1" />);
  expect(queryByText('error1')).toBeInTheDocument();
});

it('should render 5xx errors', () => {
  const { queryByText } = render(<Result errors={{ message: 'test message' }} />);
  expect(queryByText('test message')).toBeInTheDocument();
});

it('should render list of errors', () => {
  const { queryByText } = render(<Result errors={[{ msg: 'test error' }, { msg: 'abc error' }]} />);
  expect(queryByText('test error')).toBeInTheDocument();
  expect(queryByText('abc error')).toBeInTheDocument();
});