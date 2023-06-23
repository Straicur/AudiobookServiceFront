import { HandleFetch } from "../../../Components/HandleFetch";
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

  const deleteUser = (selectedUser, element) => {
    element.target.classList.add("disabled");
    HandleFetch(
      "/admin/user/delete",
      "DELETE",
      {
        userId: selectedUser.id,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setState({
          ...props.state,
          refresh: !props.state.refresh,
        });

        element.target.classList.remove("disabled");
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };
  const getUserRoles = (element) => {
    if (props.dateUpdate < Date.now()) {
      props.userRolesStore.removeRoles();
      HandleFetch(
        "/admin/user/system/roles",
        "GET",
        null,
        props.token,
        props.i18n.language
      )
        .then((data) => {
          props.userRolesStore.setRoles(data);
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }

    props.setState({
      ...props.state,
      editUserModal: !props.state.editUserModal,
      editUserElement: element,
    });
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
            <i className="bi bi-shield-fill-check"></i>
          ) : (
            <i className="bi bi-shield-fill-exclamation"></i>
          )}
        </td>
        <td className="table_buttons_with">
          <div className="d-grid gap-2 d-md-block">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() => getUserRoles(element)}
            >
              {props.t("edit")}
            </Button>
            <Button
              name="en"
              variant="danger"
              size="sm"
              className="btn button mx-2"
              disabled={element.deleted}
              onClick={(e) => {
                deleteUser(element, e);
              }}
            >
              {element.deleted ? props.t("deleted") : props.t("toDelete")}
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
