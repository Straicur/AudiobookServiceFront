import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const AdminAudiobookCommentsContext = createContext(null);

export const AdminAudiobookCommentsProvider = ({ children, token, audiobookId, i18n }) => {
  const qc = useQueryClient();

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookAdminComments' + audiobookId]);
  };

  const { mutate: deleteComment } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/admin/audiobook/comment/delete',
        'DELETE',
        {
          audiobookCommentId: data.id,
        },
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      let copy = dataAudiobookAdminComments.comments.map((comment) => {
        if (comment.id == variables.id) {
          return {
            id: comment.id,
            audiobookCommentLike: comment.audiobookCommentLike,
            audiobookCommentUnlike: comment.audiobookCommentUnlike,
            children: comment.children,
            comment: comment.comment,
            deleted: !comment.deleted,
            edited: comment.edited,
            liked: comment.liked,
            myComment: comment.myComment,
            parentId: comment.parentId,
            userModel: comment.userModel,
          };
        } else {
          return comment;
        }
      });

      qc.setQueryData(['dataAudiobookAdminComments' + audiobookId], {
        comments: copy,
      });
    },
    onError: () => {
      qc.invalidateQueries(['dataAudiobookAdminComments']);
    },
  });

  const { data: dataAudiobookAdminComments = null } = useQuery({
    queryKey: ['dataAudiobookAdminComments' + audiobookId],
    queryFn: () =>
      HandleFetch(
        '/admin/audiobook/comment/get',
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

  const value = [dataAudiobookAdminComments, setRefetch, deleteComment];

  return (
    <AdminAudiobookCommentsContext.Provider value={value}>
      {children}
    </AdminAudiobookCommentsContext.Provider>
  );
};

export const useAdminAudiobookComments = () => useContext(AdminAudiobookCommentsContext);
