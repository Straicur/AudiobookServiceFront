import { useLastSearchStore } from 'Store/store';
import FormService from 'Service/Common/FormService';

export default class AdminAudiobooksSearchService extends FormService {
  constructor(props, setShow) {
    super(props.setSearchState);
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

  changeCategories = (element) => {
    if (!isNaN(element) && element != undefined) {
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
