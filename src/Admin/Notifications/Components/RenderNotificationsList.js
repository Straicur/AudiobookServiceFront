import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { CreateDate } from "../../../Components/CrateDate";

export default function RenderAudiobooksList(props) {

  const openDetailNotificationModal = (element) => {
    props.setState({
      ...props.state,
      detailNotificationkModal: !props.detailNotificationkModal,
      detailNotificationElement:element
    })
  }

  const createTable = () => {
    let renderArray = [];
    console.log(props.state.json)
    if (props.state.json != null) {
      props.state.json.systemNotifications.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        {console.log(element)}
        <th scope="row">{CreateDate(element.dateAdd)}</th>
        <td>{element.userType}</td>
        <td>{element.notificationType}</td>
        <td>{element.actionId}</td>
        <td>
          {element.delete ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </td>
        <td className="table_buttons_with">
          <div className="d-grid gap-2 d-md-block">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() => openDetailNotificationModal(element)}
            >
              {props.t("details")}
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
          <th scope="col">{props.t("dateAdd")}</th>
          <th scope="col">{props.t("userType")}</th>
          <th scope="col">{props.t("notificationType")}</th>
          <th scope="col">{props.t("actionId")}</th>
          <th scope="col">{props.t("deleted")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
