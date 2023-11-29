import { useState } from "react";
import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  TextField,
  StandardProps
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import '../assets/stylePages/accedi.css';

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl variant="outlined" error={props.error ? props.error : null}>
        <TextField
         label='Password'
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={props.value}
          onChange={(event) => props.onChange(event)}
          labelWidth={props.labelWidth ? props.labelWidth : 70}
          onBlur={props.onBlur ? props.onBlur : null}
          variant="standard"
          style={{
            height: '100%',
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
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
        }}
        />
        {props.helperText ? (
          <FormHelperText>{props.helperText}</FormHelperText>
        ) : null}
      </FormControl>
    </>
  );
};

export default PasswordInput;