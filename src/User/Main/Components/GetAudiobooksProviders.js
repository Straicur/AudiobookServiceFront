import { AudiobookUserDataProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserDataProvider";
import { AudiobookUserProposedProvider } from "../../../Components/Providers/AudiobookProviders/AudiobookUserProposedProvider";
import GetAllAudiobooks from "./GetAllAudiobooks";

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
