import React from 'react'
import { HeaderAzienda } from '../components/Header'
import '../assets/stylePages/home.css';
import fotoHomeAzienda from '../assets/images/visual 2.png';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomeAzienda = () => {
  return (
    <div className='home-azienda'>
        <HeaderAzienda />
        <div className='main'>
          <div className='left-home'>
            <h1>Trovare collaboratori è un gioco!</h1>
            <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.</p>
            <Link to={'/accediAzienda'} className='login-button'>
                    LOG IN <span><FaArrowRight color='#FFFFFF' /></span>
            </Link>
          </div>
          <div className='right-home'>
            <img alt='foto-home-conversely-cerca-lavoro' src={fotoHomeAzienda} />
          </div>
        </div>
    </div>
  )
}

export default HomeAzienda