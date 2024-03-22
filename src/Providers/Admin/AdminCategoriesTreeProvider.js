import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import ArrayUtil from 'Util/ArrayUtil';

const AdminCategoriesTreeContext = createContext(null);

export const AdminCategoriesTreeProvider = ({ children, token, setState, i18n }) => {
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
    onSuccess: (data, variables) => {
      data = [];

      let copy = dataAdminCategoriesTree.categories;
      copy[ArrayUtil.findIndexById(copy, variables.id)].name = variables.newName;

      qc.setQueryData(['dataAdminCategoriesTree'], { categories: copy });
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
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
    onSuccess: (data, variables) => {
      data = [];

      let copy = dataAdminCategoriesTree.categories;
      copy[ArrayUtil.findIndexById(copy, variables.id)].active = variables.active;

      qc.setQueryData(['dataAdminCategoriesTree'], { categories: copy });
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoriesTree']);
  };

  const { data: dataAdminCategoriesTree = null } = useQuery({
    queryKey: ['dataAdminCategoriesTree'],
    queryFn: () => HandleFetch('/admin/categories/tree', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const value = [dataAdminCategoriesTree, setRefetch, categoryChange, categoryActivate];

  return (
    <AdminCategoriesTreeContext.Provider value={value}>
      {children}
    </AdminCategoriesTreeContext.Provider>
  );
};

export const useAdminCategoriesTree = () => useContext(AdminCategoriesTreeContext);
