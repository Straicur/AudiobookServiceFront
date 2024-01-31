import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminAudiobookRenderCommentsService from 'Service/Admin/AdminAudiobookRenderCommentsService';

export default function AdminAudiobookRenderCommentsList(props) {
  const adminService = new AdminAudiobookRenderCommentsService(props);

  const renderTree = () => {
    let renderArray = [];

    if (props.audiobookCommnets != undefined) {
      adminService.createTree(props.audiobookCommnets.comments, renderArray);
    }

    if (props.audiobookCommnets != null && props.audiobookCommnets.comments.length == 0) {
      renderArray.push(
        <div key={uuidv4()} className='row text-center'>
          <div className='col-md-6 offset-md-3 '>
            <h3>{props.t('empty')}</h3>
          </div>
        </div>,
      );
    }

    return renderArray;
  };
  return (
    <div>
      <ul className='list-group'>{renderTree()}</ul>
    </div>
  );
}
