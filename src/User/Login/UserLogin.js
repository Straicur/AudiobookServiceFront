import React, { useState, useEffect } from "react";
import { HandleFetch } from '../../components/HandleFetch';
import { useTokenStore } from '../../store'

export default function UserLogin() {

  const [state, setState] = useState("");

  const handleLogin = () => {

    const url = 'http://127.0.0.1:8000/api/authorize';
    const method = 'POST';
    const jsonData = { email: "admin@audio.com", password: "zaq12wsx" };

    HandleFetch(url, jsonData, method)
      .then(data => data.json())
      .then(data => {
        setState(data.token)
        console.log(state)
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect( ()=>{
    handleLogin();
  } , []  )
  
  return (
    <div className="App">
        {useTokenStore((state) => state.setToken("0fcb473c9e691e60651c03ba177fb3890b34792817db71166fedd7ca7f5fea58e9e169edf70e4b4ac27ed91d1dec624006f974d2d82ebe4ec7037453410449c1"))}
    </div>
  );
}