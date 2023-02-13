import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function JsonModal(props) {

  const handleClose = () => {
    props.setState({
      ...props.state,
      jsonModal: !props.state.jsonModal,
      refresh: !props.state.refresh,
    })
  };
  
  const format=()=>{
    console.log(props.state.json)
      const jsonData = JSON.stringify(props.state.json);
      return (<div><pre>{JSON.stringify(jsonData,null,4)}</pre></div>);
  };
  return (
  
          <Modal size="lg" show={props.state.jsonModal} onHide={handleClose}>
              <Modal.Header>
                  <Modal.Title>{props.t("jsonData")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{format()}</Modal.Body>
              <Modal.Footer>
                  <Button variant="dark" onClick={handleClose}>
                      {props.t("close")}
                  </Button>
              </Modal.Footer>
          </Modal>
    
  );
}