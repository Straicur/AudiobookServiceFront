import { HandleFetch } from 'Util/HandleFetch';
import CreateUtil from 'Util/CreateUtil';

export default class AdminCategoryEditService {
  constructor(props, wrongState, setWrongState) {
    this.props = props;
    this.wrongState = wrongState;
    this.setWrongState = setWrongState;
  }

  handleVersionChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      version: event.target.value,
    }));
  };
  handlePartsChange = (event) => {
    let value = event.target.value;
    if (value == '') {
      value = 0;
    }

    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      parts: parseInt(value),
    }));
  };
  handleEncodedChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      encoded: event.target.value,
    }));
  };
  handleDescriptionChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };
  handleDurationChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      duration: event.target.value,
    }));
  };

  handleYearChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      year: event.target.value,
    }));
  };
  handleAlbumChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      album: event.target.value,
    }));
  };
  handleAuthorChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      author: event.target.value,
    }));
  };
  handleTitleChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      title: event.target.value,
    }));
  };
  handleSizeChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      size: event.target.value,
    }));
  };
  handleAgeChange = (event) => {
    this.props.setAudiobookDetail((prev) => ({
      ...prev,
      age: parseInt(event),
    }));
  };

  validateFields = () => {
    this.setWrongState(0);

    if (this.props.audiobookDetail.title.length < 1) {
      this.setWrongState(1);
    }
    if (this.props.audiobookDetail.author.length < 1) {
      this.setWrongState(2);
    }
    if (this.props.audiobookDetail.album.length < 1) {
      this.setWrongState(3);
    }
    if (this.props.audiobookDetail.year.length < 1) {
      this.setWrongState(4);
    }
    if (this.props.audiobookDetail.duration.length < 1) {
      this.setWrongState(5);
    }
    if (this.props.audiobookDetail.parts <= 0) {
      this.setWrongState(6);
    }
    if (
      this.props.audiobookDetail.encoded == undefined ||
      this.props.audiobookDetail.encoded.length < 1
    ) {
      this.setWrongState(7);
    }
    if (this.props.audiobookDetail.size.length < 1) {
      this.setWrongState(8);
    }
    if (this.props.audiobookDetail.version.length < 1) {
      this.setWrongState(9);
    }
  };

  returnFormError = () => {
    switch (this.wrongState) {
      case 1:
        return this.props.t('enterValidTitle');
      case 2:
        return this.props.t('enterValidAuthor');
      case 3:
        return this.props.t('enterValidAlbum');
      case 4:
        return this.props.t('enterValidYear');
      case 5:
        return this.props.t('enterValidPart');
      case 6:
        return this.props.t('enterValidDuration');
      case 7:
        return this.props.t('enterValidEncoded');
      case 8:
        return this.props.t('enterValidSize');
      case 9:
        return this.props.t('enterValidVersion');
    }
  };

  editAudiobookData = () => {
    let myDate = this.props.audiobookDetail.duration.split(':');

    let hours = parseInt(myDate[0] * 60 * 60);
    let minutes = parseInt(myDate[1] * 60);
    let seconds = parseInt(myDate[2]);

    HandleFetch(
      '/admin/audiobook/edit',
      'PATCH',
      {
        audiobookId: this.props.audiobookDetail.id,
        title: this.props.audiobookDetail.title,
        author: this.props.audiobookDetail.author,
        version: this.props.audiobookDetail.version,
        album: this.props.audiobookDetail.album,
        year: CreateUtil.createJsonFormatDate(this.props.audiobookDetail.year),
        duration: hours + minutes + seconds,
        size: this.props.audiobookDetail.size,
        parts: this.props.audiobookDetail.parts,
        description: this.props.audiobookDetail.description,
        age: this.props.audiobookDetail.age,
        encoded: this.props.audiobookDetail.encoded,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        this.props.setAudiobookDetailRefetch(true);
        this.props.setStateModal((prev) => ({
          ...prev,
          edit: !this.props.stateModal.edit,
        }));
      })
      .catch((e) => {
        this.props.setState((prev) => ({
          ...prev,
          error: e,
        }));
        this.props.handleClose();
      });
  };
}
