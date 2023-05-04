import { v4 as uuidv4 } from "uuid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function RenderCarousel(audiobooks) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
  const render = () => {
    return (
      <Carousel responsive={responsive} infinite={true}>
        {audiobooks.forEach((audiobook) => {
   
            return (
              <div
                className="card mx-3 h-100 list-bg"
                key={uuidv4()}
                // onClick={() => {
                //   showAudiobookModal(e.setKey, e.title);
                // }}
              >
                {/* <img
                  src={audiobook.imgUrl === "brak" ? "/noImg.jpg" : audiobook.imgUrl}
                  className="card-img-top"
                  alt="..."
                /> */}
                <div className="card-body">
                  <h5 className="card-title text-light">{audiobook.title}</h5>
                  <p className="card-text text-light">{audiobook.desc}</p>
                </div>
              </div>
            );
          
        })}
      </Carousel>
    )
  };

  return <div>{render()}</div>;
}
