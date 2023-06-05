import { AudiobookMyListProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import RenderMyList from "./RenderMyList";
export default function GetMyList(props) {
  return (
    <AudiobookMyListProvider
      state={props.myListState}
      setState={props.setMyListState}
      token={props.token}
    >
      <RenderMyList
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
      />
    </AudiobookMyListProvider>
  );
}
