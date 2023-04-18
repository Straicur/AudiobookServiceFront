import { v4 as uuidv4 } from "uuid";

export default function RenderDeletedUsersList(props) {
  const createTable = () => {
    let renderArray = [];

    props.state.users.forEach((element) => {
      renderArray.push(createColumn(element));
    });

    return renderArray;
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
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
