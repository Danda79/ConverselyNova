import React from 'react'
import { HeaderAziendaWhiteLogin } from '../../components/Header'
import '../../assets/stylePages/cerca.css';
import {DettagliAnnunciContainerAzienda} from '../../components/DettagliAnnunciContainer';
import imageAzienda from '../../assets/images/Ellipse 1.png';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

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


const DettagliAnnunciTuoi = () => {
  const location = useLocation();
  const {dettagliAnnuncio} = location.state;
  console.log(dettagliAnnuncio);

  const createdAt = dettagliAnnuncio.creatoIl;
  const now = moment();
  const daysAgo = now.diff(createdAt, 'days');
  const formattedDate = `${daysAgo} giorni fa`;

  const stringaBenefit = dettagliAnnuncio.benefits.join(', ');
  const stringaCompetenze = dettagliAnnuncio?.competenze ? dettagliAnnuncio?.competenze?.join(', ') : dettagliAnnuncio.skills?.join(', ') ;
  return (
    <div className='dettagli-annuncio'>
        <HeaderAziendaWhiteLogin />
        <div className='dettagli-annuncio-container'>
            <h3>Dettagli della posizione</h3>
            <div className='dettagli-annunci'>
                {dettagliAnnuncio && 
                <DettagliAnnunciContainerAzienda
                        id={dettagliAnnuncio?.id}
                        img={'https://converselybackend-production.up.railway.app'+dettagliAnnuncio?.azienda?.logo}
                        nomeAzienda={dettagliAnnuncio?.azienda.nome}
                        città={dettagliAnnuncio?.city}
                        ruolo={dettagliAnnuncio?.titolo}
                        desc={dettagliAnnuncio?.descrizione}
                        salario={dettagliAnnuncio?.ranger}
                        salarioMin={dettagliAnnuncio?.rangel}
                        tempistica={dettagliAnnuncio?.tempoLavoro}
                        quando={formattedDate && formattedDate}
                        benefit={stringaBenefit && stringaBenefit}
                        mansioni={dettagliAnnuncio?.mansioni}
                        competenze={stringaCompetenze && stringaCompetenze}
                        esperienza={dettagliAnnuncio?.esperienza}
                        titoloStudio={dettagliAnnuncio?.studio}
                        contratto={dettagliAnnuncio?.contratto}
                 />}
            </div>
        </div>
    </div>
  )
}

export default DettagliAnnunciTuoi