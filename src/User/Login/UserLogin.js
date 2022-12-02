import React, { useState, useEffect } from "react";
import { HandleFetch } from '../../components/HandleFetch';

export default function UserLogin() {

  const handleLogin = () => {

    const url = 'http://127.0.0.1:8000/api/authorize';
    const method = 'POST';
    const jsonData = { email: "admin@audio.com", password: "zaq12wsx" };

    HandleFetch(url, jsonData, method)
      // .then(data => data.json())
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(e => {
      //   console.log(e);
      // });
  }

  useEffect( ()=>{
    handleLogin();
  } , []  )

  return (
    <div className="App">

    </div>
  );
}