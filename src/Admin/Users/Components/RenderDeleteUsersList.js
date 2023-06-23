import { HandleFetch } from "../../../Components/HandleFetch";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";

export default function RenderDeleteUsersList(props) {
  const createTable = () => {
    let renderArray = [];

    props.state.users.forEach((element) => {
      renderArray.push(createColumn(element));
    });

    return renderArray;
  };

  const deleteUser = (selectedUser) => {
    HandleFetch(
      "/admin/user/delete/accept",
      "PATCH",
      {
        userId: selectedUser.id,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setState({ ...props.state, refresh: !props.state.refresh });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };
  const declineDeleteUser = (selectedUser) => {
    HandleFetch(
      "/admin/user/delete/decline",
      "PATCH",
      {
        userId: selectedUser.id,
      },
      props.token,
      props.i18n.language
    )
      .then(() => {
        props.setState({ ...props.state, refresh: !props.state.refresh });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };
  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope="row">{element.email}</th>
        <td>{element.firstname}</td>
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
              variant="success"
              size="sm"
              className="btn button mx-2"
              onClick={() => declineDeleteUser(element)}
            >
              {props.t("cancel")}
            </Button>
            <Button
              name="en"
              variant="danger"
              size="sm"
              className="btn button mx-2"
              disabled={element.deleted}
              onClick={() => {
                deleteUser(element);
              }}
            >
              {element.deleted ? props.t("deleted") : props.t("accept")}
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
          <th scope="col">{props.t("active")}</th>
          <th scope="col">{props.t("banned")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
