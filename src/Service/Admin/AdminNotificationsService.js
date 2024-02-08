import { HandleFetch } from 'Util/HandleFetch';
import { useLastUserRolesStore } from 'Store/store';

export default class AdminNotificationsService {
  constructor(props, searchState, setSearchState, state, setState) {
    this.props = props;
    this.searchState = searchState;
    this.setSearchState = setSearchState;
    this.state = state;
    this.setState = setState;
  }

  userRolesStore = useLastUserRolesStore();
  dateUpdate = useLastUserRolesStore((state) => state.dateUpdate);

  resetSearchStates = () => {
    this.setSearchState({
      text: '',
      type: 0,
      deleted: null,
      order: 0,
    });
  };

  formatData = () => {
    let searchJson = {};

    if (this.searchState.text != '') {
      searchJson.text = this.searchState.text;
    }
    if (this.searchState.deleted != null) {
      searchJson.deleted = this.searchState.deleted;
    }
    if (this.searchState.type != 0) {
      searchJson.type = parseInt(this.searchState.type);
    }
    if (this.searchState.order != 0) {
      searchJson.order = parseInt(this.searchState.order);
    }

    return searchJson;
  };

  openAddModal = () => {
    this.setState((prev) => ({
      ...prev,
      addNotificationModal: !this.state.addNotificationModal,
    }));
  };

  openSearchModal = () => {
    if (this.dateUpdate < Date.now()) {
      this.userRolesStore.removeRoles();
      HandleFetch('/admin/user/system/roles', 'GET', null, this.props.token, this.i18n.language)
        .then((data) => {
          this.userRolesStore.setRoles(data);
        })
        .catch((e) => {
          this.props.setNotificationsState((prev) => ({
            ...prev,
            error: e,
          }));
        });
    }

    this.setState((prev) => ({
      ...prev,
      searchModal: !this.state.searchModal,
    }));
  };
}
