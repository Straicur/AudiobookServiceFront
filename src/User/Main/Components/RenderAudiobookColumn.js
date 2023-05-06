import { v4 as uuidv4 } from "uuid";
export default function RenderAudiobookColumn(audiobooks,userAudiobooks) {

  const getImgUrl = (audiobook) =>{
    if(userAudiobooks != undefined){
      let url = userAudiobooks.filter(obj => obj.audiobook == audiobook.id)
      userAudiobooks.forEach(element => {
        console.log(element)
      });
      // console.log(audiobook.id)
   
      // console.log(userAudiobooks)
      // console.log(url)
      // if(url.length > 0){
      //   return url[0].url;
      // }
      // else{
        return "/noImg.jpg"
      // }
    }
  
    else{
      return "/noImg.jpg"
    }
  }

  const render = () => {
    return audiobooks.map((audiobook) => {
      return (
        
        <div key={uuidv4()} className="col-sm-3 py-2 ">
          <div
            className="card h-100 list-bg"
            // onClick={() => {
            //   showAudiobookModal(e.setKey, e.title);
            // }}
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

  return <div>{render()}</div>;
}
