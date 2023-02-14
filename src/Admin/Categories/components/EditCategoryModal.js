import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../components/HandleFetch";

export default function EditCategoryModal(props) {

    const [stateEditButton,setStateEditButton] = useState(true)

    const [editModal,setEditModal]=useState({
        edit:true,
        new_name:"",
        error: 0
    })

    const handleClose = () => {
        props.setState({...props.state,addCategoryModal:!props.state.addCategoryModal,editCategoryElement:null});

    }
    const handleNewNameChange = (event) => {
        setEditModal({...editModal, new_name:event.target.value});
    };

    useEffect(()=>{
        if(editModal.new_name != ""){
            setStateEditButton(false)
        }
        else{
            setStateEditButton(true)
        }
    },[editModal.new_name])

    const editSetName = () => {

    //     const url ='http://127.0.0.1:8000/admin/sets/changeSetName';
    //     const jsonData = {login_token:editModal.login_token,set_key:editModal.set_token,old_name:editModal.name,new_name:editModal.new_name};
    //     const method ='PUT';

    //     console.log(jsonData)
    //     handleFetch(url,jsonData,method)
    //     .then(data => {if(data){
    //         setSetState({...setsState,updated:!setsState.updated});
    //         handleClose();
    //     }})
    //     .catch(e=>{if(e){
    //         setEditModal({...editModal,error:parseInt(e.message)})
    //         console.log(e);
    //         handleClose();
    //     }});
    }
    const deleteSet = () => {

    //     const url ='http://127.0.0.1:8000/admin/sets/deleteSet';
    //     const jsonData = {login_token:editModal.login_token,set_key:editModal.set_token,name:editModal.name};
    //     const method ='DELETE';

    //     handleFetch(url,jsonData,method)
    //     .then(data => {if(data){
    //         setEditModal({...editModal,deleted:!editModal.deleted});
    //         handleClose();
    //     }})
    //     .catch(e=>{if(e){
    //         setEditModal({...editModal,error:parseInt(e.message)})
    //         console.log(e);
    //         handleClose();
    //     }});
    }

    return (

            <Modal
                show={props.state.editCategoryModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title><h3><b>{props.t('EditSet')}</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editModal.edit?
                    <div className = "row">
                        <div className = "col">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={editModal.new_name}
                                className="form-control mt-2"
                                onChange={handleNewNameChange}
                            />
                        </div>
                        <div className = "col">
                            <Button
                                disabled={stateEditButton}
                                variant="dark"
                                className="form-control mt-2"
                                onClick={editSetName}
                            >
                                {props.t('update')}
                            </Button>
                        </div>
                    </div>
                    :<div className="row">
                    <div className="col">
                        <Button
                            variant="danger"
                            onClick={deleteSet}
                            className="form-control mt-2"
                        >
                            {props.t('yes')}
                        </Button>
                    </div>

                    <div className="col">
                        <Button
                            variant="success"
                            onClick={handleClose}
                            className="form-control mt-2"
                        >
                            {props.t('no')}
                        </Button>
                    </div>
                </div>
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="dark"
                        onClick={()=>setEditModal({...editModal, edit: true})}
                    >
                        {props.t('EditSetName')}
                    </Button>
                    <Button
                        variant="dark"
                        onClick={()=>setEditModal({...editModal, edit: false})}
                    >
                        {props.t('DeleteSet')}
                    </Button>
                    <Button
                        variant="dark"
                        onClick={handleClose}
                    >
                        {props.t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
    );
}