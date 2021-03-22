import React from 'react';
import useState from "../../../components/hooks/useState";
import { render, screen, fireEvent } from '@testing-library/react'


function ExampleComponent({ initialState = null, onClick = (setStateFn) => {} }) {
  const [state, stateState] = useState(initialState);
  
  // for update state from outside
  return <button onClick={() => { onClick(stateState) }}>Click</button>;
}

it('should initial correctly', () => {
  const spyActualUseState = jest.spyOn(React, 'useState');
  const spyActionUseRef = jest.spyOn(React, 'useRef');

  render(<ExampleComponent />);

  expect(spyActionUseRef).toHaveBeenCalledWith(null);
  expect(spyActualUseState).toHaveBeenCalledWith(null);
});

it('should keep rest of entiries of object on state update for single entry', () => {
  const spyActualUseState = jest.spyOn(React, 'useState');
  const spyActionUseRef = jest.spyOn(React, 'useRef');
  
  const sampleState = { a: 1, b:2 };
  
  render(<ExampleComponent initialState={sampleState} onClick={(setStateFn) => {
    setStateFn({ a: 3, z: 9 });
  }} />);
  
  expect(spyActionUseRef).toHaveBeenCalledWith(sampleState);
  expect(spyActualUseState).toHaveBeenCalledWith(sampleState);

  const button = screen.getByText(/Click/);
  fireEvent.click(button);

  expect(spyActualUseState).toHaveBeenCalledWith({ a: 3, b:2, z: 9 }); // not contains `b` entry but it should keep it

});