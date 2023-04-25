import Button from "react-bootstrap/Button";

export default function RenderPageSwitches(props) {
  const nextPage = () => {
    if (props.pageState.page + 1 < props.pageState.maxPage) {
      props.setPageState({
        ...props.pageState,
        page: props.pageState.page + 1,
      });
      props.setState({ ...props.state, refresh: !props.state.refresh });
    }
  };

  const prevPage = () => {
    if (props.pageState.page > 0) {
      props.setPageState({
        ...props.pageState,
        page: props.pageState.page - 1,
      });
      props.setState({ ...props.state, refresh: !props.state.refresh });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-1">
        <Button
          variant="light"
          size="sm"
          color="dark"
          className=" btn button mt-2"
          onClick={() => prevPage()}
        >
          <i className="bi bi-chevron-left"></i>
        </Button>
      </div>
      <div className="col-1">
        {props.pageState.page + 1}/{props.pageState.maxPage}
      </div>
      <div className="col-1">
        <Button
          variant="light"
          size="sm"
          color="dark"
          className=" btn button mt-2"
          onClick={() => nextPage()}
        >
          <i className="bi bi-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}
