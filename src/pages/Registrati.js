import { useState, useContext } from "react";
import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
} from "@material-ui/core";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import '../assets/stylePages/registrati.css';
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import FileUploadInput from "../components/FileUploadInput";
import { SetPopupContext } from "../App";
import successImage from '../assets/images/fireworks 1.png';
import apiList from "../components/apiList";
import isAuth from "../components/isAuth";
import { Redirect } from "react-router-dom";
import { HeaderCandidatoWhite } from "../components/Header";

const useStyles = makeStyles((theme) => ({
  inputBox: {
    width: "400px",
    backgroundColor: "white",
                fontFamily: 'Comfortaa, cursive',
                borderRadius: '15px',
                color: 'black',
                //border: '1px solid rgb(233, 233, 233)',
                marginBottom: '20px',
  },
}));

const Registrati = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    nome: "",
    cognome: "",
    city: "",
    role: "worker",
  });

const [numero, setPhone] = useState("");
const [terminiCondizioni, setTerminiCondizioni] = useState(false);
const [marketing, setMarketing] = useState(false);


  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    cognome: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    city: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    if (!terminiCondizioni) {
      alert('Devi accettare i Termini e le Condizioni.');
      return;
    }
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
         numero,
    };

    setSignupDetails(updatedDetails);
    console.log(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          setIsRegistrationComplete(true);
          console.log(response.data.token);
          console.log(response.data.role);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.message,
          });
          console.log(err);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setIsRegistrationComplete(true);
  }

  return (
    <div className={isRegistrationComplete ? "dark-overlay" : "registrati"}>
    <HeaderCandidatoWhite />
      <Grid container direction="column" spacing={4} alignItems="center" className="main-registrati-azienda">
        <Grid className="auth-text">
          <h2>Crea il tuo account</h2>
          <p>Sei già registrato?&nbsp; 
            <span>
              <a href="/accedi">Log in</a>
            </span>
          </p>
        </Grid>
        <Grid container direction="row" spacing={4} className="registrati-input-container">
          <Grid item>
            <TextField
              label="Nome"
              variant="standard"
              value={signupDetails.nome}
              onChange={(event) => handleInput("nome", event.target.value)}
              error={inputErrorHandler.name.error}
              helperText={inputErrorHandler.name.message}
              onBlur={(event) => {
                if (event.target.value === "") {
                  handleInputError("name", true, "Il nome è obbligatorio");
                } else {
                  handleInputError("name", false, "");
                }
              }}
              style={{
                backgroundColor: "white",
                fontFamily: 'Comfortaa, cursive',
                borderRadius: '5px',
                color: 'black',
                border: '1px solid rgb(233, 233, 233)',
                //border: '1px solid rgba(0, 0, 0, 0.2)', // Stile del bordo
                //borderRadius: '15px',
                marginBottom: '20px',
                width: '400px'
              }}
              InputProps={{
                  style: {
                      color: "black",
                      //borderRadius: '15px',
                      fontFamily: 'Comfortaa, cursive',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                  },
                  disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Cognome"
              value={signupDetails.cognome}
              onChange={(event) => handleInput("cognome", event.target.value)}
              className={classes.inputBox}
              error={inputErrorHandler.cognome.error}
              helperText={inputErrorHandler.cognome.message}
              variant="standard"
              onBlur={(event) => {
                if (event.target.value === "") {
                  handleInputError("cognome", true, "Il cognome è obbligatorio");
                } else {
                  handleInputError("cognome", false, "");
                }
              }}
              style={{
                backgroundColor: "white",
                fontFamily: 'Comfortaa, cursive',
                borderRadius: '5px',
                color: 'black',
                border: '1px solid rgb(233, 233, 233)',
              }}
              InputProps={{
                style: {
                    color: "black",
                    //borderRadius: '15px',
                    fontFamily: 'Comfortaa, cursive',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                },
                disableUnderline: true,
            }}
            
            />
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={4} className="registrati-input-container">
          <Grid item>
              <PhoneInput
                label="phone"
                country={"it"}
                onChange={(numero) => setPhone(numero)}
                error={inputErrorHandler.name.error}
                helperText={inputErrorHandler.name.message}
                className={classes.inputBox}
                style={{
                  fontFamily: 'Comfortaa, cursive',
                  borderRadius: '15px',
                  color: 'black',
                  marginBottom: '20px',
                }}
                inputStyle={{
                  width: '100%',
                  border: "1px solid rgb(233, 233, 233)"
                }}
              />
          </Grid>
          <Grid item>
            <TextField
                label="Città"
                value={signupDetails.city}
                onChange={(event) => handleInput("city", event.target.value)}
                className={classes.inputBox}
                error={inputErrorHandler.city.error}
                helperText={inputErrorHandler.city.message}
                onBlur={(event) => {
                  if (event.target.value === "") {
                    handleInputError("city", true, "La città è obbligatoria");
                  } else {
                    handleInputError("city", false, "");
                  }
                }}
                variant="standard"
                style={{
                  backgroundColor: "white",
                  fontFamily: 'Comfortaa, cursive',
                  borderRadius: '5px',
                  color: 'black',
                  border: '1px solid rgb(233, 233, 233)',
                }}
                InputProps={{
                  style: {
                      color: "black",
                      //borderRadius: '15px',
                      fontFamily: 'Comfortaa, cursive',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                  },
                  disableUnderline: true,
              }}
              />
          </Grid>
        </Grid> 

        <Grid container direction="row" spacing={4} className="registrati-input-container">
          <Grid item>
            <EmailInput
              label="Email"
              value={signupDetails.email}
              onChange={(event) => handleInput("email", event.target.value)}
              inputErrorHandler={inputErrorHandler}
              handleInputError={handleInputError}
              className={classes.inputBox}
              required={true}
            />
          </Grid>
          <Grid item>
            <PasswordInput
              label="Password"
              value={signupDetails.password}
              onChange={(event) => handleInput("password", event.target.value)}
              className={classes.inputBox}
              error={inputErrorHandler.password.error}
              helperText={inputErrorHandler.password.message}
              onBlur={(event) => {
                if (event.target.value === "") {
                  handleInputError("password", true, "la Password è obbligatoria");
                } else {
                  handleInputError("password", false, "");
                }
              }}
            />
          </Grid>
        </Grid>  
        <Grid container direction="column">
            <Grid item>

            </Grid>
        </Grid>
        <div className="check-ok" style={{marginTop: '20px'}}>
          <div>
          <label>
              <input
                type="checkbox"
                checked={marketing}
                onChange={() => setMarketing(!marketing)}
              />
              Resta sempre aggiornato! Ricevi Newsletter sui nuovi annunci
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={terminiCondizioni}
                onChange={() => setTerminiCondizioni(!terminiCondizioni)}
              />
              Accetto i Termini e Condizioni di utilizzo dei miei dati
            </label>
          </div>
          <Grid item>
            <button
              className='button'
              onClick={handleLogin}
            >
              Crea il mio account
            </button>
          </Grid>
        </div>
{/*        <Grid item>
          <a
            className='button'
            onClick={handleNext}
            href='/'
          >
            Vai avanti
          </a>
          </Grid>*/}
      </Grid>
      {isRegistrationComplete && (
        <div className="popup">
          <img alt="registrazione avvenuta con successo" src={successImage} />
          <div className="popup-text">
            <h3>Congratulazioni!</h3>
            <p>Registrazione avvenuta con successo!</p>
          </div>
          <a className="button" href="/profilo">Completa configurazione</a>
          <a href="/" >Non ora</a>
        </div>
      )}
      </div>
    )
};

export default Registrati;

// {/* <Grid item>
//           <PasswordInput
//             label="Re-enter Password"
//             value={signupDetails.tmpPassword}
//             onChange={(event) => handleInput("tmpPassword", event.target.value)}
//             className={classes.inputBox}
//             labelWidth={140}
//             helperText={inputErrorHandler.tmpPassword.message}
//             error={inputErrorHandler.tmpPassword.error}
//             onBlur={(event) => {
//               if (event.target.value !== signupDetails.password) {
//                 handleInputError(
//                   "tmpPassword",
//                   true,
//                   "Passwords are not same."
//                 );
//               }
//             }}
//           />
//         </Grid> */}
