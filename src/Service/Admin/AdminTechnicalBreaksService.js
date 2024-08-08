import FormService from 'Service/Common/FormService';

export default class AdminTechnicalBreaksService extends FormService {
  constructor(props) {
    super(props.setSearchState);
    this.props = props;
  }

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

    if (searchState.userId != '') {
      searchJson.userId = searchState.userId;
    }
    if (searchState.active != null) {
      searchJson.active = searchState.active;
    }
    if (searchState.dateFrom != null) {
      searchJson.badateFromnned = searchState.dateFrom;
    }
    if (searchState.dateTo != null) {
      searchJson.dateTo = searchState.dateTo;
    }
    if (searchState.order != 0) {
      searchJson.order = searchState.order;
    }
    return searchJson;
  };
}
