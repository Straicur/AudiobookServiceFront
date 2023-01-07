import React, { useState } from "react";
import Form from "./components/Form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";

export default function Register() {
  const [state, setState] = useState({});

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {}}
      // Tu mam dwie przydatne funkcje jeśli chce mogę wykorzystać
    >
      <Form state={state} setState={setState} />
    </ErrorBoundary>
  );
}
