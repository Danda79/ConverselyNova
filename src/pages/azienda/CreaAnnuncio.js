import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";
import Chip from "material-ui-chip-input";
import '../../assets/stylePages/creaAnnuncio.css'
import { SetPopupContext } from "../../App";
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import it from 'date-fns/locale/it';
import apiList from "../../components/apiList";
import { HeaderAziendaWhiteLogin } from "../../components/Header";
import { competenzeArray } from "../../components/competenzeArray";

const nomiItaliani = [
  "cellulare",
  "buoni pasto",
  "auto aziendale",
  "assicurazione sanitaria",
  "acqua gratis",
  "caffe gratis",
  "mensa aziendale",
  "alloggio",
  "stock options",
  "car sharing",
  "biblioteca",
  "dog day",
  "kids day",
  "asilo",
  "bonus bimbi",
  "borse di studio",
  "budget formazione",
  "budget postazione lavoro agile",
  "smart working",
  "lavoro agile",
  "remote working",
  "venerdi corto (7 ore)",
  "venerdi corto (mezza giornata)",
  "settimana corta (venerdi off)",
  "congedo papà",
  "convenzioni",
  "dichiarazione redditi",
  "docce",
  "lavanderia",
  "lavaggio auto",
  "navetta aziendale",
  "orario flessibile",
  "orario estivo",
  "parcheggio gratuito",
  "team building",
  "volontariato",
  "ferie illimitate",
  "tutor in azienda",
  "sconti dipendenti",
  "rimborso libri scolastici",
  "palestra",
  "budget vacanze",
  "budget spazio coworking",
  "budget benessere",
  "kit di benvenuto",
  "laptop a scelta",
  "donazioni benefiche a scelta",
  "nessuno",
  "da definire",
];

const titoliStudioItaliani = [
  "diploma scuola secondaria",
  "laurea triennale",
  "laurea magistrale",
  "dottorato",
  "master di primo livello",
  "master di secondo livello",
];

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
  inputBox: {
    width:'100%'
  }
}));

/*                      <ChipInput
                        className={classes.inputBox}
                        label="Skills"
                        variant="outlined"
                        helperText="Press enter to add skills"
                        value={jobDetails.skillsets}
                        onAdd={(chip) =>
                          setJobDetails({
                            ...jobDetails,
                            skillsets: [...jobDetails.skillsets, chip],
                          })
                        }
                        onDelete={(chip, index) => {
                          let skillsets = jobDetails.skillsets;
                          skillsets.splice(index, 1);
                          setJobDetails({
                            ...jobDetails,
                            skillsets: skillsets,
                          });
                        }}
                        fullWidth
                      /> */


