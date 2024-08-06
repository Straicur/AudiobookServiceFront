import React from 'react';

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

  const createColumn = (element) => {
    return (
      <li>
        <div className='row'>
          <div className='col-1'>
            <input type='checkbox' id='scales' name='scales' />
          </div>
          <div className='col-6'>{element.value}</div>
        </div>
      </li>
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
    <div className='mx-3 row fs-5'>
      <div className='row'>
        <p>
          <h3>UserCache</h3>
        </p>
        <ul className='mx-4'>{createAdminCacheTable()}</ul>
      </div>
      <div className='row'>
        <p>
          <h3>AdminCache</h3>
        </p>
        <ul className='mx-4'>{createUserCacheTable()}</ul>
      </div>
    </div>
  );
}
