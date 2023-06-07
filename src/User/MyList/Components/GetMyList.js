
import GetCovers from "./GetCovers";

export default function GetMyList(props) {
  return (

      <GetCovers
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
      />

  );
}
