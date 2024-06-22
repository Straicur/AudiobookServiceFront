import React, { useLayoutEffect, useRef } from 'react';
import UserMainRenderCarousel from './UserMainRenderCarousel';
import { v4 as uuidv4 } from 'uuid';

export default function UserMainRenderAudiobooksList(props) {
  const lastItemOffsetTopRef = useRef(null);

  let hasMore = props.state.page + 1 < props.maxPage;

  const renderNewPage = (e) => {
    if (hasMore) {
      lastItemOffsetTopRef.current = e.pageY;

      props.setState((prev) => ({
        ...prev,
        page: props.state.page + 1,
        wasSearch: false,
        refresh: true,
      }));
    }
  };

  const mouseOver = (element) => {
    let children = element.currentTarget.children[0];

    children.classList.remove('bi-chevron-double-right');
    children.classList.add('bi-chevron-double-down');
  };

  const mouseLeave = (element) => {
    let children = element.currentTarget.children[0];

    children.classList.remove('bi-chevron-double-down');
    children.classList.add('bi-chevron-double-right');
  };

  const renderColumns = () => {
    let renderCategories = [];
    if (props.audiobooksList.current != null) {
      props.audiobooksList.current.forEach((pageData, listIndex) => {
        if (pageData !== null && listIndex <= props.state.page) {
          pageData.categories.forEach((category, index) => {
            let renderAudiobooks = [];

            if (category.audiobooks.length > 0) {
              renderAudiobooks.push(UserMainRenderCarousel(props, category));
            }

            if (pageData.categories.length == index + 1 && listIndex == props.state.page) {
              renderCategories.push(
                <div id={category.categoryKey} key={uuidv4()}>
                  <div className='fw-bold fs-1 ms-2 mb-2 text-light'>{category.name}</div>
                  {renderAudiobooks}
                </div>,
              );
            } else {
              renderCategories.push(
                <div key={uuidv4()}>
                  <div className='fw-bold fs-1 ms-2 mb-2 text-light'>{category.name}</div>
                  {renderAudiobooks}
                  <hr className=' text-light'></hr>
                </div>,
              );
            }
          });
        }
      });
    }
    return renderCategories;
  };

  useLayoutEffect(() => {
    if (lastItemOffsetTopRef.current !== null) {
      setTimeout(function () {
        window.scrollTo({
          top: lastItemOffsetTopRef.current - 100,
          behavior: 'smooth',
        });
        lastItemOffsetTopRef.current = null;
      }, 200);
    }
  }, [lastItemOffsetTopRef.current]);

  return (
    <div>
      {renderColumns()} <hr className=' text-light'></hr>
      {hasMore ? (
        <div className='row justify-content-center text-light'>
          <div
            className='col-2 fs-3 align-self-center load_more'
            onClick={(e) => renderNewPage(e)}
            onMouseOver={(e) => mouseOver(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            {props.t('loadMore')} <i className='bi bi-chevron-double-down'></i>
          </div>
        </div>
      ) : null}
    </div>
  );
}
