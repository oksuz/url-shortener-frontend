import React, { useMemo } from 'react';

export default function WelcomeMessage({ list, defaultMessage = 'Hello' }) {
  const message = useMemo(() => {
    const random = Math.floor(Math.random() * list.length);
    return list[random];
  }, [list]);

  return (
    <React.Fragment>
      <h2>{message ?? defaultMessage} visitor!</h2>
      <p>Welcome to best url shortener service!</p>
    </React.Fragment>
  );
}
