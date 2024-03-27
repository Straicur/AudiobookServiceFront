export default class AdminAudiobooksService {
  static resetSearchStates = (setSearchState) => {
    setSearchState({
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

  static createSearchData = (searchState) => {
    let searchJson = {};
    console.log(searchState.categories);
    console.log(searchState);
    if (searchState.sort != 0) {
      searchJson.order = parseInt(searchState.sort);
    }
    if (searchState.categories.length != 0) {
      searchJson.categories = searchState.categories;
    }
    if (searchState.title != '') {
      searchJson.title = searchState.title;
    }
    if (searchState.author != '') {
      searchJson.author = searchState.author;
    }
    if (searchState.album != '') {
      searchJson.album = searchState.album;
    }
    if (searchState.parts != 0) {
      searchJson.parts = parseInt(searchState.parts);
    }
    if (searchState.age != 0) {
      searchJson.age = parseInt(searchState.age);
    }
    if (searchState.year != 0) {
      let date = new Date(searchState.year);
      searchJson.year = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }
    if (searchState.duration != 0) {
      searchJson.duration = parseInt(searchState.duration);
    }

    return searchJson;
  };
}
