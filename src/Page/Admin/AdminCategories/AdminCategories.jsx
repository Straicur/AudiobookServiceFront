import React, { useState } from 'react';
import { useTokenStore } from 'Store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandlerModal } from 'Errors/ErrorHandlerModal';
import AdminCategoriesList from 'View/Admin/AdminCategories/AdminCategoriesList';
import { AdminCategoriesTreeProvider } from 'Providers/Admin/AdminCategoriesTreeProvider';
import { useTranslation } from 'react-i18next';
import './AdminCategories.css';

export default function AdminCategories() {
  const token = useTokenStore((state) => state.token);

  const { t, i18n } = useTranslation();

  const [categoriesState, setCategoriesState] = useState({
    error: null,
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setCategoriesState((prev) => ({
          ...prev,
          error: null,
        }));
      }}
    >
      <AdminCategoriesTreeProvider token={token} setState={setCategoriesState} i18n={i18n}>
        <AdminCategoriesList
          categoriesState={categoriesState}
          setCategoriesState={setCategoriesState}
          token={token}
          t={t}
          i18n={i18n}
        />
      </AdminCategoriesTreeProvider>
    </ErrorBoundary>
  );
}