const CreaAnnuncio = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    titolo: "",
    city: "",
    descrizione: "",
    contratto: "",
    competenze: [],
    turnazione: "",
    esperienza: Number,
    mansioni: "",
    benefits: [],
    protetto: Boolean,
    tempoLavoro: "",
    studio: "",
    ranger: Number,
    rangel: Number,
    durataAnnuncio: new Date(),
    skills: [], 
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    const token = localStorage.getItem("token");
    console.log(token);
    if (jobDetails.titolo == "" || jobDetails.descrizione == "" || jobDetails.city == "" || jobDetails.benefits == [] || jobDetails.competenze == []
    || jobDetails.contratto == "" || jobDetails.turnazione == "" || jobDetails.studio == "" || jobDetails.rangel == 0 || jobDetails.ranger == 0){
      alert('Tutti i campi sono obbligatori');
      return
    } else if (jobDetails.durataAnnuncio == new Date()){
      alert('Inserire una data valida per la fine dell\'annuncio')
      return;
    } else if (jobDetails.rangel < 10000 || jobDetails.ranger < 10000) {
      alert('Il range annuale deve essere maggiore di 10.000');
      return
    }
    
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
       setJobDetails({
        titolo: "",
        city: "",
        descrizione: "",
        contratto: "",
        competenze: [],
        turnazione: "",
        esperienza: 1,
        mansioni: "",
        benefits: [],
        protetto: false,
        tempoLavoro: "",
        studio: "",
        ranger: 100,
        rangel: 0,
        durataAnnuncio: new Date(new Date())
          .toISOString()
          .substr(0, 16),
        skills: [], 
      }) 
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const [competenzeFiltrate, setCompetenzeFiltrate] = useState([]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredCompetenze = competenzeArray.filter(competenza =>
      competenza.toLowerCase().startsWith(inputValueLowerCase)
    );

    setCompetenzeFiltrate(filteredCompetenze.slice(0, 10));
  }, [inputValue, competenzeArray]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCompetenzaClick = (competenza) => {
    if (jobDetails.competenze.includes(competenza)) {
      setJobDetails({
        ...jobDetails,
        competenze: jobDetails.competenze.filter(item => item !== competenza),
      });
    } else {
      setJobDetails({
        ...jobDetails,
        competenze: [...jobDetails.competenze, competenza],
        newCompetenza: '',
      });
    }
  };

  console.log(jobDetails.competenze);

  return (
    <>
    <HeaderAziendaWhiteLogin />
    <div className="creaAnnuncio-container">
      <div className="creaAnnuncio-left">
        <div>
          <h2>Hai un nuovo annuncio?</h2>
          <p>Inserisci i dati e carica l'annuncio</p>
        </div>
        <hr color="#EAE9E9" fullWidth/>
        <div>
          <p>Inserisci la durata del tuo annuncio</p>
          {/*<CustomInput value={jobDetails.durataAnnuncio.toISOString().substr(0, 16)} />*/}
          <Grid item style={{paddingTop:'0em'}}>
              <div className='calendar-container'>
                <Calendar 
                onChange={(date) => {
                  handleInput("durataAnnuncio", date);
                }} 
                value={jobDetails.durataAnnuncio} />
              </div>
                    {/*<TextField
                      label="Durata annuncio"
                      open={true}
                      type="date"
                      value={jobDetails.durataAnnuncio}
                      onChange={(event) => {
                        handleInput("durataAnnuncio", event.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                    />*/}
        </Grid>
        </div>
      </div>
      <div className="creaAnnuncio-right">
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          style={{ padding: "30px", minHeight: "93vh" }}
        >
          <Grid item container xs direction="column" justify="center">
            <Grid item>
              <Paper
                style={{
                  padding: "20px",
                  outline: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                    <Grid item >
                      <TextField
                        label="Titolo"
                        value={jobDetails.titolo}
                        onChange={(event) =>
                          handleInput("titolo", event.target.value)
                        }
                        variant="standard"
                        fullWidth
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px'
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
                        label="Città"
                        value={jobDetails.city}
                        onChange={(event) => handleInput("city", event.target.value)}
                        className={classes.inputBox}
                        variant="standard"
                        fullWidth
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px',
                          marginLeft: '30px,'
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
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                    <Grid item>
                      <TextField
                          label="Mansioni"
                          value={jobDetails.mansioni}
                          onChange={(event) =>
                            handleInput("mansioni", event.target.value)
                          }
                          variant="standard"
                          fullWidth
                          style={{
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginLeft: '30px,'
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
                        label="Range retributivo minimo annuale"
                        type="number"
                        value={jobDetails.rangel}
                        onChange={(event) => {
                          handleInput("rangel", parseInt(event.target.value));
                        }}
                        fullWidth
                        className={classes.inputBox}
                        variant="standard"
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px',
                          marginRight: '30px,'
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
                          inputProps: {
                            min: 10000, // Imposta il valore minimo a 5 cifre
                          },
                      }}
                      />
                      </Grid>
                  </Grid>
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                  <Grid direction="row" item spacing={3}>
                       <TextField
                        label="Range retributivo massimo annuale"
                        type="number"
                        value={jobDetails.ranger}
                        onChange={(event) => {
                          handleInput("ranger", parseInt(event.target.value));
                        }}
                        className={classes.inputBox}
                        fullWidth
                        variant="standard"
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px',
                          marginLeft: '30px,'
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
                          inputProps: {
                            min: 10000, // Imposta il valore minimo a 5 cifre
                          },
                      }}
                      />
                    </Grid>
                    <Grid item>
                    <TextField
                          select
                          label="Turnazione"
                          value={jobDetails.turnazione}
                          className={classes.inputBox}
                          onChange={(event) => {
                            handleInput("turnazione", event.target.value);
                          }}
                          variant="standard"
                          fullWidth
                          style={{
                            height: 'fit-content',
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginLeft: '30px,'
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
                        >
                          <MenuItem value="orario notturno">Orario Notturno</MenuItem>
                          <MenuItem value="turni nel weekend">Turni nel Weekend</MenuItem>
                          <MenuItem value="normale">Turno Normale</MenuItem>
                        </TextField>
                      {/*<TextField
                        select
                        multiple
                        label="Competenze"
                        value={jobDetails.skills || []}
                        className={classes.inputBox}
                        onChange={(event) => {
                          handleInput("skills", event.target.value);
                        }}
                        onAdd={(chip) =>
                          setJobDetails({
                            ...jobDetails,
                            skills: [...jobDetails.skills, chip],
                          })
                        }
                        onDelete={(chip, index) => {
                          let skills = jobDetails.skills;
                          skills.splice(index, 1);
                          setJobDetails({
                            ...jobDetails,
                            skills: skills,
                          });
                        }}
                        SelectProps={{
                          multiple: true,
                          value: jobDetails.skills || [],
                          onChange: (event) => handleInput("skills", event.target.value),
                        }}
                        variant="standard"
                        fullWidth
                        style={{
                          height: '100%',
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px',
                          marginLeft: '30px,'
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
                      >
                        <MenuItem value="gestione dello stress">Gestione dello stress</MenuItem>
                        <MenuItem value="empatia">Empatia</MenuItem>
                        <MenuItem value="organizzazione">Organizzazione</MenuItem>
                        <MenuItem value="proattività">Proattività</MenuItem>
                        <MenuItem value="team work">Team work</MenuItem>
                        <MenuItem value="creatività">Creatività</MenuItem>
                        <MenuItem value="ascolto">Ascolto</MenuItem>
                        <MenuItem value="apprendimento">Apprendimento</MenuItem>
                      </TextField>*/}
                    </Grid>
                  </Grid>
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                  <Grid item>
                      <TextField
                        select
                        multiple
                        value={jobDetails.benefits || []}
                        onChange={(event) => handleInput("benefits", event.target.value)}
                        SelectProps={{
                          multiple: true,
                          value: jobDetails.benefits || [],
                          onChange: (event) => handleInput("benefits", event.target.value),
                        }}
                        onAdd={(chip) =>
                          setJobDetails({
                            ...jobDetails,
                            benefits: [...jobDetails.benefits, chip],
                          })
                        }
                        onDelete={(chip, index) => {
                          let benefits = jobDetails.benefits;
                          benefits.splice(index, 1);
                          setJobDetails({
                            ...jobDetails,
                            benefits: benefits,
                          });
                        }}
                        variant="standard"
                        fullWidth
                        style={{
                          height: '100%',
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px'
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
                      label="Benefits"
                      >
                        {nomiItaliani.map((benefit, index) => (
                          <MenuItem key={index} value={benefit}>
                            {benefit}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                          label="Esperienza minima"
                          className={classes.inputBox}
                          type="number"
                          value={jobDetails.esperienza}
                          onChange={(event) => {
                            handleInput("esperienza", parseInt(event.target.value));
                          }}
                          variant="standard"
                          fullWidth
                          style={{
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginRight: '0px'
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
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                    <Grid item>
                      <TextField
                          select
                          label="Categoria protetta"
                          value={jobDetails.protetto}
                          className={classes.inputBox}
                          onChange={(event) => {
                            handleInput("protetto", event.target.value);
                          }}
                          variant="standard"
                          fullWidth
                          style={{
                            height: 'fit-content',
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginLeft: '30px,'
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
                        >
                          <MenuItem value={false}>NO</MenuItem>
                          <MenuItem value={true}>SI</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                          select
                          label="Orari"
                          value={jobDetails.tempoLavoro}
                          onChange={(event) => {
                            handleInput("tempoLavoro", event.target.value);
                          }}
                          variant="standard"
                          fullWidth
                          style={{
                            height: 'fit-content',
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginLeft: '30px,'
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
                        >
                          <MenuItem value="full-time">Full-time</MenuItem>
                          <MenuItem value="part-time">Part-time</MenuItem>
                        </TextField>
                    </Grid>
                  </Grid>
                  <Grid direction="row" container spacing={3} fullWidth style={{padding:'15px'}}>
                  <Grid item>
                      <TextField
                        select
                        label="Titolo di studio"
                        value={jobDetails.studio}
                        onChange={(event) => handleInput("studio", event.target.value)}
                        variant="standard"
                        fullWidth
                        style={{
                          height: 'fit-content',
                          borderRadius: '5px',
                          width: '250px',
                          border: '1px solid rgb(233, 233, 233)',
                          padding: '0 20px',
                          marginLeft: '30px,'
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
                      >
                        {titoliStudioItaliani.map((titolo, index) => (
                          <MenuItem key={index} value={titolo}>
                            {titolo}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                          select
                          label="Contratto"
                          value={jobDetails.contratto}
                          onChange={(event) => {
                            handleInput("contratto", event.target.value);
                          }}
                          variant="standard"
                          fullWidth
                          style={{
                            height: 'fit-content',
                            borderRadius: '5px',
                            width: '250px',
                            border: '1px solid rgb(233, 233, 233)',
                            padding: '0 20px',
                            marginLeft: '30px,'
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
                        }}s
                        >
                          <MenuItem value="determinato">Determinato</MenuItem>
                          <MenuItem value="indeterminato">Indeterminato</MenuItem>
                          <MenuItem value="stage">Stage</MenuItem>
                          <MenuItem value="apprendistato">Apprendistato</MenuItem>
                        </TextField>
                    </Grid>
                  </Grid>
                  <Grid item style={{
                    width: '90%',
                    borderRadius: '5px',
                    border: '1px solid rgb(233, 233, 233)',
                    margin: '0 17px'
                    }}>
                    <input
                      type="text"
                      style={{ padding: '10px 20px', width: '90%', border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', fontFamily: 'Comfortaa, cursive', margin: '10px 0' }}
                      placeholder="Inserisci una o più competenze"
                      value={inputValue}
                      onChange={handleInputChange}
                    />

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', flexWrap: 'wrap', padding: '20px' }}>
                      {competenzeFiltrate.map((competenza, index) => (
                        <div style={{margin: '5px 5px'}} className={jobDetails.competenze.includes(competenza) ? 'competenze-suggerimento selected' : 'competenze-suggerimento'} onClick={() => handleCompetenzaClick(competenza)} key={index}>
                          <p>{competenza}</p>
                        </div>
                      ))}
                    </div>
                  </Grid>
                  <Grid item style={{ width: "100%" }}>
                    <TextField
                      label="Descrizione (max 500 caratteri)"
                      multiline
                      rows={8}
                      value={jobDetails.descrizione}
                      onChange={(event) => {
                        if (
                          event.target.value.split(" ").filter(function (n) {
                            return n != "";
                          }).length <= 500
                        ) {
                          handleInput("descrizione", event.target.value);
                        }
                      }}
                      variant="standard"
                      fullWidth
                      style={{
                        borderRadius: '5px',
                        width: '90%',
                        border: '1px solid rgb(233, 233, 233)',
                        padding: '0 20px',
                        marginRight: '0px'
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
                <Grid container justify="left">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: "8px 24px", marginTop: "30px", borderRadius: '70px', background: '#293479' }}
                    onClick={() => handleUpdate()}
                  >
                    Carica
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
    </>
  );
};

function CustomInput({ value }) {
  return (
    <button style={{width: '200px', padding: '4px 10px', marginTop: '50px'}} className="custom-input">
      {value}
    </button>
  );
}

export default CreaAnnuncio;