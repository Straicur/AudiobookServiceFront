import React, { useState, useEffect } from 'react';

export const ErrorBoundary = ({ children, FallbackComponent, onReset }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (error) => {
      setTimeout(function () {
        setError(error);
      }, 100);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <>
      {children}
      {error !== null && FallbackComponent !== undefined ? (
        <FallbackComponent error={error.error} setError={setError} onReset={onReset} />
      ) : null}
    </>
  );
};
