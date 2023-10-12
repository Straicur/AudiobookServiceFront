import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../../Components/HandleFetch";

export default function AudiobookCategoryList(props) {
  const deleteFromCategory = (category) => {
    HandleFetch(
      "/admin/category/remove/audiobook",
      "DELETE",
      {
        categoryId: category.id,
        audiobookId: props.audiobookDetail.id,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setAudiobookDetailRefetch(true);
      })
      .catch((e) => {
        props.setAudiobookState({
          ...props.audiobookState,
          error: e,
        });
      });
  };
  const createCategory = (category) => {
    return (
      <div key={uuidv4()} className="row border border-secondary mb-1">
        <div className="col-10">
          <div className="row">
            <div className="col">{props.t("name")}:</div>
            <div className="col">{category.name}</div>
            <div className="col">{props.t("active")}:</div>
            <div className="col">
              {category.active ? (
                <i className="bi bi-bookmark-check-fill"></i>
              ) : (
                <i className="bi bi-bookmark-dash"></i>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">{props.t("categoryKey")}:</div>
            <div className="col">{category.categoryKey}</div>
          </div>
        </div>
        <div className="col-2 align-self-center">
          <Button
            name="en"
            size="sm"
            className="btn button danger_button"
            onClick={() => deleteFromCategory(category)}
          >
            {props.t("delete")}
          </Button>
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

    if (
      props.audiobookDetail != null &&
      props.audiobookDetail.categories == 0
    ) {
      categories.push(
        <div
          key={uuidv4()}
          className="row d-flex justify-content-center text-center"
        >
          <h5>{props.t("empty")}</h5>
        </div>
      );
    }
    return (
      <div className="row d-flex justify-content-center me-1 category_data overflow-auto">
        {categories}
      </div>
    );
  };

  return getCategoryList();
}
