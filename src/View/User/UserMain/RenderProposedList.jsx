import RenderProposedCarousel from './RenderProposedCarousel';
import { v4 as uuidv4 } from 'uuid';
import { useAudiobookUserProposed } from 'Providers/AudiobookUserProposedProvider';

export default function RenderProposedList(props) {
  const [audiobookProposed, setAudiobookProposed, setRefetchState] = useAudiobookUserProposed();

  const renderColumns = () => {
    let renderCategories = [];

    if (
      audiobookProposed != null &&
      audiobookProposed.audiobooks.length > 0 &&
      props.coversState.length > 0
    ) {
      renderCategories.push(
        <div key={uuidv4()}>
          <div className='fw-bold fs-1 ms-2 mb-2 text-light'>{props.t('proposed')}</div>
          {RenderProposedCarousel(props, audiobookProposed.audiobooks)}
          <hr className=' text-light'></hr>
        </div>,
      );
    }
    return renderCategories;
  };

  return renderColumns();
}
