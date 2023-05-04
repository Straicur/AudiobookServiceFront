import { v4 as uuidv4 } from "uuid";

export default function RenderAudiobookColumn(audiobooks) {
  const render = () => {
    console.log(audiobooks)
    return audiobooks.map((audiobook) => {
      return (
        
        <div key={uuidv4()} className="col-sm-3 py-2 ">
          <div
            className="card h-100 list-bg"
            // onClick={() => {
            //   showAudiobookModal(e.setKey, e.title);
            // }}
          >
            {/* <img
              src={e.imgUrl === "brak" ? "/noImg.jpg" : e.imgUrl}
              className="card-img-top"
              alt="..."
            /> */}
            <div className="card-body">
              <h5 className="card-title text-light">{audiobook.title}</h5>
              <p className="card-text text-light">{audiobook.author}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{render()}</div>;
}
