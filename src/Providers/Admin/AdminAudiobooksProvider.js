import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import AdminAudiobooksSearchService from 'Service/Admin/AdminAudiobooksSearchService';

const AdminAudiobooksContext = createContext(null);

export const AdminAudiobooksProvider = ({
  children,
  token,
  page,
  searchState,
  i18n,
  limit = 15,
}) => {
  const qc = useQueryClient();

  const { mutate: addAudiobook } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/admin/audiobook/add', 'PUT', data.jsonData, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      if (
        variables.currentPart.current == variables.maxParts.current ||
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
    throwOnError: true,
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
    onError: () => {
      qc.invalidateQueries(['dataAdminAudiobooks' + page]);
    },
    throwOnError: true,
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAdminAudiobooks' + page]);
  };

  const { data: dataAdminAudiobooks = null, refetch } = useQuery({
    queryKey: ['dataAdminAudiobooks' + page],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobooks',
        'POST',
        {
          page: page,
          limit: limit,
          searchData: AdminAudiobooksSearchService.createSearchData(searchState),
        },
        token,
        i18n.language,
      ),
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAdminAudiobooks, setRefetch, activate, refetch, addAudiobook];

  return (
    <AdminAudiobooksContext.Provider value={value}>{children}</AdminAudiobooksContext.Provider>
  );
};

export const useAdminAudiobooksData = () => useContext(AdminAudiobooksContext);
