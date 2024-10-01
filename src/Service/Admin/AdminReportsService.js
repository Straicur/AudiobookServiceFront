import CreateUtil from 'Util/CreateUtil';

export default class AdminReportsService {
  constructor(props, searchState, setSearchState, state, setState) {
    this.props = props;
    this.searchState = searchState;
    this.setSearchState = setSearchState;
    this.state = state;
    this.setState = setState;
  }

  resetSearchStates = () => {
    this.setSearchState({
      email: '',
      accepted: null,
      actionId: '',
      dateFrom: 0,
      dateTo: 0,
      denied: null,
      order: 0,
      user: null,
      description: '',
      ip: '',
      type: 0,
      sure: false,
      detailReportModal: false,
    });
  };

  static createSearchData = (searchState) => {
    let searchJson = {};

    if (searchState.actionId != '') {
      searchJson.actionId = searchState.actionId;
    }
    if (searchState.description != '') {
      searchJson.description = searchState.description;
    }
    if (searchState.email != '') {
      searchJson.email = searchState.email;
    }
    if (searchState.ip != '') {
      searchJson.ip = searchState.ip;
    }
    if (searchState.type != 0) {
      searchJson.type = parseInt(searchState.type);
    }
    if (searchState.user != null) {
      searchJson.user = searchState.user;
    }
    if (searchState.accepted != null) {
      searchJson.accepted = searchState.accepted;
    }
    if (searchState.denied != null) {
      searchJson.denied = searchState.denied;
    }
    if (searchState.dateFrom !== null && searchState.dateFrom !== 0) {
      searchJson.dateFrom = CreateUtil.createJsonFormatDate(searchState.dateFrom);
    }
    if (searchState.dateTo !== null && searchState.dateTo !== 0) {
      searchJson.dateTo = CreateUtil.createJsonFormatDate(searchState.dateTo);
    }
    if (searchState.order !== 0) {
      searchJson.order = parseInt(searchState.order);
    }

    return searchJson;
  };
}
