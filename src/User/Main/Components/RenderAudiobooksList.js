import React, { useEffect, useRef, useCallback } from "react";
import RenderCarousel from "./RenderCarousel";
import RenderAudiobookColumn from "./RenderAudiobookColumn";
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
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [props.loading, props.hasMore]
  );

  useEffect(() => {
    if (lastItemRef.current && lastItemOffsetTopRef.current !== null) {
      setTimeout(function () {
        window.scrollTo({
          top: lastItemOffsetTopRef.current,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [props.audiobooks]);

  const renderColumns = () => {
    let renderCategories = [];

    if (props.audiobooks != null && props.coversState.length > 0) {
      props.audiobooks.categories.forEach((category, index) => {
        let renderAudiobooks = [];

        if (category.audiobooks.length > 0 && category.audiobooks.length <= 4) {
          renderAudiobooks.push(
            RenderAudiobookColumn(props, category.audiobooks)
          );
        } else if (category.audiobooks.length > 4) {
          renderAudiobooks.push(RenderCarousel(props, category.audiobooks));
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
              className="text-light"
            >
              <div className="fw-bold fs-1 ms-2 mb-2">{category.name}</div>
              {renderAudiobooks}
              <hr></hr>
              {props.hasMore ? (
                <div className="row mb-4 p-5 justify-content-center">
                  <div className="col-2 fs-2">{props.t("loadMore")}</div>
                  <div className="col-1 align-self-center">
                    <i class="bi bi-chevron-double-down"></i>
                  </div>
                </div>
              ) : null}
              <div className="mt-4" ref={lastBookElementRef}></div>
            </div>
          );
        } else {
          renderCategories.push(
            <div key={uuidv4()} className="text-light">
              <div className="fw-bold fs-1 ms-2 mb-2">{category.name}</div>
              {renderAudiobooks}
              <hr></hr>
            </div>
          );
        }
      });
    }
    return renderCategories;
  };

  return renderColumns();
}
