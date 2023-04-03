import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import RenderCategoriesList from "./RenderCategoriesList";

export default function AudiobookAddCategoriesModal(props) {
  const [modalState, setModalState] = useState({
    file: null,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      jsonModal: !props.state.jsonModal,
    });
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories/tree",
        "GET",
        null,
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, json: data.categories });
        //todo czy na pewno tak chciałem ? Bo tu może być problem że pobieram to a nie potrzebuje tak naprawdę jeśli trzymam to w storage
        if (dateUpdate < Date.now() || state.refresh) {
          categoriesStore.removeCategories();

          for (const category of data.categories) {
            categoriesStore.addCategory(category);
          }
          if (state.refresh) {
            setState({ ...state, refresh: !state.refresh });
          }
        }
      },
    }
  );

  useEffect(() => {
    if (state.refresh) {
      refetch();
    }
  }, [state.refresh]);

  return (
    <Modal size="lg" show={props.state.jsonModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{props.t("jsonData")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{format()}</Modal.Body>
      <Modal.Footer>
        <RenderCategoriesList
          modalState={modalState}
          setModalState={setModalState}
          categories={categories}
          t={t}
        />
      </Modal.Footer>
    </Modal>
  );
}
