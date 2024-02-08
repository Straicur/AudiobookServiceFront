import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminRenderPageSwitches(props) {
  const nextPage = () => {
    if (props.pageState.page + 1 < props.pageState.maxPage) {
      props.setPageState((prev) => ({
        ...prev,
        page: props.pageState.page + 1,
      });
      props.setState((prev) => ({
        ...prev, refresh: !props.state.refresh }));
    }
  };

  const prevPage = () => {
    if (props.pageState.page > 0) {
      props.setPageState((prev) => ({
        ...prev,
        page: props.pageState.page - 1,
      }));
      props.setState((prev) => ({
        ...prev, refresh: !props.state.refresh }));
    }
  };

  return (
    <div className='row justify-content-center'>
      <div className='col-1 align-self-center'>
        <Button
          variant='light'
          size='sm'
          color='dark'
          className=' btn button mt-2 rounded_left_button'
          disabled={props.pageState.page == 0}
          onClick={() => prevPage()}
        >
          <i className='bi bi-chevron-left'></i>
        </Button>
      </div>
      <div className='col-1 align-self-center mt-2 fw-bold'>
        {props.pageState.page + 1}/{props.pageState.maxPage}
      </div>
      <div className='col-1 align-self-center'>
        <Button
          variant='light'
          size='sm'
          color='dark'
          className=' btn button mt-2 rounded_right_button'
          disabled={props.pageState.page + 1 == props.pageState.maxPage}
          onClick={() => nextPage()}
        >
          <i className='bi bi-chevron-right'></i>
        </Button>
      </div>
    </div>
  );
}
