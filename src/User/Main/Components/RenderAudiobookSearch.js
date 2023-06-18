import GetAllSearchAudiobooks from "./GetAllSearchAudiobooks";
import { AudiobookSearchProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookSearchProvider";

export default function RenderAudiobookSearch(props) {
  return (
    <AudiobookSearchProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      title={props.audiobooksState.searchText}
      token={props.token}
    >
      <GetAllSearchAudiobooks
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        t={props.t}
      />
    </AudiobookSearchProvider>
  );
}