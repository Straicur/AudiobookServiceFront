import React, { useEffect } from "react";
import { HandleFetch } from "../../../Components/HandleFetch";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";

export default function GetUsersList(props) {
  const createTable = () => {
    let renderArray = [];

    props.usersState.users.forEach((element) => {
      renderArray.push(createColumn(element));
    });

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope="row">{element.email}</th>
        <td>{element.lastname}</td>
        <td>
          {element.active ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </td>
        <td>
          {element.banned ? (
            <i className="bi bi-shield-fill-exclamation"></i>
          ) : (
            <i className="bi bi-shield-fill-check"></i>
          )}
        </td>
        <td>
          <Button
            name="en"
            size="sm"
            className="btn button question_button success_button"
            onClick={() => {
              props.setState({
                ...props.state,
                actionId: element.id,
              });
              props.goBack();
            }}
          >
            {props.t("select")}
          </Button>
        </td>
      </tr>
    );
  };
  useEffect(() => {
    if (!props.usersState.fetched) {
      HandleFetch(
        "/admin/users",
        "POST",
        {
          page: 0,
          limit: 30,
          searchJson: {
            order: 1,
          },
        },
        props.token,
        props.i18n.language
      )
        .then((data) => {
          props.setUsersState({
            ...props.usersState,
            users: data.users,
            fetch: !props.usersState.fetch,
            fetched: !props.usersState.fetched,
          });
        })
        .catch((e) => {
          console.log(e);
          props.setNotificationsState({
            ...props.notificationsState,
            error: e,
          });
        });
    }
  }, [props]);

  return (
    <table className="table">
      <thead className="">
        <tr>
          <th scope="col">{props.t("email")}</th>
          <th scope="col">{props.t("lastname")}</th>
          <th scope="col">{props.t("active")}</th>
          <th scope="col">{props.t("banned")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
