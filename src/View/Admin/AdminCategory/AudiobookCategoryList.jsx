import { v4 as uuidv4 } from 'uuid';

export default function AudiobookCategoryList(props) {
  const createCategory = (category) => {
    return (
      <div
        key={uuidv4()}
        className='row border border-secondary category_data mb-1 rounded'
      >
        <div className='row'>
          <div className='col-3'>{props.t('name')}:</div>
          <div className='col-8'>{category.name}</div>
          <div className='col-3'>{props.t('active')}:</div>
          <div className='col'>
            {category.active ? (
              <i className='bi bi-bookmark-check-fill'></i>
            ) : (
              <i className='bi bi-bookmark-dash'></i>
            )}
          </div>
        </div>
        <div className='row'></div>
        <div className='row'>
          <div className='col-1'>{props.t('categoryKey')}:</div>
          <div className='col'>{category.categoryKey}</div>
        </div>
      </div>
    );
  };

  const getCategoryList = () => {
    let categories = [];
    if (
      props.audiobookDetail != null &&
      props.audiobookDetail.categories != undefined
    ) {
      props.audiobookDetail.categories.forEach((category) => {
        categories.push(createCategory(category));
      });
    }

    return (
      <div className='row text-light d-flex justify-content-center mx-1 categories_detail_modal overflow-auto'>
        {categories}
      </div>
    );
  };

  return getCategoryList();
}
