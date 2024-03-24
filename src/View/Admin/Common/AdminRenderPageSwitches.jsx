import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminRenderPageSwitches(props) {
  const nextPage = () => {
    if (props.page + 1 < props.maxPage) {
      props.setPageState((prev) => ({
        ...prev,
        page: props.page + 1,
      }));
    }
  };

  const prevPage = () => {
    if (props.page > 0) {
      props.setPageState((prev) => ({
        ...prev,
        page: props.page - 1,
      }));
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
          disabled={props.page == 0}
          onClick={() => prevPage()}
        >
          <i className='bi bi-chevron-left'></i>
        </Button>
      </div>
      <div className='col-1 align-self-center mt-2 fw-bold'>
        {props.page + 1}/{props.maxPage}
      </div>
      <div className='col-1 align-self-center'>
        <Button
          variant='light'
          size='sm'
          color='dark'
          className=' btn button mt-2 rounded_right_button'
          disabled={props.page + 1 == props.maxPage}
          onClick={() => nextPage()}
        >
          <i className='bi bi-chevron-right'></i>
        </Button>
      </div>
    </div>
  );
}
