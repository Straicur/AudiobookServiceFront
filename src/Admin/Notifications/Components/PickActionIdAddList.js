import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import GetUsersList from "./GetUsersList";
import GetAudiobooksList from "./GetAudiobooksList";
import GetCategoriesList from "./GetCategoriesList";

export default function PickActionIdAddList(props) {
  const getUsersList = () => {
    if (!props.usersState.fetched) {
      props.setUsersState({
        ...props.usersState,
        fetch: !props.usersState.fetch,
      });
    }
  };

  const getAudiobooksList = () => {
    if (!props.audiobooksState.fetched) {
      props.setAudiobooksState({
        ...props.audiobooksState,
        fetch: !props.audiobooksState.fetch,
      });
    }
  };

  const getCategriesList = () => {
    if (!props.categoriesState.fetched) {
      props.setCategoriesState({
        ...props.categoriesState,
        fetch: !props.categoriesState.fetch,
      });
    }
  };

  const goBack = () => {
    props.setActionState({
      ...props.actionState,
      list: !props.actionState.list,
      actionIdChanged: !props.actionState.actionIdChanged,
    });
  };

  return (
    <div className="row">
      <div className="row">
        {props.state.notificationType == 2 ? (
          <GetUsersList
            usersState={props.usersState}
            setUsersState={props.setUsersState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
          />
        ) : null}
        {props.state.notificationType == 5 ? (
          <GetAudiobooksList
            audiobooksState={props.audiobooksState}
            setAudiobooksState={props.setAudiobooksState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
          />
        ) : null}
        {props.state.notificationType == 4 ? (
          <GetCategoriesList
            categoriesState={props.categoriesState}
            setCategoriesState={props.setCategoriesState}
            state={props.state}
            setState={props.setState}
            notificationsState={props.notificationsState}
            setNotificationsState={props.setNotificationsState}
            goBack={goBack}
            token={props.token}
            t={props.t}
          />
        ) : null}
      </div>
    </div>
  );
}
