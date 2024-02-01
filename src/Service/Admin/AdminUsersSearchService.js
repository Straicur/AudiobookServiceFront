export default class AdminUsersSearchService {
  constructor(props, setShow) {
    this.props = props;
    setShow.setShow = setShow;
  }

  handleClose = () => {
    this.props.setState({
      ...this.props.state,
      searchModal: !this.props.state.searchModal,
    });
    this.props.resetSearchStates();

    this.setShow(false);
  };

  changeSort = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState({
        ...this.props.searchState,
        order: parseInt(element.target.value),
      });
    }
  };

  changeEmail = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState({
        ...this.props.searchState,
        email: element.target.value,
      });
    }
  };

  changePhoneNumber = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState({
        ...this.props.searchState,
        phoneNumber: element.target.value,
      });
    }
  };

  changeFirstname = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState({
        ...this.props.searchState,
        firstname: element.target.value,
      });
    }
  };

  changeLastname = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState({
        ...this.props.searchState,
        lastname: element.target.value,
      });
    }
  };

  changeActive = (element) => {
    if (this.props.searchState.active == null) {
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
    if (this.props.searchState.banned == null) {
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
    this.props.setState({ ...this.props.state, refresh: !this.props.state.refresh });
    this.setShow(false);
  };
}
