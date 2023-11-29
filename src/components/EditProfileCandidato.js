import React, {useEffect, useState} from 'react'
import linkedin from '../assets/images/linkedin-icon.png'
import esperienza from '../assets/images/esperienza-icon.png'
import gioca from '../assets/images/gioca-icon.png';
import cv from '../assets/images/cv-icon.png';
import porfolio from '../assets/images/porfolio-icon.png';
import { FaArrowRight } from "react-icons/fa";
import apiList from './apiList';
import axios from 'axios';
import cuore from '../assets/images/heart-icon.png'
import document from '../assets/images/document-icon.png'
import toast from 'react-hot-toast';
import candidatura from '../assets/images/candidature-icon.png'
import { competenzeArray } from './competenzeArray';

export const EditProfileCandidato = ({savedJob, edit, setEdit, handleGetprofile}) => {
  const profileNow = JSON.parse(localStorage.getItem('profile'));
  const token = localStorage.getItem("token");
  const [addExLink, setAddExLink] = useState({
    linkedin: profileNow.linkedin == "Non impostato" ? "" : profileNow.linkedin,
    esperienza: profileNow.esperienza,
    competenze: profileNow.competenze,
    cv: false,
    cvDoc: {},
    portfolio: false,
    portfolioDoc: {}, 
    lavoro: profileNow.lavoro ? profileNow.lavoro : '',
  });

  const [openPdf, setOpenPdf] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
}

  const handleOpenPdf = () => {
    if (openPdf == true) {
      setOpenPdf(false);
    } else {
      setOpenPdf(true);
    }
  }

  const formData = new FormData();

  const [competenze, setCompetenze] = useState([]);
  const handleInput = (key, value) => {
    setAddExLink({
      ...addExLink,
      [key]: value,
    });
  };

  const handleAddExLink = () => {
    console.log(addExLink);
    formData.append('cvDoc', addExLink.cvDoc);
    formData.append('portfolioDoc', addExLink.portfolioDoc);
    
    const jsonData = {
      cv: addExLink.cv,
      portfolio: addExLink.portfolio,
      competenze: addExLink.competenze,
      esperienza: Number(addExLink.esperienza),
      linkedin: addExLink.linkedin,
      lavoro: addExLink.lavoro,
    };
    
    formData.append('data', JSON.stringify(jsonData));
    axios
     .post(apiList.addExLink, formData, {
      headers: {
        Authorization: `Token ${token}`,
        //'Content-Type': 'multipart/form-data',
      }, 
     })
     .then((response) => {
      handleGetprofile();
      //localStorage.setItem("profile", JSON.stringify(response));
      setEdit();
      toast.success('Profilo aggiornato');
     })
     .catch((error) => {
      console.log(error)
     })
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formData.append('cvDoc', file);
      console.log('File selezionato:', file);
      setAddExLink({
        ...addExLink,
        cvDoc: file, //file
        cv: true,
      });
    }
  };
  
  const handlePortfolioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selezionato:', file);
      formData.append('portfolioDoc', file);
      setAddExLink({
        ...addExLink,
        portfolioDoc: file, 
        portfolio: true,
      });
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [competenzeFiltrate, setCompetenzeFiltrate] = useState([]);

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
    if (addExLink.competenze.includes(competenza)) {
      setAddExLink({
        ...addExLink,
        competenze: addExLink.competenze.filter(item => item !== competenza),
      });
    } else {
      setAddExLink({
        ...addExLink,
        competenze: [...addExLink.competenze, competenza],
        newCompetenza: '',
      });
    }
  };

  const initial1 = profileNow.nome.charAt(0);
  const initial2 = profileNow.cognome.charAt(0);

  return (
    <div>
        <div className='profilo-top-item'>
           <div className='left-top'>
             <div className='round-top'>
               <p>{initial1 + initial2}</p>
             </div>
             <div className='name-top'>
               <h4>{profileNow.nome + " " + profileNow.cognome}</h4>
               <p>
               <input 
               type='text' 
               className='input-edit-ruolo'
               placeholder='Imposta il ruolo'
               value={addExLink.lavoro}
               onChange={(event) => {
               handleInput("lavoro", event.target.value);
             }} />
             </p>
               <p>{profileNow.city}</p>
             </div>
           </div>
           <div>
             <a className='button' onClick={handleEdit}>Modifica</a>
           </div>
         </div>
         <div className='profilo-middle-item'>
           <div className='profilo-item'>
             <a href='/offerte-salvate'>
             <img src={cuore} alt='profilo-icone' className='img-icon-profilo' />
             </a>
             <div>
               <p>Offerte di lavoro salvate</p>
               <p>{savedJob && savedJob}</p>
             </div>
           </div>
           <div className='profilo-item'>
             <img src={candidatura} alt='profilo-icone' className='img-icon-profilo' />
             <div>
               <p>Candidature inoltrate</p>
               <p>{profileNow.candidature}</p>
             </div>
           </div>
           <div style={{cursor: 'pointer'}} className='profilo-item'>
             <img src={document} alt='profilo-icone' className='img-icon-profilo' />
             <div onClick={() => handleOpenPdf()}>
               <p>Documenti caricati</p>
               <p style={{fontSize: '13px'}}>Clicca per vedere i documenti che hai caricato</p>
               <p>{profileNow.allegati}</p>
             </div>
             {openPdf && (
              <div className='openPdf'>
                <a target='_blank' href={profileNow.cv !== "Non caricato" ? 'https://converselybackend-production.up.railway.app'+profileNow.cv : null}>CV</a>
                <a target='_blank' href={profileNow.portfolio !== "Non caricato" ? 'https://converselybackend-production.up.railway.app'+profileNow.portfolio : null}>Portfolio</a>
              </div>
             )}

           </div>
         </div>
    <form>
    <div className='profilo-middle-item2'>
         <div className='profilo-item2'>
           <img src={linkedin} alt='profilo-icone' className='img-icon-profilo' />
           <div>
             <label htmlFor='linkedin-url'>Inserisci il tuo linkedin</label>
             <input 
             className='input-edit-profile'
             id='linkedin-url' 
             type='text'
             placeholder='Non impostato'
             value={addExLink.linkedin}
             onChange={(event) => {
               handleInput("linkedin", event.target.value);
             }}
             />
           </div>
         </div>
         <div className='profilo-item2'>
           <img src={esperienza} alt='profilo-icone' className='img-icon-profilo' />
           <div>
             <label htmlFor='esperienza-utente'>Inserisci l'esperienza</label>
             <input 
             className='input-edit-profile'
             type='number' 
             id='esperienza-utente'
             value={addExLink.esperienza}
             onChange={(event) => {
               handleInput("esperienza", event.target.value);
             }} 
             />
           </div>
         </div>
    </div>
    <div className='profilo-middle-item2'>
        <div className='profilo-item2'>
          <img src={cv} alt='profilo-icone' className='img-icon-profilo' />
          <div>
            <p>Carica il tuo cv</p>
            <input type="file" accept=".pdf" onChange={handleCVUpload} />
          </div>
          <a><FaArrowRight color='#ffffff' /></a>
        </div>
        <div className='profilo-item2'>
          <img src={porfolio} alt='profilo-icone' className='img-icon-profilo' />
          <div>
            <p>Carica il tuo portfolio</p>
            <input type="file" accept=".pdf" onChange={handlePortfolioUpload} />
          </div>
          <a><FaArrowRight color='#ffffff' /></a>
        </div>
   </div>
   <div className='profilo-bottom-item-edit'>
        <div className='profilo-item-competenze'>
          <label htmlFor='inserisci-competenze'>Inserisci le tue competenze</label>
          {/*<input
            type="text"
            style={{ padding: '10px 20px', width: '90%', border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
            placeholder="Inserisci una competenza e premi Invio"
            value={addExLink.newCompetenza}
            onChange={(event) => {
              setAddExLink({
                ...addExLink,
                newCompetenza: event.target.value,
              });
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (addExLink.newCompetenza.trim() !== '') {
                  setAddExLink({
                    ...addExLink,
                    competenze: [...addExLink.competenze, addExLink.newCompetenza],
                    newCompetenza: '',
                  });
                }
              }
            }}
          />*/}
              <input
                type="text"
                style={{ padding: '10px 20px', width: '90%', border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.2)' }}
                placeholder="Inserisci una competenza"
                value={inputValue}
                onChange={handleInputChange}
              />

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', flexWrap: 'wrap' }}>
                {competenzeFiltrate.map((competenza, index) => (
                  <div className={addExLink.competenze.includes(competenza) ? 'competenze-suggerimento selected' : 'competenze-suggerimento'} onClick={() => handleCompetenzaClick(competenza)} key={index}>
                    <p>{competenza}</p>
                  </div>
                ))}
              </div>
{/*          <div>
            {filteredCompetenze.map((competenza, index) => (
              <div key={index}>
                <p style={{ margin: '5px 40px 0 40px' }}>{competenza}</p>
              </div>
            ))}
            </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center'}}>
            {addExLink.competenze.map((competenza, index) => (
              <div key={index}><p style={{margin: '5px 40px 0 40px'}}>{competenza}</p></div>
            ))}
          </div>
          */}
        </div>
        <div className='profilo-item-play'>
          <img src={gioca} alt='profilo-icone' className='img-icon-profilo' />
          <div>
            <p>Valuta le tue soft skill</p>
            <h4>Gioca!</h4>
          </div>
          <a href='/'>Inizia a giocare</a>
        </div>
    </div>
   </form>
  <button className='button-save' style={{cursor:'pointer'}} onClick={handleAddExLink}>Salva</button>
  </div>
  )
}
