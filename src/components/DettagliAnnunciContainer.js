import React, {useState} from 'react'
import '../assets/styleComponents/annunciContainer.css';
import WorkIcon from "@material-ui/icons/Work";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai';
import {BsFillPencilFill} from 'react-icons/bs';
import deleteImage from '../assets/images/delete-icon.png';
import apiList from './apiList';
import axios from 'axios';

const DettagliAnnunciContainer = (props) => {
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
        benefit,
        mansioni,
        competenze,
        esperienza,
        titoloStudio,
        contratto,
        handleCandidate,
        handleSave,
        colorSave,
        salarioMin,
    } = props
  return (
    <div className='dettagli-annunci-container' key={id}>
        <div className='dettagli-annuncio-top'>
            <div className='top1'>
                <img alt='immagine azienda' src={img} width={60} />
                <div className='top-text'>
                    <h4>{nomeAzienda}</h4>
                    <p>{città}</p>
                </div>
            </div>
            <div className='top2'>
                <a style={{cursor: 'pointer'}} onClick={handleSave}>Salva offerta <FaHeart color={colorSave} /></a>
                <a className='button' onClick={handleCandidate}>Candidati <FaArrowRight color='#FFFFFF' /></a>
            </div>
        </div>
        <div className='dettagli-annuncio-middle1'>
            <h3>{ruolo}</h3>
            <p>{desc}</p>
        </div>
        <div className='dettagli-annuncio-middle2'>
            <div>
                <h5>Mansioni</h5>
                <p>{mansioni}</p>
            </div>
            <div>
                <h5>Competenze</h5>
                <p>{competenze}</p>
            </div>
            <div>
                <h5>Range salariale</h5>
                <p>{salarioMin && salario && salarioMin + '€ - ' + salario + '€'}</p>
            </div>
            <div>
                <h5>Benefit</h5>
                <p>{benefit}</p>
            </div>
            <div>
                <h5>Esperienza</h5>
                <p>{esperienza}</p>
            </div>
            <div>
                <h5>Titolo di studio</h5>
                <p>{titoloStudio}</p>
            </div>
            <div>
                <h5>Contratto</h5>
                <p>{contratto}</p>
            </div>
        </div>
        <hr />
        <div className='dettagli-annuncio-bottom'>
            <div className='bottom-item'>
                <span><WorkIcon fontSize='small'/></span>
                <p>{tempistica}</p>
            </div>
            <div className='bottom-item'>
                <span><ScheduleIcon fontSize='small' /></span>
                <p>{quando}</p>
            </div>
        </div>
    </div>
  )
}

export default DettagliAnnunciContainer

export const DettagliAnnunciContainerAzienda = (props) => {
    const [isDeleteComplete, setIsDeleteComplete] = useState(false);
    const [sureDelete, setSureDelete] = useState(false);
    const token = localStorage.getItem("token");

    const handleDelete = (e) => {
        e.preventDefault();
        setIsDeleteComplete(true);
      }

      const handleSure = (e) => {
        e.preventDefault();
        try {
           axios.post(apiList.deleteAnnuncio, {id: id}, {
            headers: {
                Authorization: `Token ${token}`,
              },
           }).then((res) => {
            console.log(res)
            setSureDelete(true);
           }) 
        } catch (error) {
            console.error(error);
        }
      }
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
        benefit,
        mansioni,
        competenze,
        esperienza,
        titoloStudio,
        contratto,
        salarioMin,
    } = props
  return (
    <>
    <div className='dettagli-annunci-container' key={id}>
        <div className='dettagli-annuncio-top'>
            <div className='top1'>
                <img alt='immagine azienda' src={img} width={60} />
                <div className='top-text'>
                    <h4>{nomeAzienda}</h4>
                    <p>{città}</p>
                </div>
            </div>
            <div className='top2-azienda'>
                {/*<a>Modifica <BsFillPencilFill color='#F75F24' /></a>*/}
                <a style={{cursor: 'pointer'}} onClick={handleDelete}>Elimina <AiFillDelete color='#F75F24'  /></a>
            </div>
        </div>
        <div className='dettagli-annuncio-middle1'>
            <h3>{ruolo}</h3>
            <p>{desc}</p>
        </div>
        <div className='dettagli-annuncio-middle2'>
            <div>
                <h5>Mansioni</h5>
                <p>{mansioni}</p>
            </div>
            <div>
                <h5>Competenze</h5>
                <p>{competenze}</p>
            </div>
            <div>
                <h5>Range salariale</h5>
                <p>{salarioMin + '€ - ' + salario + '€' }</p>
            </div>
            <div>
                <h5>Benefit</h5>
                <p>{benefit}</p>
            </div>
            <div>
                <h5>Esperienza</h5>
                <p>{esperienza}</p>
            </div>
            <div>
                <h5>Titolo di studio</h5>
                <p>{titoloStudio}</p>
            </div>
            <div>
                <h5>Contratto</h5>
                <p>{contratto}</p>
            </div>
        </div>
        <hr />
        <div className='dettagli-annuncio-bottom'>
            <div className='bottom-item'>
                <span><WorkIcon fontSize='small'/></span>
                <p>{tempistica}</p>
            </div>
            <div className='bottom-item'>
                <span><ScheduleIcon fontSize='small' /></span>
                <p>{quando}</p>
            </div>
        </div>
    </div>
            {isDeleteComplete && (
                <div className="popup-delete">
                  <img alt="registrazione avvenuta con successo" src={deleteImage} />
                  <div className="popup-text">
                    <h3>Sei sicuro di voler eliminare il tuo annuncio?</h3>
                  </div>
                  <div className='link-delete'>
                    <a className="button" href="/profilo">NO</a>
                    <a style={{cursor: 'pointer'}} onClick={handleSure} >Si</a>
                  </div>
                </div>
              )}
               {sureDelete && (
                <div className="popup-delete">
                  <img alt="registrazione avvenuta con successo" src={deleteImage} />
                  <div className="popup-text">
                    <h3>Il tuo annuncio è stato eliminato con successo</h3>
                  </div>
                  <a style={{cursor: 'pointer'}} href='/dashboard' >Torna agli annunci</a>
                </div>
              )}
       </>       
  )
}