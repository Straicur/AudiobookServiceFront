import { AudiobookCommentsProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCommentsProvider";

import AudiobookCommentsModal from "./AudiobookCommentsModal";

export default function AudiobookCommentsDetailModalProviders(props) {
  return (
    <AudiobookCommentsProvider
      token={props.token}
      audiobookId={props.state.detailAudiobookElement.id}
      categoryKey={props.categoryKey}
    >
      <AudiobookCommentsModal
        state={props.state}
        setState={props.setState}
        t={props.t}
        token={props.token}
        categoryKey={props.categoryKey}
      />
    </AudiobookCommentsProvider>
  );
}
