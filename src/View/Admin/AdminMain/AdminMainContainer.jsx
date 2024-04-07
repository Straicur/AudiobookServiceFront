import React, { useEffect } from 'react';
import AdminNavBarProviders from '../AdminNavBar/AdminNavBarProviders';
import Card from 'react-bootstrap/Card';
import { useAdminMainData } from 'Providers/Admin/AdminMainDataPrivider';

export default function AdminMainContainer(props) {
  const [dataAdminStatistics] = useAdminMainData();

  useEffect(() => {
    if (props.infoState.error != null) {
      throw props.infoState.error;
    }
  }, [props.infoState.error]);

  return (
    <div className='container-fluid main-container mt-3'>
      <div className='card position-relative p-3 mb-5 shadow'>
        <AdminNavBarProviders token={props.token} />
        <div className='p-5'>
          <div className='p-3'>
            <div className='p-3'>
              <div className='text-center fs-4'>
                <p className='fs-1 fw-bold'>{props.t('administrationPage')} </p>
                <p className='fs-1 fw-bold'>{props.t('chooseNabOptions')}</p>
              </div>
            </div>
            <div className='text-center fs-4'>
              <p className='p-3'>{props.t('currentApp')}</p>
            </div>
            {dataAdminStatistics != null ? (
              <div>
                {' '}
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <Card className='info_card'>
                      <Card.Body className='info_card_body'>
                        <div className='row align-items-center justify-content-center'>
                          <div className='col align-self-center border-end border-dark'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('categories')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{dataAdminStatistics.categories}</p>
                            </div>
                          </div>
                          <div className='col align-self-center border-end border-dark'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('audiobooks')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{dataAdminStatistics.audiobooks}</p>
                            </div>
                          </div>
                          <div className='col align-self-center'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('users')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{dataAdminStatistics.users}</p>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className='text-center fs-4'>
                  <p className='p-3'>{props.t('lastWeek')}</p>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <Card className='info_card'>
                      <Card.Body className='info_card_body'>
                        <div className='row align-items-center justify-content-center'>
                          <div className='col align-self-center border-end border-dark'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('registered')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>
                                {dataAdminStatistics.lastWeekRegistered}
                              </p>
                            </div>
                          </div>
                          <div className='col align-self-center border-end border-dark'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('loggedIn')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{dataAdminStatistics.lastWeekLogins}</p>
                            </div>
                          </div>
                          <div className='col align-self-center'>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>{props.t('wasCreatedNotifications')}</p>
                            </div>
                            <div className='row info_card_body_el'>
                              <p className='text-center'>
                                {dataAdminStatistics.lastWeekNotifications}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loadding....</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
