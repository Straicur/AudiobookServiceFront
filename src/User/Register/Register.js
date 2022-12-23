import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";
import md5 from "md5";
import { RegisterNotificationModal } from "./components/RegisterNotificationModal";
import Form from "./components/Form";
export default function Register() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstname: "",
    lastname: "",
    isButtonDisabled: true,
    helperText: 0,
    changeLang: i18n.language,
    modalShow: false,
    modalText: "",
  });

  return (
   
    
      <Form>
           
      </Form>

                
  );
}
