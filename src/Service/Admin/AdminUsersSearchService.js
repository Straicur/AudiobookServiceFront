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
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        active: element.target.checked,
      });
    } else {
      this.props.setSearchState((prev) => ({
        ...prev,
        active: null,
      }));
    }
  };

  changeNotActive = (element) => {
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        active: !element.target.checked,
      });
    } else {
      this.props.setSearchState((prev) => ({
        ...prev,
        active: null,
      }));
    }
  };

  changeBanned = (element) => {
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        banned: element.target.checked,
      });
    } else {
      this.props.setSearchState((prev) => ({
        ...prev,
        banned: null,
      }));
    }
  };

  changeNotBanned = (element) => {
    if (element.target.checked) {
      this.props.setSearchState({
        ...this.props.searchState,
        banned: !element.target.checked,
      });
    } else {
      this.props.setSearchState((prev) => ({
        ...prev,
        banned: null,
      }));
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
