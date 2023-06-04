import React, { useEffect, useRef, useCallback } from "react";
import RenderCarousel from "./RenderCarousel";
import { v4 as uuidv4 } from "uuid";

export default function RenderAudiobooksList(props) {
  const lastItemRef = useRef(null);
  const lastItemOffsetTopRef = useRef(null);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (props.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && props.hasMore) {
          observer.height = entries[0].target.offsetTop;

          props.setState({
            ...props.state,
            page: props.state.page + 1,
            wasSearch: false
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.loading, props.hasMore]
  );

  useEffect(() => {
    if (lastItemRef.current && lastItemOffsetTopRef.current !== null && !props.state.wasSearch) {
      setTimeout(function () {
        window.scrollTo({
          top: lastItemOffsetTopRef.current,
          behavior: "smooth",
        });
      }, 1000);
    }
  }, [props.audiobooks]);

  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobooks != null && props.coversState.length > 0) {
      props.audiobooks.categories.forEach((category, index) => {
        let renderAudiobooks = [];

        if (category.audiobooks.length > 0) {
          renderAudiobooks.push(RenderCarousel(props, category));
        }

        if (props.audiobooks.categories.length == index + 1) {
          renderCategories.push(
            <div
              id={category.categoryKey}
              key={uuidv4()}
              ref={lastItemRef}
              onLoad={() => {
                if (
                  lastItemRef.current &&
                  lastItemOffsetTopRef.current === null
                ) {
                  lastItemOffsetTopRef.current = lastItemRef.current.offsetTop;
                }
              }}
            >
              <div className="fw-bold fs-1 ms-2 mb-2  text-light">
                {category.name}
              </div>
              {renderAudiobooks}
              <hr className=" text-light"></hr>
              {props.hasMore ? (
                <div className="row mb-4 p-5 justify-content-center  text-light">
                  <div className="col-2 fs-2">{props.t("loadMore")}</div>
                  <div className="col-1 align-self-center">
                    <i className="bi bi-chevron-double-down"></i>
                  </div>
                </div>
              ) : null}
              <div className="mt-4" ref={lastBookElementRef}></div>
            </div>
          );
        } else {
          renderCategories.push(
            <div key={uuidv4()}>
              <div className="fw-bold fs-1 ms-2 mb-2 text-light">
                {category.name}
              </div>
              {renderAudiobooks}
              <hr className=" text-light"></hr>
            </div>
          );
        }
      });
    }
    return renderCategories;
  };

  return renderColumns();
}
