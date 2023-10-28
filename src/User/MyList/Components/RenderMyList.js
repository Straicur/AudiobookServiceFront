import { v4 as uuidv4 } from "uuid";

export default function GetCovers(props) {
  const getImgUrl = (audiobook) => {
    if (props.coversState != undefined && props.coversState.length > 0) {
      let url = props.coversState.filter((obj) => obj.id == audiobook.id);

      if (url.length > 0 && url[0].url != "") {
        return process.env.REACT_APP_API_URL + url[0].url;
      } else {
        return "/noImg.jpg";
      }
    } else {
      return "/noImg.jpg";
    }
  };

  const showAudiobookModal = (audiobook, imgUrl) => {
    props.setState({
      ...props.state,
      detailModal: !props.state.detailModal,
      detailModalAudiobook: audiobook,
      detailModalCover: imgUrl,
      detailModalCategory: audiobook.categories[0],
    });
  };

  const returnAudioboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      props.audiobooks.map((audiobook) => {
        let imgUrl = getImgUrl(audiobook);
        return (
          <div className="col-2" key={uuidv4()}>
            <div
              className="card m-3 carousel-search-card"
              onClick={() => {
                showAudiobookModal(audiobook, imgUrl);
              }}
            >
              <div
                className={
                  audiobook.title.length > 17
                    ? audiobook.title.length > 46
                      ? "card-img-sm-ext-lg-title "
                      : "card-img-sm-lg-title"
                    : "card-img-sm-sm-title"
                }
              >
                <img
                  src={imgUrl == null ? "/noImg.jpg" : imgUrl}
                  className="card-img-top"
                />
              </div>

              <div className="card-body">
                {audiobook.title.length > 17 ? (
                  <h6 className="card-title">{audiobook.title}</h6>
                ) : (
                  <h5 className="card-title">{audiobook.title}</h5>
                )}
                <p className="card-text">{audiobook.author}</p>
              </div>
            </div>
          </div>
        );
      })
    );
    return audiobooksArray;
  };

  return (
    <div key={uuidv4()} className="row min_container_height">
      {props.coversState != undefined &&
      props.coversState.length > 0 &&
      props.audiobooks.length > 0 ? (
        returnAudioboks()
      ) : (
        <div className="text-white center_text fs-2">
          {props.t("emptyMyList")}
        </div>
      )}
    </div>
  );
}
