import { HandleFetch } from 'Util/HandleFetch';
import sha256 from 'crypto-js/sha256';
import { Buffer } from 'buffer';
import FormService from 'Service/Common/FormService';

export default class AdminAudiobookReAddingService extends FormService {
  constructor(stateModal, setStateModal, props, seconds, currentPart, maxParts) {
    super(setStateModal);
    this.stateModal = stateModal;
    this.setStateModal = setStateModal;
    this.props = props;
    this.seconds = seconds;
    this.currentPart = currentPart;
    this.maxParts = maxParts;
  }

  handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (file.type == 'application/zip' || file.type == 'application/vnd.rar') {
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
  //TODO TU pamiętaj że usuwam powiadomienia i komentarze dla audiobooka jeszcze z cache jesli zaznacze te checkboxy
  generateCategoriesList = () => {
    let multiSelectTable = [];

    this.props.categories.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });

    return multiSelectTable;
  };

  changeCategories = (element) => {
    if (element != undefined) {
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
    const token = this.props.token;
    const language = this.props.i18n.language;
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
            deleteNotifications: false,
            deleteComments: false,
            additionalData: {
              categories: this.stateModal.categories,
              title: this.stateModal.title,
              author: this.stateModal.author,
            },
          };

          this.maxParts.current = part;
          this.currentPart.current = 0;

          HandleFetch(url, method, jsonData, token, language)
            .then((data) => {
              if (
                this.currentPart.current == this.maxParts.current ||
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

              this.currentPart.current = this.currentPart.current + 1;
            })
            .catch((e) => {
              console.log(e);
              // this.props.setAudiobookState((prev) => ({
              //   ...prev,
              //   error: e,
              // }));
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
              audiobookId: this.props.audiobookDetail.id,
              hashName: hashName,
              fileName: fileName,
              part: part,
              parts: allparts,
              base64: b64,
              deleteNotifications: false,
              deleteComments: false,
              additionalData: {
                categories: this.stateModal.categories,
                title: this.stateModal.title,
                author: this.stateModal.author,
              },
            };

            HandleFetch(url, method, jsonData, token, language)
              .then((data) => {
                if (
                  this.currentPart.current == this.maxParts.current ||
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

                this.currentPart.current = this.currentPart.current + 1;
              })
              .catch((e) => {
                console.log(e);
                // this.props.setAudiobookState((prev) => ({
                //   ...prev,
                //   error: e,
                // }));
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
