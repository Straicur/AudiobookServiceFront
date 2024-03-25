export default class AdminAudiobooksService {
  constructor(searchState, setSearchState) {
    this.searchState = searchState;
    this.setSearchState = setSearchState;
  }

  resetSearchStates = () => {
    this.setSearchState({
      sort: 0,
      categories: [],
      title: '',
      author: '',
      album: '',
      parts: 0,
      age: 0,
      year: 0,
      duration: 0,
    });
  };

  createSearchData = () => {
    let searchJson = {};

    if (this.searchState.sort != 0) {
      searchJson.order = parseInt(this.searchState.sort);
    }
    if (this.searchState.categories.length != 0) {
      searchJson.categories = this.searchState.categories;
    }
    if (this.searchState.title != '') {
      searchJson.title = this.searchState.title;
    }
    if (this.searchState.author != '') {
      searchJson.author = this.searchState.author;
    }
    if (this.searchState.album != '') {
      searchJson.album = this.searchState.album;
    }
    if (this.searchState.parts != 0) {
      searchJson.parts = parseInt(this.searchState.parts);
    }
    if (this.searchState.age != 0) {
      searchJson.age = parseInt(this.searchState.age);
    }
    if (this.searchState.year != 0) {
      let date = new Date(this.searchState.year);
      searchJson.year = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }
    if (this.searchState.duration != 0) {
      searchJson.duration = parseInt(this.searchState.duration);
    }

    return searchJson;
  };

  // fetchCategoriesList = () => {
  //   if (this.dateUpdate > Date.now() && this.dateUpdate != 0) {
  //     this.setCategories(this.categories);
  //   } else {
  //     HandleFetch('/admin/categories', 'GET', null, this.props.token, this.i18n.language)
  //       .then((data) => {
  //         this.categoriesStore.removeCategories();
  //         for (const category of data.categories) {
  //           this.categoriesStore.addCategory(category);
  //         }

  //         this.setCategories(data.categories);
  //       })
  //       .catch((e) => {
  //         this.props.setAudiobooksState((prev) => ({
  //           ...prev,
  //           error: e,
  //         }));
  //       });
  //   }
  // };
}
