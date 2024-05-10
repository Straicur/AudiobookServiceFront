import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import CreateUtil from 'Util/CreateUtil';
import { useNavigate } from 'react-router-dom';

const AdminAudiobookDataContext = createContext(null);

export const AdminAudiobookDataProvider = ({ children, token, audiobookId, setState, i18n }) => {
  const qc = useQueryClient();

  const navigate = useNavigate();

  const { mutate: audiobookReAdd } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/admin/audiobook/reAdding', 'PATCH', data.json, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      if (
        variables.currentPart.current == this.maxParts.current ||
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

      variables.currentPart.current = variables.currentPart.current + 1;
    },
  });

  const { mutate: audiobookDataEdit } = useMutation({
    mutationFn: () => {
      let json = {
        audiobookId: dataAudiobookAdminData.id,
        title: dataAudiobookAdminData.title,
        author: dataAudiobookAdminData.author,
        version: dataAudiobookAdminData.version,
        album: dataAudiobookAdminData.album,
        year: CreateUtil.createJsonFormatDate(dataAudiobookAdminData.year),
        duration: dataAudiobookAdminData.duration,
        size: dataAudiobookAdminData.size,
        parts: dataAudiobookAdminData.parts,
        description: dataAudiobookAdminData.description,
        age: dataAudiobookAdminData.age,
        encoded: dataAudiobookAdminData.encoded,
      };

      return HandleFetch('/admin/audiobook/edit', 'PATCH', json, token, i18n.language);
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: audiobookDataChange } = useMutation({
    mutationFn: (data) => {
      let json = {
        id: dataAudiobookAdminData.id,
        title: dataAudiobookAdminData.title,
        author: dataAudiobookAdminData.author,
        version: dataAudiobookAdminData.version,
        album: dataAudiobookAdminData.album,
        year: dataAudiobookAdminData.year,
        duration: dataAudiobookAdminData.duration,
        size: dataAudiobookAdminData.size,
        parts: dataAudiobookAdminData.parts,
        description: dataAudiobookAdminData.description,
        age: dataAudiobookAdminData.age,
        encoded: dataAudiobookAdminData.encoded,
        categories: dataAudiobookAdminData.categories,
        active: dataAudiobookAdminData.active,
        avgRating: dataAudiobookAdminData.avgRating,
        ratingAmount: dataAudiobookAdminData.ratingAmount,
      };

      const copy = Object.assign(json, data);
      qc.setQueryData(['dataAudiobookAdminData' + audiobookId], copy);
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: audiobookDeleteCategory } = useMutation({
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
    onSuccess: () => {
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  const { mutate: audiobookAddCategory } = useMutation({
    mutationFn: (data) => {
      data.element.stopPropagation();
      return HandleFetch(
        '/admin/category/add/audiobook',
        'PUT',
        {
          categoryId: data.categoryId,
          audiobookId: data.audiobookId,
        },
        token,
        i18n.language,
      );
    },
    onError: (e) => {
      setState((prev) => ({
        ...prev,
        error: e,
      }));
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
    onSuccess: () => {
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
      qc.invalidateQueries(['dataAdminCategoriesTree']);
      qc.invalidateQueries(['dataAdminAudiobooks']);
      navigate(`/admin/audiobooks`);
    },
    onError: (e) => {
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);

      setState((prev) => ({
        ...prev,
        error: e,
      }));
    },
  });

  // const setRefetch = () => {
  //   qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
  // };

  const { data: dataAudiobookAdminData, refetch } = useQuery({
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

  const value = [
    dataAudiobookAdminData,
    refetch,
    audiobookDataChange,
    audiobookDataEdit,
    audiobookDeleteCategory,
    audiobookAddCategory,
    deleteAudiobook,
    audiobookReAdd,
  ];

  return (
    <AdminAudiobookDataContext.Provider value={value}>
      {children}
    </AdminAudiobookDataContext.Provider>
  );
};

export const useAdminAudiobookData = () => useContext(AdminAudiobookDataContext);
