import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import HomeAzienda from './pages/HomeAzienda';
import Candidato from './pages/Candidato';
import Registrati from './pages/Registrati';
import Accedi from './pages/Accedi';
import { createContext, useState } from "react";
import MessagePopup from './components/MessagePopup';
import { ErrorPage } from './pages/Error';
import RegistratiAzienda from './pages/RegistratiAzienda';
import AccediAzienda from './pages/AccediAzienda';
import Annunci from './pages/candidato/Annunci';
import DettagliAnnuncio from './pages/candidato/DettagliAnnuncio';
import Profilo from './pages/candidato/Profilo';
import TuoiAnnunci from './pages/azienda/TuoiAnnunci';
import CreaAnnuncio from './pages/azienda/CreaAnnuncio';
import Database from './pages/azienda/Database';
import DettagliAnnunciTuoi from './pages/azienda/DettagliAnnunciTuoi';
import CandidatiAnnunci from './pages/azienda/CandidatiAnnunci';
import ProfiloCandidato from './pages/azienda/ProfiloCandidato';
import isAuth, { userType } from './components/isAuth';
import OfferteSalvate from './pages/candidato/OfferteSalvate';
import ChoosePage from './pages/ChoosePage';
import GestioneProfili from './pages/azienda/GestioneProfili';
import DatabaseCandidato from './pages/azienda/DatabaseCandidato';
export const SetPopupContext = createContext();

function App() {

  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <SetPopupContext.Provider value={setPopup}>
      <div className="App">
        <Routes>
              {isAuth() &&
                <>
                {userRole === "worker" ? 
                  <>
                  <Route path='/profilo' element={<Profilo />} />
                  <Route path="/candidato" element={<Candidato />} />
                  <Route path='/dettagli-annuncio/:id' element={<DettagliAnnuncio />} />
                  <Route path='/offerte-salvate' element={<OfferteSalvate />} />
                  </>
                 : 
                  <>
                  <Route path='/dashboard' element={<TuoiAnnunci />} />
                  <Route path='/creaAnnuncio' element={<CreaAnnuncio />} />
                  <Route path='/database' element={<Database />} />
                  <Route path='/dashboard/tuoAnnuncio' element={<DettagliAnnunciTuoi />} />
                  <Route path='/dashboard/:id/candidati' element={<CandidatiAnnunci />} />
                  <Route path='/dashboard/:id/candidati/:id' element={<ProfiloCandidato />} />
                  <Route path='/gestione-profili/candidati/:id' element={<ProfiloCandidato />} />
                  <Route path='/gestione-profili' element={<GestioneProfili />} />
                  <Route path='/database/candidati/:id' element={<DatabaseCandidato />} />
                  </>
                }
               </>}
            <Route exact path="/" element={<Home />} />
            <Route path="/homeAzienda" element={<HomeAzienda />} />
            <Route path='/registrati' element={<Registrati />} />
            <Route path='/registratiAzienda' element={<RegistratiAzienda />} />
            <Route path='/accediAzienda' element={<AccediAzienda />} />
            <Route path='/accedi' element={<Accedi />} />
            <Route path='/cerca' element={<Annunci />} />
            <Route path='*' element={<ErrorPage />} />
            <Route path='/choose' element={<ChoosePage />} />
        </Routes>
      </div>
      <MessagePopup
              open={popup.open}
              setOpen={(status) =>
                setPopup({
                  ...popup,
                  open: status,
                })
              }
              severity={popup.severity}
              message={popup.message}
            />
      </SetPopupContext.Provider>
    </Router>
  );
}

export default App;
