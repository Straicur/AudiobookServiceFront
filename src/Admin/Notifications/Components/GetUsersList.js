import React, { useEffect, useState } from "react";
import { HandleFetch } from "../../../Components/HandleFetch";
export default function GetUsersList(props) {
    const renderUsers = () => {
        // props.usersState.users
    }
    useEffect(() => {
        if(!props.usersState.fetch){

        }
        // HandleFetch(
        //     "http://127.0.0.1:8000/api/admin/user/notification/delete",
        //     "PATCH",
        //     {
        //       notificationId: state.id,
        //       delete: state.delete,
        //     },
        //     props.token
        //   )
        //     .then(() => {
        //       element.target.classList.remove("disabled");
        //       setDelteteState({
        //         ...deleteState,
        //         sure: !deleteState.sure,
        //       });
        //       setState({
        //         ...state,
        //         delete: !state.delete,
        //       });
        //     })
        //     .catch((e) => {
        //       props.setAudiobookState({
        //         ...props.audiobookState,
        //         error: e,
        //       });
        //     });
      }, [props]);

    return(<div>dsa</div>)
}