import React, {useContext, useState} from 'react'
import { HeaderCandidatoWhite } from '../../components/Header'
import '../../assets/stylePages/cerca.css';
import DettagliAnnunciContainer from '../../components/DettagliAnnunciContainer';
import imageAzienda from '../../assets/images/Ellipse 1.png';
import moment from 'moment';
import axios from 'axios';
import apiList from '../../components/apiList';
import { SetPopupContext } from '../../App';
import successImage from '../../assets/images/fireworks 1.png';


const dettagliAnnuncio =
  {
      id: 1,
      imgAziendale: imageAzienda ,
      azienda: 'Prima azienda',
      città: 'Roma',
      ruolo: 'Startup business manager',
      desc: 'Translating startup concepts into brand new product design',
      salario: '800-1000$',
      tempistica: 'full-time',
      quando: '2 giorni fa',
      mansioni: 'work closely with the team participate in creative development translate strategic insights into slick creative concepts',
      competenze:'Adobe Creative Cloud managing freelance resource Strong design and art direction ability',
      benefit: 'Welfare aziendale Remote Working',
      esperienza:'Minimo 1 anno di esperienza',
      titoloStudio:'Magistrale in ingegneria matematica',
      contratto:'Indeterminato',
  }


const DettagliAnnuncio = () => {
  const setPopup = useContext(SetPopupContext);
  const [candidate, setCandidate] = useState(false);
  const [colorSave, setColorSave] = useState("#FFF");

  const id = parseInt(localStorage.getItem("idCliccato"));
  function getAnnuncioById(id) {
    const annunci = JSON.parse(localStorage.getItem('annunci'));
    return annunci.find((annuncio) => annuncio.id === id);
  }
  
  const annuncioCliccato = getAnnuncioById(id);

  const createdAt = annuncioCliccato?.creatoIl;
  const now = moment();
  const daysAgo = now.diff(createdAt, 'days');
  const formattedDate = `${daysAgo} giorni fa`;

  const stringaBenefit = annuncioCliccato?.benefits.join(', ');
  const stringaCompetenze = annuncioCliccato?.competenze?.join(', ');

  const handleCandidate = () => {
    const token = localStorage.getItem("token");
    const idRequest = {id: id}
    console.log(token);
    axios
      .post(apiList.applicationsCandidate, idRequest, {
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
        setCandidate(true);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        window.alert('Ti sei candidato con successo');
        console.log(err.response);
      });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    const idRequest = {id: id}
    console.log(id);
    axios
     .post(apiList.applicationsSave, idRequest, {
      headers: {
        Authorization: `Token ${token}`,
      }
     })
     .then((response) => {
      setPopup({
        open: true,
        severity: "success",
        message: response.data.message,
      });
      setColorSave("#F75F24");
      window.alert('Annuncio salvato');
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

  return (
    <div className='dettagli-annuncio'>
        <HeaderCandidatoWhite />
        <div className='dettagli-annuncio-container'>
            <h3>Dettagli della posizione</h3>
            <div className='dettagli-annunci'>
                <DettagliAnnunciContainer
                        id={annuncioCliccato.id}
                        img={'https://converselybackend-production.up.railway.app'+annuncioCliccato.azienda.logo}
                        nomeAzienda={annuncioCliccato.azienda.nome}
                        città={annuncioCliccato.city}
                        ruolo={annuncioCliccato.titolo}
                        desc={annuncioCliccato.descrizione}
                        salario={annuncioCliccato.ranger}
                        salarioMin={annuncioCliccato.rangel}
                        tempistica={annuncioCliccato.tempoLavoro}
                        quando={formattedDate}
                        benefit={stringaBenefit && stringaBenefit}
                        mansioni={annuncioCliccato.mansioni}
                        competenze={stringaCompetenze && stringaCompetenze}
                        esperienza={annuncioCliccato.esperienza}
                        titoloStudio={annuncioCliccato.studio}
                        contratto={annuncioCliccato.contratto}
                        handleCandidate={handleCandidate}
                        handleSave={handleSave}
                        colorSave={colorSave}
                 />
            </div>
        </div>
        {candidate && (
        <div className="popup">
          <img alt="registrazione avvenuta con successo" src={successImage} />
          <div className="popup-text">
            <h3>Congratulazioni!</h3>
            <p>Ti sei candidato con successo</p>
          </div>
          <a className="button" href="/cerca" style={{color: 'white'}}>Torna agli annunci</a>
        </div>
      )}
    </div>
  )
}

export default DettagliAnnuncio