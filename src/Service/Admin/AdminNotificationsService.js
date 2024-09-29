export default class AdminNotificationsService {
  constructor(props, searchState, setSearchState, state, setState) {
    this.props = props;
    this.searchState = searchState;
    this.setSearchState = setSearchState;
    this.state = state;
    this.setState = setState;
  }

  resetSearchStates = () => {
    this.setSearchState({
      text: '',
      type: 0,
      deleted: null,
      order: 0,
    });
  };

  static createSearchData = (searchState) => {
    let searchJson = {};

    if (searchState.text !== '') {
      searchJson.text = searchState.text;
    }
    if (searchState.deleted != null) {
      searchJson.deleted = searchState.deleted;
    }
    if (searchState.type !== 0) {
      searchJson.type = parseInt(searchState.type);
    }
    if (searchState.order !== 0) {
      searchJson.order = parseInt(searchState.order);
    }

    return searchJson;
  };

  openAddModal = () => {
    this.setState((prev) => ({
      ...prev,
      addNotificationModal: !this.state.addNotificationModal,
    }));
  };
}
