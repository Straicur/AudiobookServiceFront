import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { exact } from 'prop-types';

const AdminCategoryAudiobooksContext = createContext(null);

export const AdminCategoryAudiobooksProvider = ({ children, categoryKey, page, token, i18n }) => {
  const qc = useQueryClient();

  const { mutate: addAudiobook } = useMutation({
    mutationFn: (data) => {
      return setTimeout(function () {
        return HandleFetch('/admin/audiobook/add', 'PUT', data.jsonData, token, i18n.language);
      }, 400);
    },
    onSuccess: (data, variables) => {
      if (
        variables.currentPart.current === variables.maxParts.current ||
        Object.keys(data).length !== 0
      ) {
        variables.setStateModal({
          author: '',
          title: '',
          modal: 3,
          fileAdded: true,
          isNextButtonDisabled: false,
          uploadEnded: false,
        });
      }

      if (variables.part !== null) {
        variables.maxParts.current = variables.part;
      }

      variables.currentPart.current = variables.currentPart.current + 1;
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
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
      variables.element.target.classList.remove('disabled');

      let copy = dataAdminCategoryAudiobooks.audiobooks.map((audiobook) => {
        if (audiobook.id === variables.selectedAudiobook.id) {
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
    onError: () => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);
    },
  });

  const { mutate: deleteAudiobookFromCategory } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
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
    onError: () => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);
    },
  });

  const { mutate: deleteAudiobook } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
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

      qc.invalidateQueries([
        'dataAdminCategoriesTree',
        'dataAudiobookAdminData',
        'dataAdminAudiobooks',
      ]);
    },
    onError: () => {
      qc.invalidateQueries(['dataAdminCategoryAudiobooks' + page + categoryKey]);
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries({
      queryKey: ['dataAdminCategoriesTree', 'dataAdminCategoryAudiobooks'],
      exact: exact,
      refetchType: 'all',
    });

    refetch();
  };

  const { data: dataAdminCategoryAudiobooks = null, refetch } = useQuery({
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
  });

  const value = [
    dataAdminCategoryAudiobooks,
    setRefetch,
    activate,
    deleteAudiobook,
    deleteAudiobookFromCategory,
    addAudiobook,
  ];

  return (
    <AdminCategoryAudiobooksContext.Provider value={value}>
      {children}
    </AdminCategoryAudiobooksContext.Provider>
  );
};

export const useAdminCategoryAudiobooks = () => useContext(AdminCategoryAudiobooksContext);
