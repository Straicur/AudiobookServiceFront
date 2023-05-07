import { v4 as uuidv4 } from "uuid";
export default function RenderAudiobookColumn(props, audiobooks) {
  const getImgUrl = (audiobook) => {
    if (props.coversState != undefined && props.coversState.length > 0) {
      let url = props.coversState.filter(
        (obj) => obj.audiobook == audiobook.id
      );

      if (url.length > 0) {
        return url[0].url;
      } else {
        return "/noImg.jpg";
      }
    } else {
      return "/noImg.jpg";
    }
  };

  const showAudiobookModal = (audiobook) => {
    props.setState({
      ...props.state,
      detailModal: !props.detailModal,
      detailModalAudiobook: audiobook,
    });
  };

  const render = () => {
    return audiobooks.map((audiobook) => {
      return (
        <div key={uuidv4()} className="col-sm-3 py-2 ">
          <div
            className="card h-100 list-bg"
            onClick={() => {
              showAudiobookModal(audiobook);
            }}
          >
            <img
              src={getImgUrl(audiobook)}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title text-light">{audiobook.title}</h5>
              <p className="card-text text-light">{audiobook.author}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div className="row">{render()}</div>;
}
