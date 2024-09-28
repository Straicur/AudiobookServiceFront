import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';

const UserAudiobookCommentsContext = createContext(null);

export const UserAudiobookCommentsProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  i18n,
}) => {
  const qc = useQueryClient();

  function setComment(comment, bool) {
    return dataAudiobookUserComments.comments.map((element) => {
      if (element.id === comment.id) {
        let like = element.audiobookCommentLike;
        let unlike = element.audiobookCommentUnlike;

        if (bool) {
          if (comment.liked === bool) {
            like = like - 1;
            bool = null;
          } else if (comment.liked != null && comment.liked !== bool) {
            like = like + 1;
            unlike = unlike - 1;
          } else {
            like = like + 1;
          }
        } else {
          if (comment.liked === bool) {
            unlike = unlike - 1;
            bool = null;
          } else if (comment.liked != null && comment.liked !== bool) {
            unlike = unlike + 1;
            like = like - 1;
          } else {
            unlike = unlike + 1;
          }
        }

        return {
          audiobookCommentLike: like,
          audiobookCommentUnlike: unlike,
          children: element.children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: bool,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });
  }

  function setChildComment(parentId, comment, bool) {
    let parent = dataAudiobookUserComments.comments.find((element) => element.id === parentId);

    let children = parent.children.map((element) => {
      let like = element.audiobookCommentLike;
      let unlike = element.audiobookCommentUnlike;

      if (bool) {
        if (comment.liked === bool) {
          like = like - 1;
          bool = null;
        } else if (comment.liked != null && comment.liked !== bool) {
          like = like + 1;
          unlike = unlike - 1;
        } else {
          like = like + 1;
        }
      } else {
        if (comment.liked === bool) {
          unlike = unlike - 1;
          bool = null;
        } else if (comment.liked != null && comment.liked !== bool) {
          unlike = unlike + 1;
          like = like - 1;
        } else {
          unlike = unlike + 1;
        }
      }

      if (element.id === comment.id) {
        return {
          audiobookCommentLike: like,
          audiobookCommentUnlike: unlike,
          children: element.children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: bool,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });

    return dataAudiobookUserComments.comments.map((element) => {
      if (element.id === parent.id) {
        return {
          audiobookCommentLike: element.audiobookCommentLike,
          audiobookCommentUnlike: element.audiobookCommentUnlike,
          children: children,
          comment: element.comment,
          deleted: element.deleted,
          edited: element.edited,
          id: element.id,
          liked: element.liked,
          myComment: element.myComment,
          userModel: element.userModel,
          parentId: element.parentId,
        };
      }
      return element;
    });
  }
  const { mutate: likeComment } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        data.url,
        data.method,
        data.jsonData,
        data.props.token,
        data.props.i18n.language,
      );
    },
    onMutate: (variables) => {
      let copy;
      variables.element.target.classList.remove('disabled');

      if (variables.comment.parentId != null) {
        copy = setChildComment(variables.comment.parentId, variables.comment, variables.bool);
      } else {
        copy = setComment(variables.comment, variables.bool);
      }

      qc.setQueryData(['dataAudiobookUserComments' + audiobookId], { comments: copy });
    },
    onError: () => {
      qc.invalidateQueries(['dataAudiobookUserComments' + audiobookId]);
    },
  });

  const { mutate: editComment } = useMutation({
    mutationFn: (data) => {
      return HandleFetch(
        '/user/audiobook/comment/edit',
        'PATCH',
        data.jsonData,
        token,
        i18n.language,
      );
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      if (variables.lastOpenComment === null) {
        variables.decline();
      } else {
        variables.clearInputComment();
      }

      if (variables.setAudiobookDetailRefresh !== undefined) {
        variables.setAudiobookDetailRefresh();
      }

      refetch();
    },
    onError: (e, variables) => {
      variables.element.target.classList.remove('disabled');
      qc.invalidateQueries(['dataAudiobookUserComments' + audiobookId]);
    },
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (data) => {
      return HandleFetch('/user/audiobook/comment/add', 'PUT', data.jsonData, token, i18n.language);
    },
    onSuccess: (data, variables) => {
      variables.element.target.classList.remove('disabled');
      if (variables.lastOpenComment === null) {
        variables.decline();
      } else {
        variables.clearInputComment();
      }

      qc.invalidateQueries(['dataAudiobookUserComments' + audiobookId]);
      refetch();
      variables.setAudiobookDetailRefresh();
    },
    onError: (e, variables) => {
      variables.element.target.classList.remove('disabled');
      qc.invalidateQueries(['dataAudiobookUserComments' + audiobookId]);
    },
  });

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserComments' + audiobookId]);
  };

  const { data: dataAudiobookUserComments = null, refetch } = useQuery({
    queryKey: ['dataAudiobookUserComments' + audiobookId],
    queryFn: () => {
      return HandleFetch(
        '/user/audiobook/comment/get',
        'POST',
        {
          audiobookId: audiobookId,
          categoryKey: categoryKey,
        },
        token,
        i18n.language,
      );
    },
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
  });

  const value = [dataAudiobookUserComments, setRefetch, likeComment, addComment, editComment];

  return (
    <UserAudiobookCommentsContext.Provider value={value}>
      {children}
    </UserAudiobookCommentsContext.Provider>
  );
};

export const useUserAudiobookComments = () => useContext(UserAudiobookCommentsContext);
