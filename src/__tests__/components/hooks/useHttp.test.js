import React from 'react';
import { render } from '@testing-library/react';
import useHttp from '../../../components/hooks/useHttp';
import http from '../../../provider/http';

function ExampleComponent() {
  const http = useHttp();
  return null;
}

it('should be instance of actual http service', () => {
  const memoSpy = jest.spyOn(React, 'useMemo');
  render(<ExampleComponent />);
  render(<ExampleComponent />);

  expect(memoSpy).toHaveBeenCalledTimes(2)
  expect(memoSpy).toBeCalledWith(expect.any(Function));
  expect(memoSpy).toHaveReturnedWith(http);
});