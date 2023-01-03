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
    helperText: 0,
    changeLang: i18n.language,
    modalShow: false,
    modalText: "",
  });

  return (
   
    
      <Form state={state} setState={setState}>
           //child component i go wtedy w komponencie warunkowo a nie nie tu 
           //text i shot ma być od errora

           //tu JAKO DZIECKO PRZEKAZUJE ALE z tąd przekazuje mu wiadomość z state i na tym levelu robie obsługę errorów
           //On dostanie ustawianą defoutowo wiadomość z tego poziomu i przy wywołaniu z ojca pójdzie dalej 
           
           // Możliwe że ogę to tak zrobić że w Form robie props.children() <- i do tego nawiasu dodaje dane???

           //Poszukaj jeszcze trochę o tym przekazywaniu dzieci do rendera 

      </Form>

                
  );
}
