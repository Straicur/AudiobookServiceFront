import FormService from 'Service/Common/FormService';

export default class AdminCategoryEditService extends FormService {
  constructor(props, wrongState, setWrongState) {
    super(props.setAudiobookDetail);
    this.props = props;
    this.wrongState = wrongState;
    this.setWrongState = setWrongState;
  }

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
}
