import { useLastSearchStore } from 'Store/store';

export default class AdminAudiobooksSearchService {
  constructor(props, setShow) {
    this.props = props;
    this.setShow = setShow;
  }

  searchStore = useLastSearchStore();

  handleClose = () => {
    this.props.setState((prev) => ({
      ...prev,
      searchModal: !this.props.state.searchModal,
    }));
    this.setShow(false);
  };

  generateCategoriesList = () => {
    let multiSelectTable = [];

    this.props.categoriesState.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });
    return multiSelectTable;
  };

  changeSort = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        sort: element.target.value,
      }));
    }
  };

  changeCategories = (element) => {
    if (!isNaN(element) && element != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        categories: element,
      }));
    }
  };

  changeTitle = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        title: element.target.value,
      }));
    }
  };

  changeAuthor = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        author: element.target.value,
      }));
    }
  };

  changeAlbum = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        album: element.target.value,
      }));
    }
  };

  changeParts = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        parts: element.target.value,
      }));
    }
  };

  changeAge = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        age: element.target.value,
      }));
    }
  };

  changeYear = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        year: element.target.value,
      }));
    }
  };

  changeDuration = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        duration: element.target.value,
      }));
    }
  };

  formatDuration = () => {
    return new Date(this.props.searchState.duration * 1000).toISOString().slice(11, 19);
  };

  searchAgain = () => {
    this.searchStore.setSearch(this.props.searchState);

    this.props.setPageState((prev) => ({
      ...prev,
      page: 0,
    }));

    this.props.setState((prev) => ({
      ...prev,
      searchModal: !this.props.state.searchModal,
      refresh: !this.props.state.refresh,
    }));
    this.setShow(false);
  };
}
