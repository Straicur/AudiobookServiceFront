import React, { useLayoutEffect, useRef } from 'react';
import UserMainRenderCarousel from './UserMainRenderCarousel';
import { v4 as uuidv4 } from 'uuid';

export default function UserMainRenderAudiobooksList(props) {
  const lastPageChangeRef = useRef(false);
  const lastItemRef = useRef(null);
  const lastItemOffsetTopRef = useRef(null);

  let hasMore = props.audiobooks !== null && props.audiobooks.page < props.audiobooks.maxPage;

  const renderNewPage = () => {
    if (hasMore) {
      lastPageChangeRef.current = true;

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

    if (props.audiobooks != null) {
      props.audiobooks.categories.forEach((category, index) => {
        let renderAudiobooks = [];

        if (category.audiobooks.length > 0) {
          renderAudiobooks.push(UserMainRenderCarousel(props, category));
        }

        if (props.audiobooks.categories.length == index + 1) {
          renderCategories.push(
            <div
              id={category.categoryKey}
              key={uuidv4()}
              ref={lastItemRef}
              // onLoad={() => {
              //   if (lastItemRef.current && lastItemOffsetTopRef.current == null && hasMore) {
              //     lastItemOffsetTopRef.current = lastItemRef.current.offsetTop;
              //   }
              // }}
            >
              <div className='fw-bold fs-1 ms-2 mb-2 text-light'>{category.name}</div>
              {renderAudiobooks}
              <hr className=' text-light'></hr>
              {hasMore ? (
                <div className='row justify-content-center text-light'>
                  <div
                    className='col-2 fs-3 align-self-center load_more'
                    onClick={() => renderNewPage()}
                    onMouseOver={(e) => mouseOver(e)}
                    onMouseLeave={(e) => mouseLeave(e)}
                  >
                    {props.t('loadMore')} <i className='bi bi-chevron-double-down'></i>
                  </div>
                </div>
              ) : null}
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
    return renderCategories;
  };

  useLayoutEffect(() => {
    if (
      lastItemRef.current !== null &&
      lastItemOffsetTopRef.current !== null &&
      lastPageChangeRef.current
    ) {
      setTimeout(function () {
        window.scrollTo({
          top: lastItemOffsetTopRef.current,
          behavior: 'smooth',
        });
        lastPageChangeRef.current = false;
        lastItemOffsetTopRef.current = null;
        lastItemRef.current = null;
      }, 1000);
    }
  }, [props.audiobooks]);

  useLayoutEffect(() => {
    if (lastItemRef.current && lastItemOffsetTopRef.current === null && hasMore) {
      lastItemOffsetTopRef.current = lastItemRef.current.offsetTop;
    }
  }, []);

  return renderColumns();
}
