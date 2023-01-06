import React, { useState } from "react";
import Form from "./components/Form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";

export default function Register() {
  const [state, setState] = useState({
    helperText: 0,
    modalShow: false,
    modalText: "",
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      // onReset={(e) => console.log(e)}
    >
      <Form state={state} setState={setState} />
    </ErrorBoundary>
  );
}
