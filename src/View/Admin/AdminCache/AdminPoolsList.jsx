import React from 'react';
import { Form } from 'react-bootstrap';

export default function AdminPoolsList(props) {
  const createUserCacheTable = () => {
    let renderArray = [];

    if (props.pools != null) {
      props.pools.userCachePools.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const addOrDeletePool = (poolValue, checked) => {
    let copy = props.poolsState;

    if (checked && !copy.includes(poolValue)) {
      copy.push(poolValue);
      props.setPoolsState(copy);
    } else if (!checked && copy.includes(poolValue)) {
      const index = copy.indexOf(poolValue);
      copy.splice(index, 1);
      props.setPoolsState(copy);
    }
  };

  const createColumn = (element) => {
    return (
      <Form.Check
        inline
        label={element.value}
        name='group1'
        type='checkbox'
        className='mx-4'
        key={`inline-checkbox-${element.value}`}
        onChange={(e) => addOrDeletePool(element.value, e.target.checked)}
      />
    );
  };

  const createAdminCacheTable = () => {
    let renderArray = [];

    if (props.pools != null) {
      props.pools.adminCachePools.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  return (
    <Form>
      <div className='mx-3 row fs-5'>
        <div className='row mb-2'>
          <h3 className='mb-3'>UserCache</h3>
          {createAdminCacheTable()}
        </div>
        <div className='row'>
          <h3 className='mb-3'>AdminCache</h3>
          {createUserCacheTable()}
        </div>
      </div>
    </Form>
  );
}
