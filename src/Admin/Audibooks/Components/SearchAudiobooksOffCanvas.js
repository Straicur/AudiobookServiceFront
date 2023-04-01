import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useCategoryListStore } from "../../../store";

export default function SearchAudiobooksOffCanvas(props) {
  const [show, setShow] = useState(true);
  const [categoriesState, setCategories] = useState([]);

  const handleClose = () => {
    setShow(false);
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
  };

  const categoriesStore = useCategoryListStore();

  const categories = useCategoryListStore((state) => state.categories);
  const dateUpdate = useCategoryListStore((state) => state.dateUpdate);

  useEffect(() => {
    //ru niech poszuka tych danych i przypisze do state

    if (dateUpdate > Date.now() && dateUpdate != 0) {
      setCategories(categories);
    } else {
      categoriesStore.removeCategories();

      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories",
        "GET",
        null,
        props.token
      )
        .then((data) => {
          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }
          setCategories(data.categories);
        })
        .catch((e) => {
          props.setAudiobooksState({
            ...props.audiobooksState,
            error: e,
          });
          handleClose();
        });
    }
  }, []);

  const generateCategoriesList = () => {
    let multiSelectTable = [];
    categoriesState.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });
    return multiSelectTable;
  };

  const changeSort = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        sort: element.target.value,
      });
    }
  };

  const changeCategories = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        categories: element,
      });
    }
  };

  const changeTitle = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        title: element.target.value,
      });
    }
  };

  const changeAuthor = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        author: element.target.value,
      });
    }
  };

  const changeAlbum = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        album: element.target.value,
      });
    }
  };

  const changeParts = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        parts: element.target.value,
      });
    }
  };

  const changeAge = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        age: element.target.value,
      });
    }
  };

  const changeYear = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        year: element.target.value,
      });
    }
  };

  const changeDuration = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        duration: element.target.value,
      });
    }
  };

  const resetStates = () => {
    props.setSearchState({
      sort: 0,
      categories: [],
      title: "",
      author: "",
      album: "",
      parts: 0,
      age: 0,
      year: 0,
      duration: 0,
    });
  };

  const formatDuration = () => {
    return new Date(props.searchState.duration * 1000)
      .toISOString()
      .slice(11, 19);
  };

  const searchAgain = () => {
    props.refetch();
    handleClose();
  };

  // 2 store i ustawianie tych przechowywanych
  // 3 ustaw button na refresh i close tego filtra (Po wysłaniu ma też zapisać te dane go store)
  // 4 dodaj przewijanie stron
  // 5 dodawanie audiobooka ma mieć jeszcze multi select przy dodaniu tytułu i autora, czyści state kategorii przy wyjściu z modalu
  // 6 Dodaj przycisk który wyświetli mi listę kategorii w postaci drzewa i w niej mam mieć możliwsoć przypisania audiobooka do niej (DETALE)
  // 7 w detalach audiobooka mam mieć listę jego kategorii i obok każdego rekordu ma być przycisk który umożliwi usunięcie go z kategorii (DETALE)
  // 8 W detalach ma być na dole samym lista kometarzy i niech to nie będzie jak w kategoriach w modalu bo za dużo tych modali A strona i tak dla niego jest poświęcona (DETALE)
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="bg-dark text-light off_canvas_with"
      backdrop="static"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="row">
            <div className="col">
              <h2>{props.t("filters")}</h2>
            </div>
            <div className="col">
              <Button
                variant="success"
                size="sm"
                color="success"
                className=" btn button mt-2"
                onClick={() => resetStates()}
              >
                {props.t("reset")}
              </Button>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <InputGroup className="mb-1 input_modal py-1">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("sort")}
          </InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              changeSort(e);
            }}
            value={props.searchState.sort}
          >
            <option>{props.t("selectSort")}</option>
            <option value={1}>{props.t("popular")}</option>
            <option value={2}>{props.t("lestPopular")}</option>
            <option value={3}>{props.t("latest")}</option>
            <option value={4}>{props.t("oldest")}</option>
            <option value={5}>{props.t("aplhabeticalAsc")}</option>
            <option value={6}>{props.t("aplhabeticalDesc")}</option>
            <option value={7}>{props.t("topRated")}</option>
            <option value={8}>{props.t("worstRated")}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("categories")}
          </InputGroup.Text>
          <DropdownMultiselect
            placeholder={props.t("selectCategories")}
            placeholderMultipleChecked={props.t("slectedMultiCategories")}
            selectDeselectLabel={props.t("slectedAll")}
            options={generateCategoriesList()}
            name="countries"
            handleOnChange={(e) => {
              changeCategories(e);
            }}
            selected={props.searchState.categories}
            className={"dropdown_multiselect"}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("title")}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.title}
            onChange={(e) => {
              changeTitle(e);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("author")}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.author}
            onChange={(e) => {
              changeAuthor(e);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("album")}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.album}
            onChange={(e) => {
              changeAlbum(e);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("parts")}
          </InputGroup.Text>
          <Form.Control
            type="number"
            onChange={(e) => {
              changeParts(e);
            }}
            value={props.searchState.parts}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("age")}
          </InputGroup.Text>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              changeAge(e);
            }}
            value={props.searchState.age}
          >
            <option> {props.t("slelectAge")}</option>
            <option value={1}>3-7</option>
            <option value={2}>7-12</option>
            <option value={3}>12-16</option>
            <option value={4}>16-18</option>
            <option value={5}>18+</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("year")}
          </InputGroup.Text>
          <Form.Control
            type="date"
            value={props.searchState.year}
            onChange={(e) => {
              changeYear(e);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          {props.t("duration")}: {formatDuration()}
          <Form.Range
            onChange={(e) => {
              changeDuration(e);
            }}
            min={0}
            max={86399}
            step={1}
            value={props.searchState.duration}
          />
        </InputGroup>
        <div className="row mx-1">
          <Button
            variant="success"
            size="lg"
            color="success"
            className=" btn button mt-2"
            onClick={() => searchAgain()}
          >
            {props.t("search")}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
