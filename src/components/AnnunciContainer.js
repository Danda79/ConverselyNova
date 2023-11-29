import React from 'react'
import '../assets/styleComponents/annunciContainer.css';
import WorkIcon from "@material-ui/icons/Work";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {BsEyeFill} from 'react-icons/bs';
import {BsFillPersonFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AnnunciContainer = (props) => {
    const {
        id,
        img,
        nomeAzienda,
        città,
        ruolo,
        desc,
        salario,
        tempistica,
        quando,
        salarioMin
    } = props
  return (
    <div className='annunci-container' key={id}>
        <div className='annuncio-top'>
            <img alt='immagine azienda' width={60} src={img} />
            <div className='top-text'>
                <h4>{nomeAzienda}</h4>
                <p>{città}</p>
            </div>
        </div>
        <div className='annuncio-middle'>
            <h3>{ruolo}</h3>
            <p>{desc}</p>
        </div>
        <div className='annuncio-bottom'>
            <div className='bottom-item'>
                <span><WorkIcon fontSize='small'/></span>
                <p>{tempistica}</p>
            </div>
            <div className='bottom-item'>
                <span><MonetizationOnIcon fontSize='small' /></span>
                <p>{salario && salarioMin && salarioMin + '€ - ' + salario + '€'}</p>
            </div>
            <div className='bottom-item'>
                <span><ScheduleIcon fontSize='small' /></span>
                <p>{quando}</p>
            </div>
        </div>
    </div>
  )
}

export default AnnunciContainer

export const AnnunciContainerAzienda = (props) => {
    const {
        id,
        imgAzienda,
        città,
        ruolo,
        desc,
        salario,
        tempistica,
        views,
        candidati,
        link,
        key,
        salarioMin,
        oggetto
    } = props
  return (
    <>
    <div className='annunci-container mobile-azienda' key={id}>
        <Link to='/dashboard/tuoAnnuncio' state={{ dettagliAnnuncio: oggetto }} style={{textDecoration: 'none'}}>
        <div className='annuncio-top'>
            <img alt='immagine azienda' width={60} src={imgAzienda} />
            <div className='top-text-azienda'>
                <h4>{ruolo}</h4>
                <p>{città}</p>
            </div>
        </div>
        </Link>
        <div className='annuncio-middle-azienda'>
            <h3>Descrizione <span>{desc}</span></h3>
        </div>
        <div className='annuncio-middle-azienda'>
            <h3>Descrizione <span>{tempistica}</span></h3>
        </div>
        <div className='annuncio-middle-azienda'>
            <h3>Salario <span>{salario && salarioMin && salarioMin + '€ - ' + salario + '€'}</span></h3>
        </div>
        <div className='annuncio-bottom'>
            <div className='bottom-item'>
                <span><BsEyeFill fontSize='large' /></span>
                <p>{views} views</p>
            </div>
            <div className='bottom-item'>
                <span><BsFillPersonFill fontSize='large' /></span>
                <p>{candidati} candidati</p>
            </div>
        </div>
        <a href={link} className='button-dettagli'>Guarda i dettagli</a>
    </div>
    </>
  )
}

