import React, { useLayoutEffect, useState } from 'react';
import { networkErrorAtom } from 'App';
import { useAtom } from 'jotai';
import { NetworkErrorBoundryModal } from './NetworkErrorBoundryModal';
import AuthenticationError from './Errors/AuthenticationError';
import PermissionError from './Errors/PermissionError';

import ServiceUnaviableError from './Errors/ServiceUnaviableError';
export const NetworkErrorBoundry = ({ children }) => {
  const [errorAtomState] = useAtom(networkErrorAtom);
  const [errorModalState, setErrorModalState] = useState({
    showModal: false,
  });

  useLayoutEffect(() => {
    if (errorAtomState !== null) {
      if (
        errorAtomState instanceof AuthenticationError ||
        errorAtomState instanceof PermissionError ||
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
      {errorModalState.showModal === true ? (
        <NetworkErrorBoundryModal error={errorAtomState} />
      ) : null}
      {children}
    </>
  );
};
