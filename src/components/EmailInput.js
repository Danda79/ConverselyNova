import React from "react";
import { TextField } from "@material-ui/core";
import '../assets/stylePages/accedi.css';

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler,
    handleInputError,
    required,
  } = props;

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      helperText={inputErrorHandler.email.message}
      onBlur={(event) => {
        if (event.target.value === "") {
          if (required) {
            handleInputError("email", true, "Email è obbligatoria");
          } else {
            handleInputError("email", false, "");
          }
        } else {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(event.target.value).toLowerCase())) {
            handleInputError("email", false, "");
          } else {
            handleInputError("email", true, "Formato email non corretto");
          }
        }
      }}
      error={inputErrorHandler.email.error}
      variant="standard"
      style={{
        backgroundColor: "white",
        fontFamily: 'Comfortaa, cursive',
        borderRadius: '5px',
        color: 'black',
        border: '1px solid rgb(233, 233, 233)',
        width: '400px',
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
  );
};

export default EmailInput;