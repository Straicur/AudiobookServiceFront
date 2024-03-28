import FormService from 'Service/Common/FormService';

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
    if (element != undefined) {
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
}
