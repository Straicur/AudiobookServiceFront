import { AudiobookDataProvider } from "../../../Providers/AudiobookDataProvider";
import { AdminAudiobookCoverDataProvider } from "../../../Providers/AdminAudiobookCoverDataProvider";
import { AdminAudiobookPartProvider } from "../../../Providers/AdminAudiobookPartProvider";

import CategoryAudiobookDetailModal from "../Category/CategoryAudiobookDetailModal";

export default function CategoryDetailProviders(props) {
  return (
    <AudiobookDataProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      token={props.token}
      audiobookId={props.state.detailAudiobookElement.id}
      i18n={props.i18n}
    >
      <AdminAudiobookCoverDataProvider
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        audiobookId={props.state.detailAudiobookElement.id}
        i18n={props.i18n}
      >
        <AdminAudiobookPartProvider
          state={props.audiobooksState}
          setState={props.setAudiobooksState}
          token={props.token}
          audiobookId={props.state.detailAudiobookElement.id}
          part={props.state.detailAudiobookElementPart}
          i18n={props.i18n}
        >
          <CategoryAudiobookDetailModal
            state={props.state}
            setState={props.setState}
            t={props.t}
            token={props.token}
            categoryKey={props.categoryKey}
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            i18n={props.i18n}
          />
        </AdminAudiobookPartProvider>
      </AdminAudiobookCoverDataProvider>
    </AudiobookDataProvider>
  );
}
