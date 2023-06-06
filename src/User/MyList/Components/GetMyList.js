import { AudiobookMyListProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import GetCovers from "./GetCovers";

export default function GetMyList(props) {
  return (
    <AudiobookMyListProvider
      state={props.myListState}
      setState={props.setMyListState}
      token={props.token}
    >
      <GetCovers
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
      />
    </AudiobookMyListProvider>
  );
}
