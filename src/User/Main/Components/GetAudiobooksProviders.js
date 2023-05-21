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
        {!props.audiobooksState.search ? (
          <RenderProposedList
            state={props.audiobooksState}
            setState={props.setAudiobooksState}
          />
        ) : null}

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
