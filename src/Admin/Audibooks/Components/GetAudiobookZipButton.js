import React from "react";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../Components/HandleFetch";

export default function GetAudiobookZipButton(props) {
  const getZip = () => {
    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/zip",
      "POST",
      {
        audiobookId: props.audiobookDetail.id,
      },
      props.token
    )
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", "YourAudiobook.zip");

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  return (
    <Button
      name="en"
      size="lg"
      className="btn button primary_button"
      onClick={getZip}
    >
      {props.t("downloadZip")}
    </Button>
  );
}
