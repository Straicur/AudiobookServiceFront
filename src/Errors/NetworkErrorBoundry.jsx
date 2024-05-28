import React from 'react';
import { networkErrorAtom } from 'App';
import { useAtom } from 'jotai';

export const NetworkErrorBoundry = ({ children, FallbackComponent, onReset, showModal = true }) => {
  const [errorAtomState, setErrorAtomState] = useAtom(networkErrorAtom);

  return (
    <>
      {errorAtomState !== null && FallbackComponent !== undefined && showModal ? (
        <FallbackComponent error={errorAtomState} setError={setErrorAtomState} onReset={onReset} />
      ) : null}
      {children}
    </>
  );
};
