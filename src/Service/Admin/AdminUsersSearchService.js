import FormService from 'Service/Common/FormService';

export default class AdminUsersSearchService extends FormService {
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

  changeBanned = (element) => {
    if (this.props.searchState.banned === null) {
      this.props.setSearchState({
        ...this.props.searchState,
        banned: element.target.checked,
      });
    } else {
      this.props.setSearchState({
        ...this.props.searchState,
        banned: !this.props.searchState.banned,
      });
    }
  };

  searchAgain = () => {
    this.props.setUsersState((prev) => ({
      ...prev,
      page: 0,
      refresh: true,
    }));

    this.props.refetch();

    this.handleClose();
  };

  static createSearchData = (searchState) => {
    let searchJson = {};

    if (searchState.email != '') {
      searchJson.email = searchState.email;
    }
    if (searchState.phoneNumber != '') {
      searchJson.phoneNumber = searchState.phoneNumber;
    }
    if (searchState.firstname != '') {
      searchJson.firstname = searchState.firstname;
    }
    if (searchState.lastname != '') {
      searchJson.lastname = searchState.lastname;
    }
    if (searchState.active != null) {
      searchJson.active = searchState.active;
    }
    if (searchState.banned != null) {
      searchJson.banned = searchState.banned;
    }
    if (searchState.order != 0) {
      searchJson.order = searchState.order;
    }
    return searchJson;
  };
}
