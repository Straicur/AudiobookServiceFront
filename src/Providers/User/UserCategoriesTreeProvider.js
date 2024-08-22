import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserCategoriesTreeContext = createContext(null);

export const UserCategoriesTreeProvider = ({ children, token, i18n }) => {
  const { data: dataUserCategoriesTree = null, refetch } = useQuery({
    queryKey: ['dataUserCategoriesTree'],
    queryFn: () => HandleFetch('/user/categories/tree', 'GET', null, token, i18n.language),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataUserCategoriesTree, refetch];

  return (
    <UserCategoriesTreeContext.Provider value={value}>
      {children}
    </UserCategoriesTreeContext.Provider>
  );
};

export const useUserCategoriesTree = () => useContext(UserCategoriesTreeContext);
