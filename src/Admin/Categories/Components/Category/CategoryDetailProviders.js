import { AudiobookDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider";
import { AudiobookCoverDataProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookCoverDataProvider";
import { AudiobookPartProvider } from "../../../../Components/Providers/AudiobookProviders/AudiobookPartProvider";

import CategoryAudiobookDetailModal from "../Category/CategoryAudiobookDetailModal";

export default function CategoryDetailProviders(props) {
  return (
    <AudiobookDataProvider
      token={props.token}
      audiobookId={props.state.detailAudiobookElement.id}
    >
      <AudiobookCoverDataProvider
        token={props.token}
        audiobookId={props.state.detailAudiobookElement.id}
      >
        <AudiobookPartProvider
          token={props.token}
          audiobookId={props.state.detailAudiobookElement.id}
          part={props.state.detailAudiobookElementPart}
        >
          <CategoryAudiobookDetailModal
            state={props.state}
            setState={props.setState}
            t={props.t}
            token={props.token}
            categoryKey={props.categoryKey}
          />
        </AudiobookPartProvider>
      </AudiobookCoverDataProvider>
    </AudiobookDataProvider>
  );
}
