import sha256 from 'crypto-js/sha256';
import { Buffer } from 'buffer';
import FormService from 'Service/Common/FormService';
import CreateUtil from 'Util/CreateUtil';

export default class AdminCategoryAudiobookAddService extends FormService {
  constructor(stateModal, setStateModal, props, maxParts, currentPart, seconds) {
    super(setStateModal);
    this.stateModal = stateModal;
    this.setStateModal = setStateModal;
    this.props = props;
    this.maxParts = maxParts;
    this.currentPart = currentPart;
    this.seconds = seconds;
  }

  handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];
      if (
        file.type === 'application/zip' ||
        file.type === 'application/vnd.rar' ||
        file.type === 'application/x-zip-compressed' ||
        file.type === 'application/x-7z-compressed'
      ) {
        this.setStateModal((prev) => ({
          ...prev,
          fileAdded: true,
          file: file,
        }));
      }
    }
  };

  handleClose = () => {
    this.props.setState((prev) => ({
      ...prev,
      addAudiobookModal: !this.props.state.addAudiobookModal,
      addAudiobook: !this.props.state.addAudiobook,
      addAudiobookSeconds: this.seconds.current,
      modalAddShow: this.props.state.modalAddShow,
    }));
  };

  handleBack = () => {
    this.setStateModal((prev) => ({
      ...prev,
      modal: 1,
    }));
  };

  nextPage = () => {
    this.setStateModal((prev) => ({
      ...prev,
      modal: 2,
    }));
  };

  addNewAudiobook = () => {
    const CHUNK_SIZE = 1024 * 1024 * 5;
    const reader = new FileReader();
    const fileName = this.stateModal.title + '_' + this.stateModal.author;
    const hashName = sha256(fileName).toString();

    // const setAudiobooksState = setAudiobooksState;
    let categoriesArray = [this.props.categoryDetail.id];

    if (this.stateModal.categoryParent) {
      categoriesArray.push(this.props.categoryDetail.parentCategoryId);
    }

    //todo to jest do rozkminy bo przeszkadza
    // Nie wykonuje się po i nie mogę zmienić stanu
    this.setStateModal((prev) => ({
      ...prev,
      upload: true,
      modal: 3,
    }));

    reader.onload = function (e) {
      if (e.target.result instanceof ArrayBuffer) {
        let buf = new Uint8Array(e.target.result);
        let allparts = 0;
        let part = 1;

        this.seconds.current = this.seconds.current + buf.length / 10000;

        if (buf.length < CHUNK_SIZE) {
          let b64 = Buffer.from(buf).toString('base64');

          const jsonData = {
            hashName: hashName,
            fileName: fileName,
            part: part,
            parts: part,
            base64: b64,
            additionalData: {
              categories: categoriesArray,
              title: this.stateModal.title,
              author: this.stateModal.author,
            },
          };

          if (this.stateModal.age !== 0) {
            jsonData.additionalData.age = this.stateModal.age;
          }

          if (this.stateModal.year !== '') {
            jsonData.additionalData.year = CreateUtil.createJsonFormatDate(this.stateModal.year);
          }

          this.maxParts.current = part;
          this.currentPart.current = part;

          this.props.addAudiobook({
            jsonData: jsonData,
            currentPart: this.currentPart,
            maxParts: this.maxParts,
            setStateModal: this.setStateModal,
            part: part,
          });
        } else {
          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            allparts = allparts + 1;
          }

          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            const arr = new Uint8Array(buf).subarray(i, i + CHUNK_SIZE);

            this.maxParts.current = allparts;
            this.currentPart.current = part;

            let b64 = Buffer.from(arr).toString('base64');

            const jsonData = {
              hashName: hashName,
              fileName: fileName,
              part: part,
              parts: allparts,
              base64: b64,
              additionalData: {
                categories: categoriesArray,
                title: this.stateModal.title,
                author: this.stateModal.author,
              },
            };

            if (this.stateModal.age !== 0) {
              jsonData.additionalData.age = this.stateModal.age;
            }

            if (this.stateModal.year !== '') {
              jsonData.additionalData.year = CreateUtil.createJsonFormatDate(this.stateModal.year);
            }

            this.props.addAudiobook({
              jsonData: jsonData,
              currentPart: this.currentPart,
              maxParts: this.maxParts,
              setStateModal: this.setStateModal,
              part: null,
            });

            part = part + 1;
          }
        }
      }
    }.bind(this);
    if (this.stateModal.file != null) {
      reader.readAsArrayBuffer(this.stateModal.file);
    }
  };
}
