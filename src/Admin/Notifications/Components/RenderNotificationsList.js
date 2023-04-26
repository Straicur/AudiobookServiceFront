import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { CreateDate } from "../../../Components/CrateDate";

export default function RenderAudiobooksList(props) {
  const openDetailNotificationModal = (element) => {
    props.setState({
      ...props.state,
      editNotificationkModal: !props.editNotificationkModal,
      editNotificationElement: element,
    });
  };

  const createTable = () => {
    let renderArray = [];
    if (
      props.state.json != null &&
      props.state.json.systemNotifications != undefined
    ) {
      props.state.json.systemNotifications.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const createUserType = (element) => {
    switch (element) {
      case 1: {
        return props.t("administration");
      }
      case 2: {
        return props.t("system");
      }
    }
  };

  const createNotificationType = (element) => {
    switch (element) {
      case 1: {
        return props.t("notificationTypeNormal");
      }
      case 2: {
        return props.t("notificationTypeAdmin");
      }
      case 3: {
        return props.t("notificationTypeProposed");
      }
      case 4: {
        return props.t("notificationTypeNewCategory");
      }
      case 5: {
        return props.t("notificationTypeNewAudiobook");
      }
      case 6: {
        return props.t("notificationTypeUserDeleteDecline");
      }
    }
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        {console.log(element)}
        <th scope="row">{CreateDate(element.dateAdd)}</th>
        <td>{createNotificationType(element.notificationType)}</td>
        <td>{createUserType(element.userType)}</td>
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
              {props.t("edit")}
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
          <th scope="col">{props.t("notificationType")}</th>
          <th scope="col">{props.t("userType")}</th>
          <th scope="col">{props.t("actionId")}</th>
          <th scope="col">{props.t("deleted")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
