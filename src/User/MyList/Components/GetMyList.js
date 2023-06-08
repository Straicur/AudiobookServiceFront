import GetCovers from "./GetCovers";
import { AudiobookMyListProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";
import AudiobookDetailProviders from "./AudiobookDetailProviders";

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
      {props.myListState.detailModal &&
      props.myListState.detailModalAudiobook != null &&
      props.myListState.detailModalCover != null &&
      props.myListState.detailModalCategory != null ? (
        <AudiobookDetailProviders
          state={props.myListState}
          setState={props.setMyListState}
          token={props.token}
          t={props.t}
        />
      ) : null}
    </AudiobookMyListProvider>
  );
}
