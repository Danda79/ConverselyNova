import React, {useEffect, useState} from 'react'
import { HeaderAziendaWhiteLogin } from '../../components/Header'
import { DettagliCandidatoContainer } from '../../components/DettagliCandidato'
import imageAzienda from '../../assets/images/Ellipse 2.png';
import axios from 'axios';
import apiList from '../../components/apiList';
import { useParams } from 'react-router-dom';

const CandidatiAnnunci = () => {
  const token = localStorage.getItem("token");
  const [offer, setOffer] = useState([]);
  let { id } = useParams();
  const requestData = { id: Number(id)};

  const handleGetOffer = () => {
    axios.post(apiList.getOfferApplications, requestData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      const offer = response.data.list;
      console.log(offer);
      setOffer(offer)
    })
    .catch(error => {
      console.log(error);
    });
};

    useEffect(() => {
      handleGetOffer();
    }, [])

  const dettagliCandidato = [
    {
        id: 1,
        imgPersona: imageAzienda ,
        nome: 'Lucia Frinzi',
        città: 'Roma',
        ruolo: 'Startup business manager',
        competenze: 2,
        allegati: 2,
        titoloStudio: 1,
        link: '/dashboard/annuncioId/candidati/profiloId'
    },
    {
        id: 2,
        imgPersona: imageAzienda ,
        nome: 'Lucia Frinzi',
        città: 'Roma',
        ruolo: 'Startup business manager',
        competenze: 2,
        allegati: 2,
        titoloStudio: 1,
        link: '/dashboard/annuncioId/candidati/profiloId'
    },
    {
        id: 3,
        imgPersona: imageAzienda ,
        nome: 'Lucia Frinzi',
        città: 'Roma',
        ruolo: 'Startup business manager',
        competenze: 2,
        allegati: 2,
        titoloStudio: 1,
        link: '/dashboard/annuncioId/candidati/profiloId'
    },
  ]

  return (
    <div className='candidatiAnnuncio'>
      <HeaderAziendaWhiteLogin />
      <div className='dettagli-annuncio-container'>
            <h3>Le persone interessate al tuo annuncio</h3>
            <div style={{display:'flex', flexDirection: 'column', gap: 30}}>
              {offer && offer.map((candidato) => (
                  <DettagliCandidatoContainer
                  key={candidato.id}
                  id={candidato.id}
                  img={candidato.imgPersona ? candidato.imgPersona : null}
                  nome={candidato.nome}
                  cognome={candidato.cognome}
                  città={candidato.city}
                  ruolo={candidato.ruolo}
                  competenze={candidato.competenze}
                  titoloStudio={candidato.titoloStudio ? candidato.titoloStudio : ''}
                  allegati={candidato.allegati ? candidato.allegati : 0}
                  link={`/dashboard/${id}/candidati/${candidato.id}`}
           />
              ))}
            </div>
        </div>
    </div>
  )
}

export default CandidatiAnnunci