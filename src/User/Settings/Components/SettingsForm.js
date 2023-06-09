import Button from "react-bootstrap/Button";

export default function SettingsForm(props) {
  return (
    <div className="row">
      <div className="row align-items-center justify-content-center ">
        <Button
          name="en"
          size="sm"
          className="btn button success_button settings-button fs-4"
          onClick={() =>
            props.setState({
              ...props.state,
              buttonEmail: !props.state.buttonEmail,
            })
          }
        >
          {props.t("delete")}
        </Button>
      </div>
      <div className="row align-items-center justify-content-center ">
        <Button
          name="en"
          size="sm"
          className="btn button success_button settings-button fs-4"
          onClick={() =>
            props.setState({
              ...props.state,
              buttonEmail: !props.state.buttonPassword,
            })
          }
        >
          {props.t("delete")}
        </Button>
      </div>
      <div className="row align-items-center justify-content-center ">
        <Button
          name="en"
          size="sm"
          className="btn button danger_button settings-button fs-4"
          onClick={() =>
            props.setState({
              ...props.state,
              buttonEmail: !props.state.buttonDelete,
            })
          }
        >
          {props.t("delete")}
        </Button>
      </div>
    </div>
  );
}
