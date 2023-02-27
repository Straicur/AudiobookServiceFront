import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import CategoriesList from "./Components/CategoriesList";

export default function Categories() {
  
  const token = useTokenStore((state) => state.token);

  const [categoiesState, setCategoiesState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setCategoiesState({
          ...categoiesState,
          error: null,
        });
      }}
    >
      <CategoriesList
        categoiesState={categoiesState}
        setCategoiesState={setCategoiesState}
        token={token}
      />
    </ErrorBoundary>
  );
}
