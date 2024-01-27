import CreateUtil from 'Util/CreateUtil';


export default function SettingUserInfo(props) {
  return (
    <div className='text-white fs-4'>
      <div className='row fs-1'>{props.t('yourUserData')}: </div>
      <div className='row ms-1'>
        <div className='col'>{props.t('email')}: </div>
        <div className='col'>{props.state.email}</div>
      </div>
      <div className='row ms-1'>
        <div className='col'>{props.t('firstname')}: </div>
        <div className='col'>{props.state.firstname}</div>
      </div>
      <div className='row ms-1'>
        <div className='col'>{props.t('lastname')}: </div>
        <div className='col'>{props.state.lastname}</div>
      </div>
      <div className='row ms-1'>
        <div className='col'>{props.t('phoneNumber')}: </div>
        <div className='col'>{props.state.phoneNumber}</div>
      </div>
      <div className='row ms-1'>
        <div className='col'>{props.t('edited')}: </div>
        <div className='col'>
          {props.state.edited ? (
            <div>
              <i className='bi bi-calendar-check'></i>{' '}
              {CreateUtil.createDate(props.state.editableDate)}
            </div>
          ) : (
            <i className='bi bi-calendar-minus'></i>
          )}
        </div>
      </div>
    </div>
  );
}
