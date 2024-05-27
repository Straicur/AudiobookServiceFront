import React, { useLayoutEffect, useState } from 'react';
import { networkErrorAtom } from 'App';
import { useAtom } from 'jotai';
import AuthenticationError from './Errors/AuthenticationError';
import PermissionError from './Errors/PermissionError';
import ServiceUnaviableError from './Errors/ServiceUnaviableError';
import DataNotFoundError from './Errors/DataNotFoundError';
import InvalidJsonDataError from './Errors/InvalidJsonDataError';

export const NetworkErrorBoundry = ({ children, FallbackComponent, onReset, showModal }) => {
  const [errorAtomState, setErrorAtomState] = useAtom(networkErrorAtom);
  const [errorModalState, setErrorModalState] = useState({
    showModal: false,
  });

  useLayoutEffect(() => {
    if (errorAtomState !== null) {
      if (
        errorAtomState instanceof AuthenticationError ||
        errorAtomState instanceof PermissionError ||
        errorAtomState instanceof DataNotFoundError ||
        errorAtomState instanceof InvalidJsonDataError ||
        errorAtomState instanceof ServiceUnaviableError
      ) {
        setErrorModalState((prev) => ({
          ...prev,
          showModal: true,
        }));
      }
    }
  }, [errorAtomState]);

  return (
    <>
      {errorModalState.showModal === true && FallbackComponent !== undefined && showModal ? (
        <FallbackComponent error={errorAtomState} setError={setErrorAtomState} onReset={onReset} />
      ) : (
        setErrorAtomState(null)
      )}
      {children}
    </>
  );
};
