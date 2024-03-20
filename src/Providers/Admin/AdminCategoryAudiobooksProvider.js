import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminCategoryAudiobooksContext = createContext(null);

export const AdminCategoryAudiobooksProvider = ({
  children,
  categoryKey,
  page,
  token,
  setState,
  i18n,
}) => {
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/audiobook/active',
        'PATCH',
        {
          audiobookId: data.selectedAudiobook.id,
          active: !data.selectedAudiobook.active,
        },
        token,
        i18n.language,
      ).catch((e) => {
        setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
    },
    onSuccess: (data, variables) => {
      data = [];
      variables.element.target.classList.remove('disabled');

      let copy = dataAdminCategoryAudiobooks.audiobooks.map((audiobook) => {
        if (audiobook.id == variables.selectedAudiobook.id) {
          return {
            id: audiobook.id,
            title: audiobook.title,
            author: audiobook.author,
            year: audiobook.year,
            duration: audiobook.duration,
            size: audiobook.size,
            parts: audiobook.parts,
            age: audiobook.age,
            active: !audiobook.active,
          };
        } else {
          return audiobook;
        }
      });

      qc.setQueryData(['dataAdminCategoryAudiobooks' + categoryKey], {
        page: dataAdminCategoryAudiobooks.page,
        limit: dataAdminCategoryAudiobooks.limit,
        maxPage: dataAdminCategoryAudiobooks.maxPage,
        audiobooks: copy,
      });
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + categoryKey]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoryAudiobooks' + categoryKey]);
  };

  const { data: dataAdminCategoryAudiobooks = null } = useQuery({
    queryKey: ['dataAdminCategoryAudiobooks' + categoryKey],
    queryFn: () =>
      HandleFetch(
        '/admin/category/audiobooks',
        'POST',
        {
          categoryKey: categoryKey,
          page: page,
          limit: 15,
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

  const value = [dataAdminCategoryAudiobooks, setRefetch, mutate];

  return (
    <AdminCategoryAudiobooksContext.Provider value={value}>
      {children}
    </AdminCategoryAudiobooksContext.Provider>
  );
};

export const useAdminCategoryAudiobooks = () => useContext(AdminCategoryAudiobooksContext);
