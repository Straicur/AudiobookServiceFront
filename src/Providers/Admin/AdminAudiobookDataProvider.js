import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import CreateUtil from 'Util/CreateUtil';
import { useNavigate } from 'react-router-dom';

const AdminAudiobookDataContext = createContext(null);

export const AdminAudiobookDataProvider = ({ children, token, audiobookId, i18n }) => {
  const qc = useQueryClient();

  const navigate = useNavigate();

  const { mutate: changeAudiobookCover } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/audiobook/change/cover',
        'PATCH',
        data.jsonData,
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      data = [];

      setTimeout(() => {
        variables.setAudiobookCoverRefetch();
      }, 1500);

      variables.setState((prev) => ({
        ...prev,
        file: null,
        errorCover: '',
      }));
    },
    onError: (error, variables) => {
      variables.setState((prev) => ({
        ...prev,
        errorCover: error.message,
      }));

      if (variables.props.handleClose !== null) {
        refetch();
      }
    },
  });

  const { mutate: getAudiobookZip } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/audiobook/zip',
        'POST',
        { audiobookId: data.audiobookId },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement('a');

      link.href = url;

      link.setAttribute('download', variables.props.audiobookDetail.title + '.zip');

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);
    },
    onError: (error, variables) => {
      error = [];
      variables.props.handleClose();
    },
  });

  const { mutate: audiobookReAdd } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/admin/audiobook/reAdding', 'PATCH', data.jsonData, token, i18n.language);
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

      variables.currentPart.current = variables.currentPart.current + 1;
    },
  });

  const { mutate: audiobookDataEdit } = useMutation({
    mutationFn: (data) => {
      let json = {
        audiobookId: data.id,
        title: data.title,
        author: data.author,
        version: data.version,
        album: data.album,
        year: CreateUtil.createJsonFormatDate(data.year),
        duration: data.duration,
        size: data.size,
        parts: data.parts,
        description: data.description,
        age: data.age,
        encoded: data.encoded,
      };

      return HandleFetch('/admin/audiobook/edit', 'PATCH', json, token, i18n.language);
    },
    onSuccess: () => {
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
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
      qc.invalidateQueries(['dataAdminCategoriesTree', 'dataAdminAudiobooks']);
      setTimeout(function () {
        navigate(`/admin/audiobooks`);
      }, 1000);
    },
    onError: (error, variables) => {
      variables.deleted.current = true;
      qc.invalidateQueries(['dataAudiobookAdminData' + audiobookId]);
    },
  });

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
  });

  const value = [
    dataAudiobookAdminData,
    refetch,
    audiobookDataEdit,
    audiobookDeleteCategory,
    audiobookAddCategory,
    deleteAudiobook,
    audiobookReAdd,
    getAudiobookZip,
    changeAudiobookCover,
  ];

  return (
    <AdminAudiobookDataContext.Provider value={value}>
      {children}
    </AdminAudiobookDataContext.Provider>
  );
};

export const useAdminAudiobookData = () => useContext(AdminAudiobookDataContext);
