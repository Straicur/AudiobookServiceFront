import React, { useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export default function RenderSearchAudiobooksList(props) {
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

  const getImgUrl = (audiobook) => {
    if (props.coversState != undefined && props.coversState.length > 0) {
      let url = props.coversState.filter(
        (obj) => obj.audiobook == audiobook.id
      );

      if (url.length > 0) {
        return url[0].url;
      } else {
        return "/noImg.jpg";
      }
    } else {
      return "/noImg.jpg";
    }
  };

  const showAudiobookModal = (audiobook, imgUrl) => {
    props.setState({
      ...props.state,
      detailModal: !props.state.detailModal,
      detailModalAudiobook: audiobook,
      detailModalCover: imgUrl,
      detailModalCategory: audiobook.categories[0],
    });
  };

  const returnAudioboks = () => {
    let audiobooksArray = [];

    audiobooksArray.push(
      props.audiobooks.map((audiobook) => {
        let imgUrl = getImgUrl(audiobook);
        return (
          <div
            className="col-2"
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
            <div
              className="card m-3 carousel-search-card"
              onClick={() => {
                showAudiobookModal(audiobook, imgUrl);
              }}
            >
              <div className="card-search-img-sm">
                <img src={imgUrl} className="card-img-top" alt="..." />
              </div>

              <div className="card-body">
                <h5 className="card-title">{audiobook.title}</h5>
                <p className="card-text">{audiobook.author}</p>
              </div>
            </div>
          </div>
        );
      })
    );
    return audiobooksArray;
  };

  return (
    <div key={uuidv4()} className="row">
      {console.log(props)}
      {props.coversState != undefined && props.coversState.length > 0
        ? returnAudioboks()
        : null}
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
  //Zrób renderowanie dodatkowych jak w mainie
}
