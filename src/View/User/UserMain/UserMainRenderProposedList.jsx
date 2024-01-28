import UserMainRenderProposedCarousel from './UserMainRenderProposedCarousel';
import { v4 as uuidv4 } from 'uuid';
import { useAudiobookUserProposed } from 'Providers/AudiobookUserProposedProvider';

export default function UserMainRenderProposedList(props) {
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
          {UserMainRenderProposedCarousel(props, audiobookProposed.audiobooks)}
          <hr className=' text-light'></hr>
        </div>,
      );
    }
    return renderCategories;
  };

  return renderColumns();
}
