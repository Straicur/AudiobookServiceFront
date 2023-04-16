import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import { CreateDate } from "../../../Components/CrateDate";

export default function RenderUsersList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.state.json != null) {
      props.state.json.users.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const activeteAudiobook = (element, selectedUser) => {
    //   element.target.classList.add("disabled");
    //   HandleFetch(
    //     "http://127.0.0.1:8000/api/admin/audiobook/active",
    //     "PATCH",
    //     {
    //       audiobookId: selectedAudiobook.id,
    //       active: !selectedAudiobook.active,
    //     },
    //     props.token
    //   )
    //     .then(() => {
    //       element.target.classList.remove("disabled");
    //       let newAudiobookList = props.state.json.audiobooks.map((audiobook) => {
    //         if (audiobook.id == selectedAudiobook.id) {
    //           return {
    //             id: audiobook.id,
    //             title: audiobook.title,
    //             author: audiobook.author,
    //             year: audiobook.year,
    //             duration: audiobook.duration,
    //             size: audiobook.size,
    //             parts: audiobook.parts,
    //             age: audiobook.age,
    //             active: !audiobook.active,
    //           };
    //         } else {
    //           return audiobook;
    //         }
    //       });
    //       const newJson = {
    //         audiobooks: newAudiobookList,
    //         page: 0,
    //         limit: 15,
    //         maxPage: 1,
    //       };
    //       props.setState({ ...props.state, json: newJson });
    //     })
    //     .catch((e) => {
    //       props.setState({
    //         ...props.state,
    //         error: e,
    //       });
    //     });
  };
  const deleteUser = (element, selectedUser) => {};
  const getAge = (element) => {
    switch (element.age) {
      case 1:
        return "3-7";
        break;
      case 2:
        return "7-12";
        break;
      case 3:
        return "12-16";
        break;
      case 4:
        return "16-18";
        break;
      case 5:
        return "18+";
        break;
    }
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope="row">{element.email}</th>
        <td>{element.firstname}</td>
        <td>{element.lastname}</td>
        <td>{CreateDate(element.dateCreated)}</td>
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
        <td className="table_buttons_with">
          <div className="d-grid gap-2 d-md-block">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() =>
                props.setState({
                  ...props.state,
                  editUserModal: !props.state.editUserModal,
                  editUserElement: element,
                })
              }
            >
              {props.t("edit")}
            </Button>

            <Button
              name="en"
              variant="danger"
              size="sm"
              className="btn button mx-2"
              onClick={(e) => {
                deleteUser(e, element);
              }}
            >
              {props.t("toDelete")}
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead className="">
        <tr>
          <th scope="col">{props.t("email")}</th>
          <th scope="col">{props.t("firstname")}</th>
          <th scope="col">{props.t("lastname")}</th>
          <th scope="col">{props.t("dateRegister")}</th>
          <th scope="col">{props.t("active")}</th>
          <th scope="col">{props.t("banned")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}