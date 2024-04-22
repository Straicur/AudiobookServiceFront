import React from 'react';
import UserMainRenderProposedCarousel from './UserMainRenderProposedCarousel';
import { v4 as uuidv4 } from 'uuid';

export default function UserMainRenderProposedList(props) {
  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobookProposed != null && props.audiobookProposed.audiobooks.length > 0) {
      renderCategories.push(
        <div key={uuidv4()}>
          <div className='fw-bold fs-1 ms-2 mb-2 text-light'>{props.t('proposed')}</div>
          {UserMainRenderProposedCarousel(props, props.audiobookProposed.audiobooks)}
          <hr className=' text-light'></hr>
        </div>,
      );
    }
    return renderCategories;
  };

  return renderColumns();
}
