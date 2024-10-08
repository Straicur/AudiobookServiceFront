import React from 'react';
import CreateUtil from 'Util/CreateUtil';

export default function UserSettingInfo(props) {
  return (
    <div className='text-white mx-4'>
      <div className='row fs-1 mb-4 fw-bold'>{props.t('yourUserData')}: </div>

      {props.isLoading || props.userDetail === null ? (
        <div className='text-center'>
          <div className='spinner-border text-info spinner my-5' role='status'></div>
        </div>
      ) : (
        <div className='fs-2'>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('email')}:</div>
            <div className='col-7'>
              {props.userDetail.email}
              {props.userDetail.newEmail !== undefined
                ? ' (' + props.userDetail.newEmail + ')'
                : null}
            </div>
          </div>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('firstname')}:</div>
            <div className='col-7'>{props.userDetail.firstname}</div>
          </div>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('lastname')}:</div>
            <div className='col-7'>{props.userDetail.lastname}</div>
          </div>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('phoneNumber')}:</div>
            <div className='col-7'>{props.userDetail.phoneNumber}</div>
          </div>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('edited')}:</div>
            <div className='col-7'>
              {props.userDetail.edited ? (
                <div>
                  <i className='bi bi-calendar-check'></i>{' '}
                  {CreateUtil.createDate(props.userDetail.editableDate)}
                </div>
              ) : (
                <i className='bi bi-calendar-minus'></i>
              )}
            </div>
          </div>
          <div className='row ms-1'>
            <div className='col-5 fw-bold'>{props.t('parentalControl')}:</div>
            <div className='col-7'>
              {props.userDetail.birthday ? (
                <i className='bi bi-check-lg'></i>
              ) : (
                <i className='bi bi-x-lg'></i>
              )}
            </div>
          </div>
          {props.userDetail.birthday ? (
            <div className='row ms-1'>
              <div className='col-5 fw-bold'>{props.t('birthday')}:</div>
              <div className='col-7'>
                <div>
                  <i className='bi bi-calendar-check'></i>{' '}
                  {CreateUtil.createDate(props.userDetail.birthday)}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
