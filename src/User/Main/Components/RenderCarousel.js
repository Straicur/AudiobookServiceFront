import { v4 as uuidv4 } from "uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function RenderCarousel(props, category) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
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

  const showAudiobookModal = (audiobook, imgUrl) => {
    props.setState({
      ...props.state,
      detailModal: !props.detailModal,
      detailModalAudiobook: audiobook,
      detailModalCover: imgUrl == null ? "/noImg.jpg" : imgUrl,
      detailModalCategory: category,
    });
  };

  const returnAudioboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      category.audiobooks.map((audiobook) => {
        let imgUrl = getImgUrl(audiobook);
        return (
          <div
            className="card mx-3 carousel-card"
            onClick={() => {
              showAudiobookModal(audiobook, imgUrl);
            }}
          >
            <div className="card-img-sm">
              <img
                src={imgUrl == null ? "/noImg.jpg" : imgUrl}
                className="card-img-top"
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">{audiobook.title}</h5>
              <p className="card-text">{audiobook.author}</p>
            </div>
          </div>
        );
      })
    );
    return audiobooksArray;
  };

  const render = () => {
    return (
      <Carousel responsive={responsive} infinite={true}>
        {returnAudioboks()}
      </Carousel>
    );
  };

  return (
    <div key={uuidv4()}>
      {props.coversState != undefined && props.coversState.length > 0
        ? render()
        : null}
    </div>
  );
}
