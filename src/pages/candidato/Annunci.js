import React, {useContext, useState, useEffect} from 'react'
import { HeaderCandidatoWhite } from '../../components/Header'
import '../../assets/stylePages/cerca.css';
import imageAzienda from '../../assets/images/Ellipse 1.png';
import AnnunciContainer from '../../components/AnnunciContainer';
import moment from 'moment';
import { Link } from 'react-router-dom';
import isAuth from '../../components/isAuth';

const Annunci = () => {
    const [annunciCercati, setAnnunciCercati] = useState([]);
    const userRole = localStorage.getItem("role");
    useEffect(() => {
        const annunci = JSON.parse(localStorage.getItem('annunci'));
        setAnnunciCercati(annunci);
      }, []);

      console.log(annunciCercati);

  return (
    <div>
        <HeaderCandidatoWhite />
        <div className='cerca-container'>
            <h3>Ecco i tuoi risultati</h3>
            <div className='annunci'>
                {annunciCercati && annunciCercati.map((annunci) => {
                    const createdAt = annunci.creatoIl;
                    const now = moment();
                    const daysAgo = now.diff(createdAt, 'days');
                    const formattedDate = `${daysAgo} giorni fa`;
                    return (
                    <Link 
                    to={isAuth() ? `/dettagli-annuncio/${annunci.id}` : '/registrati'} style={{textDecoration: 'none', color: 'black'}} onClick={() => localStorage.setItem('idCliccato', annunci.id )}>
                    <AnnunciContainer
                    key={annunci.id}
                    img={'https://converselybackend-production.up.railway.app'+annunci.azienda.logo}
                    nomeAzienda={annunci.azienda.nome}
                    città={annunci.city}
                    ruolo={annunci.titolo}
                    desc={annunci.descrizione}
                    salario={annunci.ranger}
                    salarioMin={annunci.rangel}
                    tempistica={annunci.tempoLavoro}
                    quando={formattedDate}
                     />
                     </Link>
                )
                }
                )}
            </div>
        </div>
    </div>
  )
}

export default Annunci