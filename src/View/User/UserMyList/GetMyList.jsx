import GetCovers from './GetCovers';
import { AudiobookMyListProvider } from '../../../Providers/AudiobookMyListProvider';
import AudiobookDetailProviders from './AudiobookDetailProviders';

export default function GetMyList(props) {
  return (
    <AudiobookMyListProvider
      state={props.myListState}
      setState={props.setMyListState}
      token={props.token}
      i18n={props.i18n}
    >
      <GetCovers
        state={props.myListState}
        setState={props.setMyListState}
        token={props.token}
        t={props.t}
        i18n={props.i18n}
      />
      {props.myListState.detailModal &&
      props.myListState.detailModalAudiobook != null &&
      props.myListState.detailModalCategory != null ? (
        <AudiobookDetailProviders
          state={props.myListState}
          setState={props.setMyListState}
          token={props.token}
          t={props.t}
          i18n={props.i18n}
        />
      ) : null}
    </AudiobookMyListProvider>
  );
}
