export default class AdminAudiobookRenderCategoriesService {
  constructor(props) {
    this.props = props;
  }
  deleteCategoryFromRef = (comment) => {
    for (const [key, value] of Object.entries(this.props.lastOpenedCategories.current)) {
      if (value === comment) {
        delete this.props.lastOpenedCategories.current[key];
        this.deleteCategoryFromRef(value);
      }
    }

    delete this.props.lastOpenedCategories.current[comment];
  };

  oparateParentList = (element, childrenAmount, comment, parent) => {
    if (childrenAmount === 0) {
      return;
    }

    element.stopPropagation();

    let liParent = element.currentTarget.parentElement.parentElement;

    if (liParent.attributes['data-clicable'].value === 'true') {
      this.props.lastOpenedCategories.current[comment.id] = parent !== null ? parent.id : null;
      this.openParentList(element, liParent);
    } else {
      this.deleteCategoryFromRef(comment.id);
      this.closeParentList(element, liParent);
    }
  };

  openParentList(element, liParent) {
    let liParentChildren = element.currentTarget.parentElement.parentElement.children;

    liParent.attributes['data-clicable'].value = 'false';

    for (const element of liParentChildren) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.remove('d-none');
        }
      }
    }

    const divfirst = element.currentTarget.children[0];

    for (const el of divfirst.children) {
      if (el.nodeName === 'I') {
        el.classList.remove('bi-arrow-right-square');
        el.classList.add('bi-arrow-down-square');
      }
    }
  }

  closeParentList(element, liParent) {
    let liParentChildren = element.currentTarget.parentElement.parentElement.children;

    liParent.attributes['data-clicable'].value = 'true';

    for (const element of liParentChildren) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
    }

    const divfirst = element.currentTarget.children[0];

    for (const el of divfirst.children) {
      if (el.nodeName === 'I') {
        el.classList.remove('bi-arrow-down-square');
        el.classList.add('bi-arrow-right-square');
      }
    }
  }
}
