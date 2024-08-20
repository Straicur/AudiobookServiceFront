import React from 'react';
import UserNavBarPrividers from '../UserNavBar/UserNavBarPrividers';
// import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCategoriesListModal from './UserCategoriesListModal';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';

export default function UserReportContainer(props) {
  //   const [state, setState] = useState({
  //     jsonModal: false,
  //     searchModal: false,
  //   });

  const reportTypes = {
    reportTypeAudiobook: 2,
    reportTypeCategory: 3,
    reportTypeSystem: 4,
    reportTypeUser: 5,
    reportTypeSettings: 6,
    reportTypeOther: 8,
  };

  const createReportTypeButtons = () => {
    let renderArray = [];

    for (const [key, value] of Object.entries(reportTypes)) {
      if (!props.token && (value === 2 || value === 3)) continue;
      else {
        renderArray.push(createTypeButton(key, value));
      }
    }
    return renderArray;
  };

  const createTypeButton = (typeName, typeValue) => {
    return (
      <div className='col-1 report-type-col'>
        <Button
          name='en'
          variant={typeValue === props.reportState.type ? 'success' : 'warning'}
          size='sm'
          className='btn button p-2 px-5 fs-6'
          onClick={() => {
            props.setReportState((prev) => ({
              ...prev,
              type: parseInt(typeValue),
            }));
          }}
        >
          {props.t(typeName)}
        </Button>
      </div>
    );
  };

  //   const renderTooltip = (props) => (
  //     <Tooltip id='button-tooltip' {...props}>
  //       Simple tooltip
  //     </Tooltip>
  //   );

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 bg-dark shadow'>
        {props.token ? (
          <UserNavBarPrividers token={props.token} t={props.t} i18n={props.i18n} />
        ) : null}
        <div className='row d-flex justify-content-center fs-2 fw-bold text-white mt-4'>
          Chcesz coś zgłości ?
        </div>
        <div className='row justify-content-center fs-3 text-white mt-1'>
          Uzupełnij proszę odpowiednie pola w zależności od typu zgłoszenia.
        </div>
        <div className='row d-flex justify-content-center'>{createReportTypeButtons()}</div>

        <div className='row  d-flex justify-content-center fs-2 fw-bold text-white mt-4'>
          {props.reportState.type === 3 || props.reportState.type === 2 ? (
            <div className='col-2 d-flex justify-content-center '>
              <Button
                name='en'
                variant='success'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                onClick={() => {
                  props.setReportState((prev) => ({
                    ...prev,
                    openCategoriesList: true,
                  }));
                }}
              >
                {props.t('chooseCategory')}
              </Button>
            </div>
          ) : null}
        </div>
        <div className='row  d-flex justify-content-center fs-2 fw-bold text-white mt-4'>
          {props.reportState.type === 2 ? (
            <div className='col-2 d-flex justify-content-center '>
              <Button
                name='en'
                variant='success'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={props.reportState.choosenCategory === null}
                onClick={() => {
                  props.setReportState((prev) => ({
                    ...prev,
                    openAudiobooksList: true,
                  }));
                }}
              >
                {props.t('chooseAudiobook')}
              </Button>
            </div>
          ) : null}
        </div>
        <div className='report-desc-text-container text-center'>
          <Form.Group className='my-3 input_modal'>
            <Form.Label className='text-light fs-3'>{props.t('description')}: </Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              aria-label='With textarea'
              value={props.reportState.description}
              className='report-desc-text'
              onChange={(e) => {
                props.setReportState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </Form.Group>
          {!props.reportState.send ? (
            <div className='row justify-content-center mx-5 mt-2'>
              <div className='col-1'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  className='btn button p-2 px-5 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      send: true,
                    }));
                  }}
                >
                  {props.t('send')}
                </Button>
              </div>
            </div>
          ) : (
            <div className='row justify-content-center mx-5 mt-2'>
              <p className='text-center text-light fs-4'>{props.t('sureSendReport')}</p>
              <div className='col-1'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  className='btn button p-2 px-5 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      sure: true,
                    }));
                  }}
                >
                  {props.t('yes')}
                </Button>
              </div>
              <div className='col-1'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button p-2 px-5 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      sure: false,
                      send: false,
                    }));
                  }}
                >
                  {props.t('no')}
                </Button>
              </div>
              <div className='col-1'>
                <Button
                  name='en'
                  variant='warning'
                  size='sm'
                  className='btn button p-2 px-5 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      send: false,
                    }));
                  }}
                >
                  {props.t('cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {props.reportState.openCategoriesList ? (
        <UserCategoriesListModal
          reportState={props.reportState}
          setReportState={props.setReportState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
        />
      ) : null}
    </div>
  );
}
