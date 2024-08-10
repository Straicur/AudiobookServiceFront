import FormService from 'Service/Common/FormService';

export default class AdminTechnicalBreaksService extends FormService {
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

  changeActive = (element) => {
    if (this.props.searchState.active === null) {
      this.props.setSearchState({
        ...this.props.searchState,
        active: element.target.checked,
      });
    } else {
      this.props.setSearchState({
        ...this.props.searchState,
        active: !this.props.searchState.active,
      });
    }
  };

  searchAgain = () => {
    this.props.setTechnicalBreaks((prev) => ({
      ...prev,
      page: 0,
      refresh: true,
    }));

    this.props.refetch();

    this.handleClose();
  };

  static createSearchData = (searchState) => {
    let searchJson = {};

    if (searchState.nameOrLastname != '') {
      searchJson.nameOrLastname = searchState.nameOrLastname;
    }
    if (searchState.active != null) {
      searchJson.active = searchState.active;
    }

    if (searchState.dateFrom != null && searchState.dateFrom != 0) {
      let date = new Date(searchState.dateFrom);
      searchJson.dateFrom = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

    if (searchState.dateTo != null && searchState.dateTo != 0) {
      let date = new Date(searchState.dateTo);
      searchJson.dateTo = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

    if (searchState.order != 0) {
      searchJson.order = searchState.order;
    }
    return searchJson;
  };
}
