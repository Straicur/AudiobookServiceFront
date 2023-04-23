import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function DetailNotificationkModal(props) {
  const handleClose = () => {
    props.setState({
      ...props.state,
      detailNotificationkModal: !props.state.detailNotificationkModal,
    });
  };


  //todo zrób endpoint który pobiera detale powiadomienia po jego id i ustawia mi odpowiednio dane tutaj (GET)
  // I to tu zmieniam wszystko co mogę 
  // Zmienić mogę typy usera i samego powiadomienia, ActionID oraz opcjonalnie text
  // Dodać do usuniętych lub usunąć 

//   const { isLoading, error, data, isFetching, refetch } = useQuery(
//     "data",
//     () =>
//       HandleFetch(
//         "http://127.0.0.1:8000/api/admin/user/notifications",
//         "POST",
//         {
//           page: pageState.page,
//           limit: pageState.limit,
//           searchData: formatData()
//         },
//         props.token
//       ),
//     {
//       retry: 1,
//       retryDelay: 500,
//       refetchOnWindowFocus: false,
//       onError: (e) => {
//         props.setNotificationsState({
//           ...props.notificationsState,
//           error: e,
//         });
//       },
//       onSuccess: (data) => {
//         setState({ ...state, json: data });
//         setPageState({ ...pageState, maxPage: data.maxPage });
//       },
//     }
//   );

  return (
    <Modal size="lg" show={props.state.detailNotificationkModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("notificationDetail")}</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          {props.t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
