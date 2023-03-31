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

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className="bg-dark text-light off_canvas_with"
      backdrop="static"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.t("filters")}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <InputGroup className="mb-1 input_modal py-1">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("sort")}
          </InputGroup.Text>
          <Form.Select aria-label="Default select example">
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
            placeholder=  {props.t("selectCategories")}
            placeholderMultipleChecked=  {props.t("slectedMultiCategories")}
            options={generateCategoriesList()}
            name="countries"
            handleOnChange={(selected) => {
              console.log(selected);
            }}
            className={"dropdown_multiselect"}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("title")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("author")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("album")}
          </InputGroup.Text>
          <Form.Control
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("parts")}
          </InputGroup.Text>
          <Form.Control
            type="number"
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>

        <InputGroup className="mb-1 input_modal py-1 ">
          <InputGroup.Text className="input-group-text-new text-light">
            {props.t("age")}
          </InputGroup.Text>
          <Form.Select aria-label="Default select example">
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
            defaultValue={
              props.audiobookDetail != null ? props.audiobookDetail.title : ""
            }
            onChange={(event) => {
              //   handleTitleChange(event);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-1 input_modal py-1 ">
          {props.t("duration")}

          <Form.Range
            onChange={(selected) => {
              console.log(selected);
            }}
            min="0"
            max="5"
            step="0.5"
          />
        </InputGroup>
        <div className="row mx-1">
          <Button
            variant="success"
            size="lg"
            color="success"
            className=" btn button mt-2"
            onClick={
              () => console.log("DAS")
              // setState({
              //   ...state,
              //   searchModal: !state.searchModal,
              // })
            }
          >
            {props.t("search")}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
