import GetAllSearchAudiobooks from './GetAllSearchAudiobooks';
import { AudiobookSearchProvider } from '../../../Providers/AudiobookSearchProvider';

export default function RenderAudiobookSearch(props) {
  return (
    <AudiobookSearchProvider
      state={props.audiobooksState}
      setState={props.setAudiobooksState}
      title={props.audiobooksState.searchText}
      token={props.token}
      i18n={props.i18n}
    >
      <GetAllSearchAudiobooks
        state={props.audiobooksState}
        setState={props.setAudiobooksState}
        token={props.token}
        t={props.t}
        i18n={props.i18n}
      />
    </AudiobookSearchProvider>
  );
}
