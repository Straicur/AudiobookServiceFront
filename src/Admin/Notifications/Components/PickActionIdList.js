import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import GetUsersList from "./GetUsersList";
import GetAudiobooksList from "./GetAudiobooksList";
import GetCategoriesList from "./GetCategoriesList";

export default function PickActionIdList(props) {
  const [listState, setListState] = useState(0);

  const getUsersList = () => {
    if (!props.usersState.fetched) {
      props.setUsersState({
        ...props.usersState,
        fetch: !props.usersState.fetch,
      });
    }
    setListState(1);
  };

  const getAudiobooksList = () => {
    if (!props.audiobooksState.fetched) {
      props.setAudiobooksState({
        ...props.audiobooksState,
        fetch: !props.audiobooksState.fetch,
      });
    }
    setListState(2);
  };

  const getCategriesList = () => {
    if (!props.categoriesState.fetched) {
      props.setCategoriesState({
        ...props.categoriesState,
        fetch: !props.categoriesState.fetch,
      });
    }
    setListState(3);
  };

  const goBack = (element) => {
    props.setActionState({
      ...props.actionState,
      list: !props.actionState.list,
      actionIdChanged: !props.actionState.actionIdChanged,
    });
  };

  return (
    <div className="row">
      <div className="row">
        {listState == 1 ? (
          <GetUsersList
            usersState={props.usersState}
            setUsersState={props.setUsersState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
          />
        ) : null}
        {listState == 2 ? (
          <GetAudiobooksList
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
          />
        ) : null}
        {listState == 3 ? (
          <GetCategoriesList
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            state={props.state}
            setState={props.setState}
            setListState={setListState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
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
