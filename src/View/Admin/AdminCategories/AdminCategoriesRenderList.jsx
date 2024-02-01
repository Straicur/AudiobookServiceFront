import React from 'react';
import AdminAudiobookEditService from 'Service/Admin/AdminAudiobookEditService';

export default function AdminCategoriesRenderList(props) {
  const createTree = () => {
    let renderArray = [];
    let kids = [];

    const adminService = new AdminAudiobookEditService(props);

    adminService.recursiveTree(props.categories, renderArray, kids, null);

    return renderArray;
  };

  return (
    <div>
      <ul className='list-group'>{createTree()}</ul>
    </div>
  );
}
