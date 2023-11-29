import React, {useState, useEffect} from 'react'
import cuore from '../assets/images/heart-icon.png'
import document from '../assets/images/document-icon.png'
import candidatura from '../assets/images/candidature-icon.png'
import gioca from '../assets/images/gioca-icon.png';
import scarica from '../assets/images/download-icon.png';
import { useParams } from 'react-router-dom';
import apiList from './apiList';
import axios from 'axios';
import toast from 'react-hot-toast';

const dataProfilo = {
    nomeUtente:'Lucia Frinzi',
    ruoloUtente: 'project manager',
    città: 'Milano, italia',
    offerteSalvate: '12',
    candidatureInoltrate:'5',
    documentiCaricati: '3',
    linkedinUrl: 'linkedin.com/in/luciaFrinzi',
    anniEsperienza: '3',
    competenze: [
      'Adobe Premiere',
      'Adobe Premiere',
      'Adobe Premiere',
      'Adobe Premiere'
    ],
    votoEmpatia: 'A-',
    votoStress: 'B',
    votoProblem: 'C',
    votoOrg: 'C-',
    votoPro: 'B+',
}


const ProfileContainerAzienda = () => {
    const {id} = useParams();
    const token = localStorage.getItem("token");
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    const handleGetprofile = () => {
      axios.post(apiList.getWorker, {id:id}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      .then(response => {
        const profile = response.data;
        console.log(profile);
        setProfile(profile);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    setIsLoading(true);
    handleGetprofile();
  }, []);

  const handleSetWorker = (status) => {
    axios.post(apiList.setWorkerStatus, {id:id, type: status}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  .then(response => {
    console.log(response);
    toast.success('Hai cambiato lo stato in:  '+ status);
    window.alert('Hai cambiato lo stato in:  '+ status);
  })
  .catch(error => {
    console.log(error);
  });
  }

  return (
    <>
    {isLoading ? (
      <div className='loading-page'>
        ...
      </div>
    ) : (
    <div>
        <div className='profilo-top-item'>
           <div className='left-top'>
             <div className='round-top-a'>
               <p>{profile.nome.charAt(0) + profile.cognome.charAt(0)}</p>
             </div>
             <div className='name-top'>
               <h4>{profile.nome + ' ' + profile.cognome}</h4>
               <p>{dataProfilo.ruoloUtente}</p>
               <p>{profile.city}</p>
             </div>
           </div>
           <div className='right-top'>
            {profile.linkedin == "Non impostato" ? <a>Linkedin Non impostato</a> : <a href={profile.linkedin}>Linkedin</a>}
            <button onClick={() => handleSetWorker('interview')}>Colloquia</button>
            <button onClick={() => handleSetWorker('standby')}>Standby</button>
            <button onClick={() => handleSetWorker('discarded')}>Scarta</button>
           </div>
         </div>
         <div className='profilo-middle-item'>
           <div className='profilo-item'>
             <img src={scarica} alt='profilo-icone' className='img-icon-profilo' />
               <a href={profile.cv !== "Non caricato" ? 'https://converselybackend-production.up.railway.app'+profile.cv : null} className='pdf-download'>
                <div>
                    <p>Download</p>
                    <p>Curricula</p>
                </div>
              </a>
           </div>
           <div className='profilo-item'>
             <img src={scarica} alt='profilo-icone' className='img-icon-profilo' />
             {profile.portfolio == "Non caricato" ? (
              <div>
                <p>Non caricato</p>
                <p>Portfolio</p>
            </div>
             ) : (
             <a href={profile.portfolio !== "Non caricato" ? 'https://converselybackend-production.up.railway.app'+profile.portfolio : null} className='pdf-download'>
                <div>
                    <p>Download</p>
                    <p>Portfolio</p>
                </div>
             </a>
             )}

           </div>
           <div className='profilo-item'>
             <img src={document} alt='profilo-icone' className='img-icon-profilo' />
             <div>
               <p>Altri documenti caricati</p>
               <p>{profile.allegati}</p>
             </div>
           </div>
         </div>
        <div className='profilo-bottom-item'>
            <div className='profilo-item-competenze-a profile-scroll'>
            <h4>Competenze</h4>
            {profile.competenze && profile.competenze.length ? profile.competenze.map((competenza) => (
                <div>
                    <div></div>  
                    <p>{competenza}</p>
                </div>
            )) : (
              <div>
                <div></div>  
                <p>Nessuna competenza</p>
              </div>
            )}
            </div>
            <div className='profilo-item-play-a'>
                <div className='item-play'>
                    <p>Soft skill</p>
                    <div>

                    </div>
                </div>
                <div className='item-play'>
                    <ul>
                        <li>Empatia: <span>{dataProfilo.votoEmpatia}</span></li>
                        <li>Gestione dello stress: <span>{dataProfilo.votoStress}</span></li>
                        <li>Problem solving: <span>{dataProfilo.votoProblem}</span></li>
                        <li>Organizzazione: <span>{dataProfilo.votoOrg}</span></li>
                        <li>Proattività: <span>{dataProfilo.votoPro}</span></li>
                    </ul>
                </div>
            </div>
        </div>
     </div>
    )}
    </>
    
    
  )
}

export default ProfileContainerAzienda