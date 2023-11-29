import React, { useContext, useState } from "react";
import {
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { Navigate } from "react-router-dom";
import '../assets/stylePages/accedi.css'
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { SetPopupContext } from "../App";
import isAuth from "../components/isAuth";
import apiList from "../components/apiList";
import { HeaderAziendaWhite } from "../components/Header";

const AccediAzienda = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    role: "agency",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("idAzienda", response.data.id);
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          setLoggedin(isAuth());
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };
  return loggedin ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="accedi">
    <HeaderAziendaWhite />
    <Grid container direction="column" alignItems="center" justifyContent="center" className="main-accedi-azienda">
      <Grid item className="auth-text">
        <h2>Bentornato!</h2>
        <p>Effettua il login</p>
      </Grid>
      <Grid item style={{marginBottom: '20px'}}>
        <EmailInput
          label="Email"
          value={loginDetails.email}
          onChange={(event) => handleInput("email", event.target.value)}
          inputErrorHandler={inputErrorHandler}
          handleInputError={handleInputError}
        />
      </Grid>
      <Grid item>
        <PasswordInput
          label="Password"
          value={loginDetails.password}
          onChange={(event) => handleInput("password", event.target.value)}
        />
      </Grid>
      <Grid item ustifyContent="flex-start">
        <button
          className='button'
          onClick={() => handleLogin()}
        >
          LOG IN
        </button>
      </Grid>
      </Grid>
    </div>
  )
};

export default AccediAzienda;