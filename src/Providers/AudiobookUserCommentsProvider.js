import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { HandleFetch } from 'Util/HandleFetch';
import { QueryClient } from '@tanstack/react-query';

const AudiobookUserCommentsContext = createContext(null);

export const AudiobookUserCommentsProvider = ({
  children,
  token,
  audiobookId,
  categoryKey,
  setState,
  i18n,
}) => {
  const qc = new QueryClient();

  function setComment(props, comment, bool) {
    // console.log(props);
    // console.log(comment);
    // console.log(bool);

    let newComments = props.comments.map((element) => {
      let like = element.audiobookCommentLike;
      let unlike = element.audiobookCommentUnlike;

      if (bool) {
        if (comment.liked == bool) {
          like = like - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          like = like + 1;
          unlike = unlike - 1;
        } else {
          like = like + 1;
        }
      } else {
        if (comment.liked == bool) {
          unlike = unlike - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          unlike = unlike + 1;
          like = like - 1;
        } else {
          unlike = unlike + 1;
        }
      }

      if (element.id == comment.id) {
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

    return newComments;
  }

  function setChildComment(props, parentId, comment, bool) {
    let parent = props.comments.find((element) => element.id == parentId);

    let children = parent.children.map((element) => {
      let like = element.audiobookCommentLike;
      let unlike = element.audiobookCommentUnlike;

      if (bool) {
        if (comment.liked == bool) {
          like = like - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          like = like + 1;
          unlike = unlike - 1;
        } else {
          like = like + 1;
        }
      } else {
        if (comment.liked == bool) {
          unlike = unlike - 1;
        } else if (comment.liked != null && comment.liked != bool) {
          unlike = unlike + 1;
          like = like - 1;
        } else {
          unlike = unlike + 1;
        }
      }

      if (element.id == comment.id) {
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

    let newComments = props.comments.map((element) => {
      if (element.id == parent.id) {
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

    return newComments;
  }
  const { mutate } = useMutation(
    (data) => {
      HandleFetch(data.url, data.method, data.jsonData, data.props.token, data.props.i18n.language)
        .then(() => {
          data.element.target.classList.remove('disabled');
        })
        .catch(() => {
          data.element.target.classList.remove('disabled');
        });
    },
    {
      onMutate: (variables) => {
        let copy;
        if (variables.comment.parentId != null) {
          copy = setChildComment(
            variables.props,
            variables.comment.parentId,
            variables.comment,
            variables.bool,
          );
        } else {
          copy = setComment(variables.props, variables.comment, variables.bool);
        }
        console.log({ comments: copy });

        qc.invalidateQueries(['dataAudiobookUserComments']);
        qc.setQueryData(['dataAudiobookUserComments'], { comments: copy });
      },
    },
  );

  const setRefetch = () => {
    qc.invalidateQueries(['dataAudiobookUserComments']);
  };

  const { data: dataAudiobookUserComments = null } = useQuery(
    ['dataAudiobookUserComments'],
    () => {
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
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setState((prev) => ({
          ...prev,
          error: e,
        }));
      },
    },
  );

  const value = [dataAudiobookUserComments, setRefetch, mutate];

  return (
    <AudiobookUserCommentsContext.Provider value={value}>
      {children}
    </AudiobookUserCommentsContext.Provider>
  );
};

export const useAudiobookUserComments = () => useContext(AudiobookUserCommentsContext);
