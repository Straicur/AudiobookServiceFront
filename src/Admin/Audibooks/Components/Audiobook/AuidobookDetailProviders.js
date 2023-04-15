import { AudiobookDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { AudiobookCoverDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { AudiobookPartProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";
import { AudiobookCommentsProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";

import AudiobookDetail from "./AudiobookDetail";

export default function AuidobookDetailProviders(props) {
  return (
    <AudiobookDataProvider
      token={props.token}
      audiobookId={props.audiobookId}
    >
      <AudiobookCoverDataProvider
        token={props.token}
        audiobookId={props.audiobookId}
      >
        <AudiobookPartProvider
          token={props.token}
          audiobookId={props.audiobookId}
          part={props.audiobookState.part}
        >
          <AudiobookCommentsProvider
            token={props.token}
            audiobookId={props.audiobookId}
          >
            <AudiobookDetail
              audiobookState={props.audiobookState}
              setAudiobookState={props.setAudiobookState}
              t={props.t}
              token={props.token}
            />
          </AudiobookCommentsProvider>
        </AudiobookPartProvider>
      </AudiobookCoverDataProvider>
    </AudiobookDataProvider>
  );
}
