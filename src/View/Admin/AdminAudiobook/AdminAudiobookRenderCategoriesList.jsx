import React from 'react';

import AdminAudiobookRenderCategoriesService from 'Service/Admin/AdminAudiobookRenderCategoriesService';

export default function AdminAudiobookRenderCategoriesList(props) {
  const adminService = new AdminAudiobookRenderCategoriesService(props);

  const createTree = () => {
    let renderArray = [];
    let kids = [];

    adminService.recursiveTree(props.categories, renderArray, kids, null);

    return renderArray;
  };

  return (
    <div>
      <ul className='list-group categories_add_list overflow-auto'>{createTree()}</ul>
    </div>
  );
}
