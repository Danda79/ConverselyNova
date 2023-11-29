import React from 'react'
import '../assets/styleComponents/dettagliCandidatoContainer.css';
import {AiFillLock} from 'react-icons/ai'


export const DettagliCandidatoContainer = (props) => {
    const {
        id,
        img,
        nome,
        città,
        cognome,
        ruolo,
        competenze,
        titoloStudio,
        allegati,
        link,
    } = props
    const initial1 = nome.charAt(0);
    const initial2 = cognome.charAt(0);
  return (
    <>
    <div className='candidato-container' key={id}>
        <div className='annuncio-top'>
            {/*<img alt='immagine azienda' src={img} />*/}
            <div style={{padding: '0 10px'}} className='round-top'>
               <p>{initial1 + initial2}</p>
             </div>
            <div className='top-text-azienda'>
                <h4>{nome + ' ' + cognome}</h4>
                <p>{ruolo}</p>
            </div>
        </div>
        <div className='candidato-middle-azienda'>
            <h3>{città}</h3>
        </div>
        <div className='candidato-middle-azienda'>
            <h3>Competenze: <span>{competenze}</span></h3>
        </div>
        <div className='candidato-middle-azienda'>
            <h3>Titolo di studio: <span>{titoloStudio}</span></h3>
        </div>
        <div className='candidato-middle-azienda'>
            <h3>Descrizione <span>SoftSkills</span></h3>
        </div>
        <div className='candidato-middle-azienda'>
            <h3>Allegati: <span>{allegati}</span></h3>
        </div>
        <a href={link} className='button-candidato'>Dettagli candidato</a>
    </div>
    </>
  )
}


export const DatabaseContainer = (props) => {
    const {
        id,
        img,
        nome,
        cognome,
        città,
        ruolo,
        competenze,
        titoloStudio,
        allegati,
        link,
    } = props
    const initial1 = nome.charAt(0);
    const initial2 = cognome.charAt(0);
  return (
    <>
    <div className='candidato-container' key={id}>
        <div className='candidato-middle-azienda2'>
            <h3>#{id}</h3>
        </div>
        <div className='annuncio-top'>
            {/*<img alt='immagine azienda' src={img} />*/}
            <div className='round-top'>
               <p>{initial1 + initial2}</p>
             </div>
            <div className='top-text-azienda'>
                <h4>{nome}</h4>
                <p>{ruolo}</p>
            </div>
        </div>
            <div className='candidato-middle-azienda'>
                <h3>{città}</h3>
            </div>
            <div className='candidato-middle-azienda'>
                <h3>Competenze: <span>{competenze}</span></h3>
            </div>
            <div className='candidato-middle-azienda'>
                <h3>Titolo di studio: <span>{titoloStudio}</span></h3>
            </div>
            <div className='candidato-middle-azienda'>
                <h3>Descrizione <span>SoftSkills</span></h3>
            </div>
            <div className='candidato-middle-azienda'>
                <h3>Allegati: <span>{allegati}</span></h3>
            </div>

        <span><AiFillLock fontSize='large' /></span>
        <a href={link} className='button' style={{marginTop: '-5px'}}>
            Dettagli candidato
        </a>
    </div>
    </>
  )
}