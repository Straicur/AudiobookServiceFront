import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import GetUsersList from "./GetUsersList";
import GetAudiobooksList from "./GetAudiobooksList";
import GetCategoriesList from "./GetCategoriesList";

export default function PickActionIdList(props) {
  const [audioboksState, setAudioboksState] = useState({
    audioboks: [],
    fetched: false,
    fetch: false,
  });
  const [categoriesState, setCategoriesState] = useState({
    categories: [],
    fetched: false,
    fetch: false,
  });
  const [usersState, setUsersState] = useState({
    users: [],
    fetched: false,
    fetch: false,
  });

  const [listState, setListState] = useState(0);

  const getUsersList = () => {
    if (!usersState.fetched) {
      setUsersState({
        ...usersState,
        fetch: !usersState.fetch,
      });
    }
  };

  const getAudiobooksList = () => {
    if (!audioboksState.fetched) {
      setAudioboksState({
        ...audioboksState,
        fetch: !audioboksState.fetch,
      });
    }
  };

  const getCategriesList = () => {
    if (!categoriesState.fetched) {
      setCategoriesState({
        ...categoriesState,
        fetch: !categoriesState.fetch,
      });
    }
  };

  const goBack = (element) => {
    props.setActionState({
      ...props.actionState,
      list: 0,
    });
  };

  return (
    <div className="row">
      <div className="row">
        {listState == 1 ? (
          <GetUsersList
            usersState={usersState}
            setUsersState={setUsersState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
          />
        ) : null}
        {listState == 2 ? (
          <GetAudiobooksList
            audioboksState={audioboksState}
            setAudioboksState={setAudioboksState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
          />
        ) : null}
        {listState == 3 ? (
          <GetCategoriesList
            categoriesState={categoriesState}
            setCategoriesState={setCategoriesState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
          />
        ) : null}
      </div>
      <div className="row">
        <div className="col">
          <Button
            name="en"
            variant="dark"
            size="sm"
            className="btn button mx-2"
            onClick={getUsersList}
          >
            {props.t("users")}
          </Button>
        </div>
        <div className="col">
          <Button
            name="en"
            variant="dark"
            size="sm"
            className="btn button mx-2"
            onClick={getAudiobooksList}
          >
            {props.t("audiobooks")}
          </Button>
        </div>
        <div className="col">
          <Button
            name="en"
            variant="dark"
            size="sm"
            className="btn button mx-2"
            onClick={getCategriesList}
          >
            {props.t("categories")}
          </Button>
        </div>
      </div>
    </div>
  );
}
