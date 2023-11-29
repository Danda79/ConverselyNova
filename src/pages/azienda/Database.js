import React, {useState, useEffect} from 'react'
import { HeaderAziendaWhiteLogin } from '../../components/Header'
import { DatabaseContainer, DettagliCandidatoContainer } from '../../components/DettagliCandidato'
import imageAzienda from '../../assets/images/Ellipse 3.png';
import axios from 'axios';
import apiList from '../../components/apiList';
import '../../assets/stylePages/database.css';
import toast from 'react-hot-toast';

const Database = () => {

  const token = localStorage.getItem("token");
  const [worker, setWorker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [premium, setPremium] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const handleGetAgency = () => {
    axios.post(apiList.getAgency, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      const agency = response.data;
      console.log(agency);
      setPremium(agency.premium);
      setCanceled(agency.canceled);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    });
};

const cancelPremium = () => {
  axios.post(apiList.cancelSubscribe, null, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })
}

  const handleGetOffer = () => {
    axios.post(apiList.getAllWorkers, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      const worker = response.data.list;
      console.log(worker);
      setWorker(worker)
    })
    .catch(error => {
      console.log(error);
    });
};

    useEffect(() => {
      setIsLoading(true)
      handleGetAgency();
      handleGetOffer();
    }, []);

    const handleGetSub = () => {
      axios.post(apiList.subscribe, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        window.open(response.data.payment_url);
      })
      .catch(error => {
        console.log(error);
      })
    };

    const cancelSub = () => {
      axios.post(apiList.cancelSubscribe, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message == 'ok'){
          toast.success('Abbonamento annullato');
        }
        //window.open(response.data.payment_url);
      })
      .catch(error => {
        console.log(error);
      })
    }

  return (
    <>
    {isLoading ? (
      <div>...</div>
    ) : (
    <div className='candidatiAnnuncio'>
      <HeaderAziendaWhiteLogin />
      <div className='dettagli-annuncio-container' style={{position: 'relative'}}>
            <h3>Database</h3>
            {premium && canceled == false ? 
            <button onClick={cancelSub} className='cancel-sub'>Annulla iscrizione</button> 
            : 
            premium && canceled == true ?
            <button className='cancel-sub'>Abbonamento cancellato, rimarrai dentro la pagina fino alla <br />scadenza del prossimo rinnovo</button>
            : 
            null
          }
            <>
            {premium == true ? (
              <div style={{display:'flex', flexDirection: 'column', gap: 30}}>
                {worker && worker.map((candidato) => (
                    <DatabaseContainer
                    key={candidato.id}
                    id={candidato.id}
                    img={candidato.imgPersona ? candidato.imgPersona : null}
                    nome={candidato.nome}
                    cognome={candidato.cognome}
                    città={candidato.city}
                    ruolo={candidato.ruolo ? candidato.ruolo : ''}
                    competenze={candidato.competenze}
                    titoloStudio={candidato.titoloStudio ? candidato.titoloStudio : ''}
                    allegati={candidato.allegati}
                    link={`/database/candidati/${candidato.id}`}
            />
                ))}
              </div>
            ) : (
              <div className='popup-premium'>
                <h2>Non hai l'abbonamento</h2>
                <p>Per poter vedere tutti gli utenti iscritti alla piattaforma devi effettuare l'iscrizione al premium</p>
                <button onClick={handleGetSub}>Abbonati</button>
              </div>
            )}
            </>

        </div>
    </div>
    )}
    </>

  )
}

export default Database