import React from 'react';
import UserNavBarProviders from '../UserNavBar/UserNavBarProviders';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserCategoriesListModal from './UserCategoriesListModal';
import { UserCategoriesTreeProvider } from 'Providers/User/UserCategoriesTreeProvider';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { v4 as uuidv4 } from 'uuid';
import { UserAudiobookSearchProvider } from 'Providers/User/UserAudiobookSearchProvider';
import UserAudiobooksListModal from './UserAudiobooksListModal';
import { useUserIp } from 'Providers/User/UserIpProvider';
import { useUserReport } from 'Providers/User/UserReportProvider';
import ValidateUtil from 'Util/ValidateUtil';
import UserReportSuccessSendModal from './UserReportSuccessSendModal';
import { UserNotLoggedNavBar } from '../UserNavBar/UserNotLoggedNavBar';

export default function UserReportContainer(props) {
  const userIp = useUserIp();
  const [sendLoggedUserReport, sendNotLoggedUserReport] = useUserReport();

  const reportTypes = {
    reportTypeAudiobook: { type: 2, tooltipMessage: 'reportTypeAudiobookTooltipMessage' },
    reportTypeCategory: { type: 3, tooltipMessage: 'reportTypeCategoryTooltipMessage' },
    reportTypeSystem: { type: 4, tooltipMessage: 'reportTypeSystemTooltipMessage' },
    reportTypeUser: { type: 5, tooltipMessage: 'reportTypeUserTooltipMessage' },
    reportTypeSettings: { type: 6, tooltipMessage: 'reportTypeSettingsTooltipMessage' },
    reportTypeOther: { type: 8, tooltipMessage: 'reportTypeOtherTooltipMessage' },
  };

  const createReportTypeButtons = () => {
    let renderArray = [];

    for (const [key, value] of Object.entries(reportTypes)) {
      if (!props.token && (value.type === 2 || value.type === 3)) continue;
      else {
        renderArray.push(createTypeButton(key, value));
      }
    }
    return renderArray;
  };

  const sendReport = () => {
    if (!props.token) {
      sendNotLoggedUserReport({
        json: {
          type: props.reportState.type,
          ip: userIp[0] !== undefined && userIp[0] !== null ? userIp[0].ip : '',
          email: props.reportState.email,
          additionalData: { description: props.reportState.description },
        },
        setState: props.setReportState,
      });
    } else {
      let additionalData = { description: props.reportState.description };

      if (props.reportState.choosenAudiobook !== null) {
        additionalData.actionId = props.reportState.choosenAudiobook;
      }

      if (props.reportState.choosenCategory !== null) {
        additionalData.actionId = props.reportState.choosenCategory;
      }

      sendLoggedUserReport({
        json: {
          type: props.reportState.type,
          additionalData: additionalData,
        },
        setState: props.setReportState,
      });
    }
  };

  const myEmail = 'mosinskidamian';
  let emailValidity =
    ValidateUtil.validateEmail(props.reportState.email) &&
    !props.reportState.email.includes(myEmail);

  let sendButtonDisabled =
    (props.reportState.type === 2 && props.reportState.choosenAudiobook === null) ||
    (props.reportState.type === 3 && props.reportState.choosenCategory === null) ||
    (!props.token && !emailValidity);

  const createTypeButton = (typeName, typeValue) => {
    return (
      <div className='col-1 report-type-col d-flex justify-content-center' key={uuidv4()}>
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
          <UserNavBarProviders token={props.token} t={props.t} i18n={props.i18n} />
        ) : (
          <UserNotLoggedNavBar token={props.token} t={props.t} i18n={props.i18n} />
        )}
        <hr className='text-white line' />
        <div className='row d-flex justify-content-center fs-2 fw-bold text-white mt-4'>
          {props.t('reportPageTitle')}
        </div>
        <div className='row justify-content-center fs-3 text-white mb-3 mt-2'>
          {props.t('reportPageDesc')}
        </div>
        <div className='row d-flex justify-content-center mb-2'>{createReportTypeButtons()}</div>
        {props.reportState.type === 3 || props.reportState.type === 2 ? (
          <div className='row d-flex justify-content-center fs-2 fw-bold text-white mt-1 mb-3'>
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
                {props.t('chosenCategory')}: {props.reportState.choosenCategoryName}
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
            {props.reportState.choosenAudiobook !== null ? (
              <p className='fs-4 text-center mt-3'>
                {props.t('chosenAudiobook')}: {props.reportState.choosenAudiobookTitle} :{' '}
                {props.reportState.choosenAudiobookAuthor}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className='report-desc-text-container text-center'>
          {!props.token ? (
            <div className='row d-flex justify-content-center mt-4'>
              <div className='row'>
                <p className='text-center fs-3 text-white'>{props.t('insertEmail')}:</p>
              </div>
              <div className='col-5'>
                <input
                  id='email'
                  type='text'
                  name='email'
                  className='form-control text-white report-black-insert'
                  value={props.reportState.email}
                  onChange={(e) => {
                    props.setReportState((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
                <div className='text-center text-danger text-about-danger'>
                  {props.reportState.email !== '' &&
                  !emailValidity &&
                  props.reportState.email.length > 4
                    ? props.t('enterValidEmail')
                    : null}
                </div>
              </div>
            </div>
          ) : null}
          <Form.Group className='mb-3 mt-1 input_modal'>
            <Form.Label className='text-light fs-3'>{props.t('description')}: </Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              aria-label='With textarea'
              value={props.reportState.description}
              className='report-desc-text text-white report-black-insert'
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
              <div className='col-2'>
                <Button
                  name='en'
                  variant={sendButtonDisabled ? 'danger' : 'success'}
                  size='sm'
                  className='btn button p-2 px-5 fs-6'
                  disabled={sendButtonDisabled}
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
                  className='btn button p-2 px-4 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      send: false,
                      description: '',
                      email: '',
                    }));
                    sendReport();
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
                  className='btn button p-2 px-4 fs-6'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
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
                  className='btn button p-2 px-4 fs-6'
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
          allowed={true}
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
      {props.reportState.openSuccessModal ? (
        <UserReportSuccessSendModal
          reportState={props.reportState}
          setReportState={props.setReportState}
          t={props.t}
          i18n={props.i18n}
        />
      ) : null}
    </div>
  );
}
