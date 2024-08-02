import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { UserFooter } from 'View/User/Common/UserFooter';
import ValidateUtil from 'Util/ValidateUtil';
import { HandleFetch } from 'Util/HandleFetch';
import { useMutation } from '@tanstack/react-query';
import { useUserAuthorizeData } from 'Providers/User/UserAuthorizeProvider';
import md5 from 'md5';
import { networkErrorAtom } from 'App';
import { useAtom } from 'jotai';

export default function UserAboutContainer(props) {
  const [ipAddress, setIPAddress] = useState('');
  const setErrorAtomState = useAtom(networkErrorAtom)[1];
  const login = useUserAuthorizeData()[1];

  const { mutate: sendRecrutationReq } = useMutation({
    mutationFn: () => {
      return HandleFetch(
        '/report',
        'PUT',
        { type: 7, ip: ipAddress, email: props.state.email },
        null,
        props.i18n.language,
      );
    },
  });

  const myEmail = 'mosinskidamian';
  let emailValidity =
    ValidateUtil.validateEmail(props.state.email) && !props.state.email.includes(myEmail);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <div className='container-fluid main-container about_page_container mt-3'>
        <div className='card position-relative p-3 bg-dark shadow about_page text-center text-white'>
          <div className='row justify-content-end  align-items-center mt-1'>
            <div className='col-2'>
              <ButtonGroup className='ps-5 ms-5'>
                <Button
                  name='pl'
                  size='sm'
                  className={
                    props.i18n.language === 'pl' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
                  }
                  onClick={() => props.i18n.changeLanguage('pl')}
                >
                  PL
                </Button>
                <Button
                  name='en'
                  size='sm'
                  className={
                    props.i18n.language === 'en' ? 'btn  m-1 button_light' : 'btn  m-1 button_dark'
                  }
                  onClick={() => props.i18n.changeLanguage('en')}
                >
                  EN
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className='fs-2 fw-bold'>
            <p>{props.t('aboutDesc1')}</p>
          </div>
          <div className='fs-4 text-break'>
            <p>{props.t('aboutDesc2')}</p>
          </div>
          <div className='fs-4 text-break mb-3'>
            <p>{props.t('aboutDesc3')}</p>
          </div>

          <div className='fs-4 text-break mt-4'>
            <p>{props.t('aboutDesc4')}</p>
          </div>
          <div className='fs-5 row mx-2 d-flex justify-content-center'>
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/symfony-%23000000.svg?style=for-the-badge&logo=symfony&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='http://img.shields.io/badge/-PHPStorm-181717?style=for-the-badge&logo=phpstorm&logoColor=white'
            />
            <img
              className='small_img_stack'
              src='https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white'
            />
          </div>
          <p className='fs-3 text-center mt-4'>Doświadczenie zawodowe</p>
          <div className='list-group text-start my-1'>
            <a
              href='#'
              className='list-group-item list-group-item-action desc-background-black flex-column align-items-start active p-4 desc-border-black'
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>Asuri Solutions </h5>
              </div>
              <p className='mb-1'>wrz 2021 – lis 2022</p>
              <p className='mb-1 text-break'>
                Mały softwarehouse, w którym stawiałem pierwsze kroki w web-developmentcie.
                Opanowałem język php oraz zostałem wdrożony w Symfony5. W pracy byłem zaangażowany w
                3 projekty:
                <p className='mb-1 text-break'>
                  1. Pojekt wewnętrzny firmy, którego celem było stworzenie aplikacji do zarządzania
                  audiobookami. Projekt ten stał się inspiracją do tematu mojej pracy inżynierskiej.
                  Tworząc swoje portfolio, wzorowałem się także na tej koncepcji. Mój system do
                  zarządzania audiobookami można zobaczyć, logując się poprzez podanie swojemu
                  adresu mailowy na końcu tej strony.
                </p>
                <p className='mb-1 text-break'>
                  2.FlatApp to aplikacja stworzona do zarządzania nieruchomościami. W swoim
                  działaniu nawiązywała do strony otodom, umożliwiała sprzedaż lub wynajem
                  nieruchomości, ale dodatkowo rozszerzała możliwosci właściciela do zarządzania
                  swoim mieszkaniem. Od strony wynajmujących możliwe było płacenie czynszu czy też
                  zgłaszanie usterek, niedogodnień lub uwag. Dodatkowo firmy zewnętrzne miały
                  możliwość oferowania swoich usług w postaci napraw czy wykończeń wnętrz. Aplikacja
                  posiadała system oceny mieszkań, właścicieli i lokatorów. Dzięki udziałowi w
                  projekcie nauczyłem się tworzyć rest api, testy funkcjonalne oraz integracyjne.
                  Poznałem dogłebnie, jak implementować logikę biznesową. Był to główny projekt, w
                  którym brałem udział i opierał się on w większości na napisanym przeze mnie
                  kodzie.
                </p>
                <p className='mb-1 text-break'>
                  3.Omnidev był projektem skierowany do deweloperów, którzy chcieli sprzedać
                  mieszkania ze swojej inwestycji, nawet takich, które jeszcze nie postały. Kupujący
                  mieli możliwość wyboru i kupna konkretnych mieszkać z planu budowy, wskazany przez
                  siebie miejsc parkingowych czy też komórek lokatorskich oraz pakietów wykończeń
                  mieszkań. Zewnętrzne firmy również oferowały swoje usługi związane z naprawami,
                  wykończeniem i remontem mieszkań. Aplikacjia FlatApp była moim pobocznym projektem
                  w pracy, ale zająłem się jej rozwojem w firmie, do której następnie przeszedłem.
                </p>
              </p>
            </a>
          </div>
          <div className='list-group text-start my-2 desc-background-black'>
            <a
              href='#'
              className='list-group-item list-group-item-action desc-background-black flex-column align-items-start p-4 active desc-border-black'
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>Vobacom </h5>
              </div>
              <p className='mb-1'>lis 2022 – mar 2023 / maj 2023 – sie 2023 </p>
              <p className='mb-1 text-break'>
                W firmie Vobacom kontynuowałem rozwój aplikacji Omnidev, jednak dużą częścią pracy
                nad tą aplikacją stanowił jej refaktor. Podniosłem w niej wersje symfony, php oraz
                wszystkich pakietów przez wielką ilość deprekacji. Przepisywałem również samą
                podstawę projektową, która nie korzystała prawie wcale z udogodnień Symfony i była
                napisana w czystym php. Po usunięciu wszystkich błędów związanych z refaktorem oraz
                naprawą wszcześniejszych zaniedbań, aplikacja została rozwinięta i ukończona.
              </p>
              <p className='mb-1 text-break'>
                Po zakończeniu pracy nad Omnidev, zostałem przerzucony na pracę z Drupalem.
                Zajmowałem się mniejszymi zadaniami związanymi z błędami, poprawkami oraz zmianami w
                działaniu różnych aplikacji, głównie stron internetowych gmin czy też firm.
                Uczestniczyłem również w większym wdrożeniu związanym z firmą ubezpieczeniową i jej
                ofertami ubezpieczeń. Niestety nie zostałem w żaden sposób wprowadzony w Drupala,
                przez co zraziłem się do tego crm.
              </p>
            </a>
          </div>
          <div className='list-group text-start my-2 desc-background-black'>
            <a
              href='#'
              className='list-group-item list-group-item-action desc-background-black flex-column align-items-start p-4 active desc-border-black'
            >
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>Primesoft </h5>
              </div>
              <p className='mb-1'>wrz 2023 – Teraz</p>
              <p className='mb-1 text-break'>
                W firmie aktualnie zajmuje się pracą nad rozwojem wdrożeń aplikacji V-desk. Jest to
                aplikacja dla księgowych, która umożliwia cyfryzację procesów obiegu dokumentów,
                takich jak faktury, delegacje, umowy i ewidencje. Każde wdrożenie różni się od
                siebie i polega na nadbudowaniu silnika aplikacji, w zależności od potrzeb klienta.
                Pracowałem już nad kilkunastoma wdrożeniami od początku do końca. W przerwach
                pomiędzy pracą nad aplikacją V-desk, zajmuję się utrzymywaniem różnych aplikacji na
                podstawie zadań, które zgłasza dział support.
              </p>
            </a>
          </div>

          <div className='row mt-5'>
            <div className='fs-5 col-6'>Aby zalogować się jako Administrator podaj swój email:</div>
            <div className='col-6'>
              <div className='fs-5 row'>
                <div className='col-9'>
                  <input
                    id='email'
                    type='text'
                    name='email'
                    disabled={props.state.send}
                    className='form-control mt-2'
                    onChange={(e) => {
                      props.setState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                  {props.state.email !== '' && !emailValidity ? (
                    <div className='fs-5 text-center text-danger'>zły</div>
                  ) : null}
                </div>
                <div className='col-2'>
                  {!props.state.send ? (
                    <Button
                      name='pl'
                      size='sm'
                      className={'btn  m-1 admin_button_dark'}
                      disabled={!emailValidity}
                      onClick={() => {
                        sendRecrutationReq();
                        props.setState((prev) => ({
                          ...prev,
                          send: true,
                        }));
                      }}
                    >
                      Zaloguj
                    </Button>
                  ) : (
                    <Button
                      name='pl'
                      size='sm'
                      className={'btn  m-1 admin_button_dark'}
                      disabled={!emailValidity}
                      onClick={() => {
                        setTimeout(function () {
                          login({
                            email: process.env.REACT_APP_RECRUTATION_EMAIL,
                            password: md5(process.env.REACT_APP_RECRUTATION_PASSWORD),
                            errorMethodAfter: setErrorAtomState(null),
                          });
                        }, 1000);
                      }}
                    >
                      Przejdź do strony głównej
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </HelmetProvider>
  );
}
