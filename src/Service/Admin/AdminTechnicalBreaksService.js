import FormService from 'Service/Common/FormService';
import CreateUtil from 'Util/CreateUtil';

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
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        active: element.target.checked,
      });
    } else {
      this.props.setSearchState({
        ...this.props.searchState,
        active: null,
      });
    }
  };

  changeNotActive = (element) => {
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        active: !element.target.checked,
      });
    } else {
      this.props.setSearchState({
        ...this.props.searchState,
        active: null,
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

    if (searchState.nameOrLastname !== '') {
      searchJson.nameOrLastname = searchState.nameOrLastname;
    }
    if (searchState.active != null) {
      searchJson.active = searchState.active;
    }

    if (searchState.dateFrom != null && searchState.dateFrom !== 0) {
      searchJson.dateFrom = CreateUtil.createJsonFormatDate(searchState.dateFrom);
    }

    if (searchState.dateTo != null && searchState.dateTo !== 0) {
      searchJson.dateTo = CreateUtil.createJsonFormatDate(searchState.dateTo);
    }

    if (searchState.order !== 0) {
      searchJson.order = searchState.order;
    }
    return searchJson;
  };
}
