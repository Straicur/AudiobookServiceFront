import { HandleFetch } from 'Util/HandleFetch';

export default class AdminAudiobookRenderCommentsService {
  constructor(props) {
    this.props = props;
  }

  oparateParentList = (element) => {
    element.stopPropagation();
    if (element.currentTarget.attributes['data-clicable'].value == 'true') {
      this.openParentList(element);
    } else {
      this.closeParentList(element);
    }
  };

  openParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'false';

    for (const element of children) {
      if (element.nodeName == 'UL') {
        for (const el of element.children) {
          el.classList.remove('d-none');
        }
      }
      if (element.nodeName == 'DIV') {
        element.children[0].children[0].classList.remove('bi-arrow-right-square');
        element.children[0].children[0].classList.add('bi-arrow-down-square');
      }
    }
  }

  closeParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'true';

    for (const element of children) {
      if (element.nodeName == 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
      if (element.nodeName == 'DIV') {
        element.children[0].children[0].classList.remove('bi-arrow-down-square');
        element.children[0].children[0].classList.add('bi-arrow-right-square');
      }
    }
  }

  deleteCommnet(element) {
    HandleFetch(
      '/admin/audiobook/comment/delete',
      'DELETE',
      {
        audiobookCommentId: element.id,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        this.props.setAudiobookCommnetsRefetchState(true);
      })
      .catch((e) => {
        this.props.setAudiobookState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  }
}
