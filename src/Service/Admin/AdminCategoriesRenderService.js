export default class AdminCategoriesRenderService {
  constructor(props) {
    this.props = props;
  }

  //TODO tu musi dojść logika związana z usuwaniem
  // Klucz to id klikniętej kategorii, przekazuje też do tego uuid parenta, WIĘC [key element => parent element]
  // Usuwanie
  // Jeśli znajdę id które przekazuję jako parent gdzieś w tablicy to sprawdzam następnie czy
  // przypadkiem te nie są parentami i tak długo aż w końcu nie znajdę żadnych idków, wszystkie razem z ojcem mają zostać usunięte
  // Dodawanie
  // Dodaje po prostu klucz i wartość i tyle

  //this.props.lastOpenedCategories

  oparateParentList = (element) => {
    element.stopPropagation();
    if (element.currentTarget.attributes['data-clicable'].value === 'true') {
      this.openParentList(element);
    } else {
      this.closeParentList(element);
    }
  };

  openParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'false';

    for (const element of children) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.remove('d-none');
        }
      }
      if (element.nodeName === 'DIV') {
        for (const el of element.children) {
          if (el.nodeName === 'I') {
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
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
      if (element.nodeName === 'DIV') {
        for (const el of element.children) {
          if (el.nodeName === 'I') {
            el.classList.remove('bi-arrow-down-square');
            el.classList.add('bi-arrow-right-square');
          }
        }
      }
    }
  }
}
