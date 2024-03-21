import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminAudiobookDataContext = createContext(null);

export const AdminAudiobookDataProvider = ({ children, token, audiobookId, setState, i18n }) => {
  const qc = useQueryClient();

  const { mutate: audiobookDataChange } = useMutation({
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
    // onSuccess: (data, variables) => {
    // data = [];

    // let copy = dataAdminCategoriesTree.categories;
    // copy[ArrayUtil.findIndexById(copy, variables.id)].name = variables.newName;

    // qc.setQueryData(['dataAdminCategoriesTree'], { categories: copy });
    // },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
  };

  const { data: dataAudiobookAdminData } = useQuery({
    queryKey: ['dataAudiobookAdminData' + audiobookId],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobook/details',
        'POST',
        {
          audiobookId: audiobookId,
        },
        token,
        i18n.language,
      ),
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

  const value = [dataAudiobookAdminData, setRefetch, audiobookDataChange];

  return (
    <AdminAudiobookDataContext.Provider value={value}>
      {children}
    </AdminAudiobookDataContext.Provider>
  );
};

export const useAdminAudiobookData = () => useContext(AdminAudiobookDataContext);
