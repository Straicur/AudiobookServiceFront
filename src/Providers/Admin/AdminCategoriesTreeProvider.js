import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminCategoriesTreeContext = createContext(null);

export const AdminCategoriesTreeProvider = ({ children, token, i18n }) => {
  const qc = useQueryClient();

  const { mutate: categoryChange } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/category/edit',
        'PATCH',
        {
          name: data.newName,
          categoryId: data.id,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: categoryActivate } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/category/active',
        'PATCH',
        {
          categoryId: data.id,
          active: data.active,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: categoryAdd } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/category/add',
        'PUT',
        {
          name: data.name,
          additionalData: data.additionalData,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAdminCategoriesList', 'dataAdminCategoriesTree']);
    },
  });

  const { mutate: categoryDelete } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/category/remove',
        'DELETE',
        {
          categoryId: data.categoryId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAdminCategoriesList', 'dataAdminCategoriesTree']);
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoriesTree']);
  };

  const { data: dataAdminCategoriesTree = null, refetch } = useQuery({
    queryKey: ['dataAdminCategoriesTree'],
    queryFn: () => HandleFetch('/admin/categories/tree', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [
    dataAdminCategoriesTree,
    setRefetch,
    categoryChange,
    categoryActivate,
    categoryAdd,
    categoryDelete,
  ];

  return (
    <AdminCategoriesTreeContext.Provider value={value}>
      {children}
    </AdminCategoriesTreeContext.Provider>
  );
};

export const useAdminCategoriesTree = () => useContext(AdminCategoriesTreeContext);
