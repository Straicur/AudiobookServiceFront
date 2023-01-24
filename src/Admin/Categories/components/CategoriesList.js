import React, { useEffect } from "react";
import { AdminNavBar } from "../../../components/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../components/HandleFetch";
import { useTranslation } from "react-i18next";

export default function CategoriesList(props) {
  const { t } = useTranslation();

  return(
    <div className="container-fluid main-container mt-3">
    {/* <div className="card position-relative shadow p-3 mb-5">

        {state.modalShow?<ModalAddSet setSetState={setSetState} state={state} token={count}/>:null}
        {jsonModal && state.json?<JsonModal jsonModal={jsonModal} setJsonModal={setJsonModal} json={state.json} />:null}
        {errorModal && state.errors?<ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} error={errorCode()} />:null}
        {editState.modalShow && editState?<EditSet editModal={editState} setEditModal={setEditState} setSetState={setSetState} setsState={state}/>:null}
        
        <NavPanel setSetState={setSetState} state={state}/>
        
        <hr className="line"/>

        <div className="table-title">
            <h2>{t('SetsTitle')}</h2>
        </div>
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {createTableTitles()}
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {createTable()}
                </tbody>
            </table>
        </div>
        <div className="row">
            <div className="col">
                <Button
                    variant="dark"
                    size="lg"
                    color="dark"
                    className=" btn button mt-2"
                    onClick={()=>setSetState({...state,modalShow:(!state.modalShow)})}
                >
                    + {t('AddSetButton')}
                </Button>
            </div>
            <div className="col">
                <Button
                    variant="dark"
                    size="lg"
                    color="dark"
                    className=" btn button mt-2"
                    onClick={()=>setJsonModal(!jsonModal)}
                >
                    {t('SetJson')}
                </Button>
            </div>
            {(state.redirect && state.redirect !== undefined && state.redirectTo && state.redirectTo !== undefined)?<Redirect to={state.redirectTo} />:null}
        </div>
    </div> */}
</div>
    );
}