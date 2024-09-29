import FormService from 'Service/Common/FormService';
import CreateUtil from 'Util/CreateUtil';

export default class AdminAudiobooksSearchService extends FormService {
  constructor(props) {
    super(props.setSearchState);
    this.props = props;
  }

  handleClose = () => {
    this.props.setState((prev) => ({
      ...prev,
      searchModal: !this.props.state.searchModal,
    }));
  };

  generateCategoriesList = () => {
    let multiSelectTable = [];

    this.props.categories.categories.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });
    return multiSelectTable;
  };

  changeCategories = (element) => {
    if (element !== undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        categories: element,
      }));
    }
  };

  formatDuration = () => {
    return new Date(this.props.searchState.duration * 1000).toISOString().slice(11, 19);
  };

  searchAgain = () => {
    this.props.setAudiobooksState((prev) => ({
      ...prev,
      page: 0,
      refresh: true,
    }));

    this.props.refetch();
    this.props.setState((prev) => ({
      ...prev,
      searchModal: !this.props.state.searchModal,
    }));
  };

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

    if (searchState.sort !== 0) {
      searchJson.order = parseInt(searchState.sort);
    }
    if (searchState.categories.length !== 0) {
      searchJson.categories = searchState.categories;
    }
    if (searchState.title !== '') {
      searchJson.title = searchState.title;
    }
    if (searchState.author !== '') {
      searchJson.author = searchState.author;
    }
    if (searchState.album !== '') {
      searchJson.album = searchState.album;
    }
    if (searchState.parts !== 0) {
      searchJson.parts = parseInt(searchState.parts);
    }
    if (searchState.age !== 0) {
      searchJson.age = parseInt(searchState.age);
    }
    if (searchState.year !== null && searchState.year !== 0) {
      searchJson.year = CreateUtil.createJsonFormatDate(searchState.year);
    }
    if (searchState.duration !== 0) {
      searchJson.duration = parseInt(searchState.duration);
    }

    return searchJson;
  };
}
