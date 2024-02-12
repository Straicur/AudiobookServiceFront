import { HandleFetch } from 'Util/HandleFetch';
import sha256 from 'crypto-js/sha256';
import { Buffer } from 'buffer';
import FormService from 'Service/Common/FormService';

export default class AdminAudiobookReAddingService extends FormService {
  constructor(stateModal, setStateModal, props, seconds, stateProgress, setStateProgress) {
    super(setStateModal);
    this.stateModal = stateModal;
    this.setStateModal = setStateModal;
    this.props = props;
    this.seconds = seconds;
    this.stateProgress = stateProgress;
    this.setStateProgress = setStateProgress;
  }

  handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (file.type == 'application/zip') {
        this.setStateModal((prev) => ({
          ...prev,
          file: file,
        }));
      }
    }
  };

  handleClose = () => {
    this.props.setAudiobookState((prev) => ({
      ...prev,
      reAddingModal: !this.props.audiobookState.reAddingModal,
      reAdding: !this.props.audiobookState.reAdding,
    }));
  };

  handleCloseAndUpdate = () => {
    this.props.setAudiobookState((prev) => ({
      ...prev,
      reAddingModal: !this.props.audiobookState.reAddingModal,
      reAdding: !this.props.audiobookState.reAdding,
      refresh: !this.props.audiobookState.refresh,
      addAudiobookSeconds: this.seconds.current,
    }));
  };

  handleBack = () => {
    this.setStateModal((prev) => ({
      ...prev,
      modal: 1,
    }));
  };

  generateCategoriesList = () => {
    let multiSelectTable = [];

    this.props.categoriesState.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });

    return multiSelectTable;
  };

  changeCategories = (element) => {
    if (isNaN(element) && element != undefined) {
      this.setStateModal((prev) => ({
        ...prev,
        categories: element,
      }));
    }
  };
  nextPage = () => {
    this.setStateModal((prev) => ({
      ...prev,
      modal: 2,
    }));
  };

  reAddAudiobook = () => {
    const url = '/admin/audiobook/reAdding';
    const method = 'PATCH';
    const CHUNK_SIZE = 1024 * 1024 * 5;
    const reader = new FileReader();
    const fileName = this.stateModal.title + '_' + this.stateModal.author;
    const hashName = sha256(fileName).toString();
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

        this.seconds.current = buf.length / 10000;

        if (buf.length < CHUNK_SIZE) {
          let b64 = Buffer.from(buf).toString('base64');

          const jsonData = {
            audiobookId: this.props.audiobookDetail.id,
            hashName: hashName,
            fileName: fileName,
            part: part,
            parts: part,
            base64: b64,
            additionalData: {
              categories: this.stateModal.categories,
              title: this.stateModal.title,
              author: this.stateModal.author,
            },
          };

          this.setStateProgress((prev) => ({
            ...prev,
            maxParts: part,
            currentPart: part,
          }));

          HandleFetch(url, method, jsonData, this.props.token, this.props.i18n.language)
            .then((data) => {
              if (
                this.stateProgress.currentPart == this.stateProgress.maxParts ||
                Object.keys(data).length !== 0
              ) {
                this.setStateModal({
                  author: '',
                  title: '',
                  modal: 3,
                  fileAdded: true,
                  isNextButtonDisabled: false,
                  uploadEnded: false,
                });
              }
              this.setStateProgress((prev) => ({
                ...prev,
                currentPart: this.stateProgress.currentPart + 1,
              }));
            })
            .catch((e) => {
              this.props.setAudiobookState((prev) => ({
                ...prev,
                error: e,
              }));
            });
        } else {
          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            allparts = allparts + 1;
          }

          for (let i = 0; i < buf.length; i += CHUNK_SIZE) {
            const arr = new Uint8Array(buf).subarray(i, i + CHUNK_SIZE);

            this.setStateProgress((prev) => ({
              ...prev,
              maxParts: allparts,
              currentPart: part,
            }));

            let b64 = Buffer.from(arr).toString('base64');

            const jsonData = {
              audiobookId: this.props.audiobookDetail.id,
              hashName: hashName,
              fileName: fileName,
              part: part,
              parts: allparts,
              base64: b64,
              additionalData: {
                categories: this.stateModal.categories,
                title: this.stateModal.title,
                author: this.stateModal.author,
              },
            };

            HandleFetch(url, method, jsonData, this.props.token, this.props.i18n.language)
              .then((data) => {
                if (
                  this.stateProgress.currentPart == this.stateProgress.maxParts ||
                  Object.keys(data).length !== 0
                ) {
                  this.setStateModal({
                    author: '',
                    title: '',
                    modal: 3,
                    fileAdded: true,
                    isNextButtonDisabled: false,
                    uploadEnded: false,
                  });
                }
                this.setStateProgress((prev) => ({
                  ...prev,
                  currentPart: this.stateProgress.currentPart + 1,
                }));
              })
              .catch((e) => {
                this.props.setAudiobookState((prev) => ({
                  ...prev,
                  error: e,
                }));
              });

            part = part + 1;
          }
        }
      }
    };
    if (this.stateModal.file != null) {
      reader.readAsArrayBuffer(this.stateModal.file);
    }
  };
}
