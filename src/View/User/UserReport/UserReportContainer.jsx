import React from 'react';
import UserNavBarPrividers from '../UserNavBar/UserNavBarPrividers';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCategoriesListModal from './UserCategoriesListModal';
import { UserCategoriesTreeProvider } from 'Providers/User/UserCategoriesTreeProvider';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { v4 as uuidv4 } from 'uuid';
import { UserAudiobookSearchProvider } from 'Providers/User/UserAudiobookSearchProvider';
import UserAudiobooksListModal from './UserAudiobooksListModal';

export default function UserReportContainer(props) {
  const reportTypes = {
    reportTypeAudiobook: { type: 2, tooltipMessage: 'reportTypeAudiobookTooltipMessage' },
    reportTypeCategory: { type: 3, tooltipMessage: 'reportTypeCategoryTooltipMessage' },
    reportTypeSystem: { type: 4, tooltipMessage: 'reportTypeSystemTooltipMessage' },
    reportTypeUser: { type: 5, tooltipMessage: 'reportTypeUserTooltipMessage' },
    reportTypeSettings: { type: 6, tooltipMessage: 'reportTypeSettingsTooltipMessage' },
    reportTypeOther: { type: 28, tooltipMessage: 'reportTypeOtherTooltipMessage' },
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
      <div className='col-1 report-type-col' key={uuidv4()}>
        <OverlayTrigger
          placement='bottom'
          overlay={<Tooltip id='tooltip-bottom'> {props.t(typeValue.tooltipMessage)}</Tooltip>}
        >
          <Button
            name='en'
            variant={typeValue.type === props.reportState.type ? 'success' : 'warning'}
            size='sm'
            className='btn button p-2 px-5 fs-6'
            onClick={() => {
              props.setReportState((prev) => ({
                ...prev,
                type: parseInt(typeValue.type),
                choosenCategory: null,
                choosenAudiobook: null,
              }));
            }}
          >
            {props.t(typeName)}
          </Button>
        </OverlayTrigger>
      </div>
    );
  };

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 bg-dark shadow'>
        {props.token ? (
          <UserNavBarPrividers token={props.token} t={props.t} i18n={props.i18n} />
        ) : null}
        <div className='row d-flex justify-content-center fs-2 fw-bold text-white mt-4'>
          Chcesz coś zgłości ?
        </div>
        <div className='row justify-content-center fs-3 text-white mb-3 mt-2'>
          Uzupełnij proszę odpowiednie pola w zależności od typu zgłoszenia.
        </div>
        <div className='row d-flex justify-content-center'>{createReportTypeButtons()}</div>

        {props.reportState.type === 3 || props.reportState.type === 2 ? (
          <div className='row d-flex justify-content-center fs-2 fw-bold text-white mt-1'>
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
            {props.reportState.choosenCategory !== null ? (
              <p className='fs-4 text-center mt-3'>
                Wybrałeś kategorię: {props.reportState.choosenCategoryName}
              </p>
            ) : null}
          </div>
        ) : null}

        {props.reportState.type === 2 ? (
          <div className='row  d-flex justify-content-center fs-2 fw-bold text-white mt-2'>
            <div className='col-2 d-flex justify-content-center '>
              <Button
                name='en'
                variant='success'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={
                  props.reportState.choosenCategory === null &&
                  props.reportState.choosenAudiobook === null
                }
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
          </div>
        ) : null}

        <div className='report-desc-text-container text-center'>
          <Form.Group className='my-3 input_modal'>
            <Form.Label className='text-light fs-3'>{props.t('description')}: </Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              aria-label='With textarea'
              value={props.reportState.description}
              className='report-desc-text text-white'
              style={{
                backgroundColor: '#2b2b2b',
                borderColor: '#4f4f4f',
              }}
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
        <UserCategoriesTreeProvider token={props.token} i18n={props.i18n}>
          <UserCategoriesListModal
            reportState={props.reportState}
            setReportState={props.setReportState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
        </UserCategoriesTreeProvider>
      ) : null}

      {props.reportState.openAudiobooksList ? (
        <UserAudiobookSearchProvider
          title={''}
          categoryKey={props.reportState.choosenCategory}
          token={props.token}
          i18n={props.i18n}
        >
          <UserAudiobooksListModal
            reportState={props.reportState}
            setReportState={props.setReportState}
            t={props.t}
            i18n={props.i18n}
            token={props.token}
          />
        </UserAudiobookSearchProvider>
      ) : null}
    </div>
  );
}
