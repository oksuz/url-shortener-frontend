import { useState as reactUseState, useRef } from 'react';

// class component setState like
export default function useState(initalState) {
  const stateRef = useRef(initalState);
  const [state, setState] = reactUseState(stateRef.current);

  function updateState(nextState) {
    stateRef.current = { ...stateRef.current, ...nextState };
    setState(stateRef.current);
  }

  return [state, updateState];
}
