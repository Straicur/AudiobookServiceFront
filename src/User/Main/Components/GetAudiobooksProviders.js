import { AudiobookUserDataProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { AudiobookUserProposedProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserProposedProvider";
import GetAllAudiobooks from "./GetAllAudiobooks";
import RenderProposedList from "./RenderProposedList";

export default function GetAudiobooksProviders(props) {
  return (
    <AudiobookUserProposedProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      token={props.token}
    >
      <AudiobookUserDataProvider
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        page={props.audiobooksState.page}
        limit={props.audiobooksState.limit}
      >
        <RenderProposedList
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
        />
        <GetAllAudiobooks
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          token={props.token}
          t={props.t}
        />
      </AudiobookUserDataProvider>
    </AudiobookUserProposedProvider>
  );
}
