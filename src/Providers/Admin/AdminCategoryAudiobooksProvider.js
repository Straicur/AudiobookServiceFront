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

  const { mutate: activate } = useMutation({
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
      );
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

      qc.setQueryData(['dataAdminCategoryAudiobooks' + page + categoryKey], {
        page: dataAdminCategoryAudiobooks.page,
        limit: dataAdminCategoryAudiobooks.limit,
        maxPage: dataAdminCategoryAudiobooks.maxPage,
        audiobooks: copy,
      });
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: deleteAudiobookFromCategory } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/category/remove/audiobook',
        'DELETE',
        {
          categoryId: data.categoryId,
          audiobookId: data.audiobookId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      let copy = dataAdminCategoryAudiobooks.audiobooks.map((audiobook) => {
        if (audiobook.id != variables.audiobookId) {
          return audiobook;
        }
      });

      qc.setQueryData(['dataAdminCategoryAudiobooks' + page + categoryKey], {
        page: dataAdminCategoryAudiobooks.page,
        limit: dataAdminCategoryAudiobooks.limit,
        maxPage: dataAdminCategoryAudiobooks.maxPage,
        audiobooks: copy,
      });

      qc.invalidateQueries(['dataAdminCategoriesTree']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: deleteAudiobook } = useMutation({
    mutationFn: (data) => {
      HandleFetch(
        '/admin/audiobook/delete',
        'DELETE',
        {
          audiobookId: data.audiobookId,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      let copy = dataAdminCategoryAudiobooks.audiobooks.map((audiobook) => {
        if (audiobook.id != variables.audiobookId) {
          return audiobook;
        }
      });

      qc.setQueryData(['dataAdminCategoryAudiobooks' + page + categoryKey], {
        page: dataAdminCategoryAudiobooks.page,
        limit: dataAdminCategoryAudiobooks.limit,
        maxPage: dataAdminCategoryAudiobooks.maxPage,
        audiobooks: copy,
      });

      qc.invalidateQueries(['dataAdminCategoriesTree']);
      qc.invalidateQueries(['dataAudiobookAdminData']);
      qc.invalidateQueries(['dataAdminAudiobooks']);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminCategoriesTree']);
    qc.invalidateQueries(['dataAdminCategoryAudiobooks']);
  };

  const { data: dataAdminCategoryAudiobooks = null } = useQuery({
    queryKey: ['dataAdminCategoryAudiobooks' + page + categoryKey],
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

  const value = [
    dataAdminCategoryAudiobooks,
    setRefetch,
    activate,
    deleteAudiobook,
    deleteAudiobookFromCategory,
  ];

  return (
    <AdminCategoryAudiobooksContext.Provider value={value}>
      {children}
    </AdminCategoryAudiobooksContext.Provider>
  );
};

export const useAdminCategoryAudiobooks = () => useContext(AdminCategoryAudiobooksContext);
