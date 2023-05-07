import { v4 as uuidv4 } from "uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function RenderCarousel(props, audiobooks) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
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

  const showAudiobookModal = (audiobook) => {
    props.setState({
      ...props.state,
      detailModal: !props.detailModal,
      detailModalAudiobook: audiobook,
    });
  };
  const returnAudioboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      audiobooks.map((audiobook) => {
        return (
          <div
            className="card mx-3 h-100 list-bg"
            key={uuidv4()}
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
              <p className="card-text text-light">{audiobook.desc}</p>
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
    <div>
      {props.coversState != undefined && props.coversState.length > 0
        ? render()
        : null}
    </div>
  );
}
