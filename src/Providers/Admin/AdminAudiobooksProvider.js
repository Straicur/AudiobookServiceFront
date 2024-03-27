import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import AdminAudiobooksService from 'Service/Admin/AdminAudiobooksService';

const AdminAudiobooksContext = createContext(null);

export const AdminAudiobooksProvider = ({ children, token, page, searchState, setState, i18n }) => {
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

      let copy = dataAdminAudiobooks.audiobooks.map((audiobook) => {
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

      qc.setQueryData(['dataAdminAudiobooks' + page], {
        page: dataAdminAudiobooks.page,
        limit: dataAdminAudiobooks.limit,
        maxPage: dataAdminAudiobooks.maxPage,
        audiobooks: copy,
      });
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAdminAudiobooks' + page]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks' + page]);
  };

  const { data: dataAdminAudiobooks = null } = useQuery({
    queryKey: ['dataAdminAudiobooks' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobooks',
        'POST',
        {
          page: page,
          limit: 15,
          searchData: AdminAudiobooksService.createSearchData(searchState),
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

  const value = [dataAdminAudiobooks, setRefetch, activate];

  return (
    <AdminAudiobooksContext.Provider value={value}>{children}</AdminAudiobooksContext.Provider>
  );
};

export const useAdminAudiobooksData = () => useContext(AdminAudiobooksContext);
