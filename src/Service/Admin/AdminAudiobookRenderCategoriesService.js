import { HandleFetch } from 'Util/HandleFetch';

export default class AdminAudiobookRenderCategoriesService {
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
        const divfirst = element.children[0];
        const divsecond = divfirst.children[0];

        for (const el of divsecond.children) {
          if (el.nodeName == 'I') {
            el.classList.remove('bi-arrow-right-square');
            el.classList.add('bi-arrow-down-square');
          }
        }
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
        const divfirst = element.children[0];
        const divsecond = divfirst.children[0];

        for (const el of divsecond.children) {
          if (el.nodeName == 'I') {
            el.classList.remove('bi-arrow-down-square');
            el.classList.add('bi-arrow-right-square');
          }
        }
      }
    }
  }

  addCategory = (element, category) => {
    element.stopPropagation();
    HandleFetch(
      '/admin/category/add/audiobook',
      'PUT',
      {
        categoryId: category.id,
        audiobookId: this.props.audiobookDetail.id,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        element.target.disabled = true;
      })
      .catch((e) => {
        this.props.setAudiobookState({
          ...this.props.audiobookState,
          error: e,
        });
      });
  };
}
