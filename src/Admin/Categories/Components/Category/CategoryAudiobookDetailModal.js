import React, {useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { Buffer } from "buffer";
import AudioPlayer from 'react-h5-audio-player';
import {AudiobookDataProvider} from '../../../../Components/Providers/AudiobookProviders/AudiobookDataProvider';
import {AudiobookDataContext} from '../../../../Components/Providers/AudiobookProviders/AudiobookDataContext';

export default function CategoryAudiobookDetailModal(props) {


    const audiobookDetail = useContext(AudiobookDataContext);


    const handleClose = () => {
        props.setState({...props.state, detailAudiobookModal: !props.state.detailAudiobookModal });
      };

    return (
        <AudiobookDataProvider token={props.token} audiobookId={props.state.detailAudiobookElement.id}>
                <Modal
                show={props.state.detailAudiobookModal}
                onHide={handleClose}
                size="lg"
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="bg-dark">
                    {/* <Modal.Title><h3 className="text-light"><b>{modalState.title}</b></h3></Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="bg-dark">
                {console.log(audiobookDetail)}
               
{/*     
                    <AudioPlayer
                        header={<h3>{t('Part')}: {modalState.part}</h3>}
                        autoPlay={false}
                        src={modalState.mp3Url}
                        onListen={e=>timeCur(e)}
                        autoPlayAfterSrcChange={false}
                        showSkipControls={true}
                        onClickPrevious={()=>prevPart()}
                        onClickNext={()=>nextPart()}
                    /> */}
                   
                </Modal.Body>
            </Modal> 
        </AudiobookDataProvider>
        
    )
}