import Button from 'react-bootstrap/Button';

export default function SettingsForm(props) {
  return (
    <div className='row mt-4'>
      <div className='row align-items-center justify-content-center '>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState({
              ...props.state,
              buttonEmail: !props.state.buttonEmail,
            })
          }
        >
          {props.t('editEmail')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center '>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState({
              ...props.state,
              buttonPassword: !props.state.buttonPassword,
            })
          }
        >
          {props.t('editPassword')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center '>
        <Button
          name='en'
          size='sm'
          className='btn button success_button settings_button fs-5'
          onClick={() =>
            props.setState({
              ...props.state,
              buttonUserData: !props.state.buttonUserData,
            })
          }
        >
          {props.t('changeAccountData')}
        </Button>
      </div>
      <div className='row align-items-center justify-content-center '>
        <Button
          name='en'
          size='sm'
          className='btn button danger_button settings_button fs-5'
          onClick={() =>
            props.setState({
              ...props.state,
              buttonDelete: !props.state.buttonDelete,
            })
          }
        >
          {props.t('deleteAccount')}
        </Button>
      </div>
    </div>
  );
}
