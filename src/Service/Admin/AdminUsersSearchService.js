import FormService from 'Service/Common/FormService';

export default class AdminUsersSearchService extends FormService {
  constructor(props, setShow) {
    super(props.setSearchState);
    this.props = props;
    setShow.setShow = setShow;
  }

  handleClose = () => {
    this.props.setState((prev) => ({
      ...prev,
      searchModal: !this.props.state.searchModal,
    }));
    this.props.resetSearchStates();

    this.setShow(false);
  };

  changeSort = (element) => {
    if (!isNaN(element.target.value) && element.target.value != undefined) {
      this.props.setSearchState((prev) => ({
        ...prev,
        order: parseInt(element.target.value),
      }));
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
