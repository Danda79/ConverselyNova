import React from 'react'
import { HeaderChoose } from '../components/Header'
import { FaArrowRight } from 'react-icons/fa'

const ChoosePage = () => {
  return (
    <div className='choose-page' style={{width: '100%'}}>
        <HeaderChoose />
        <div 
        style={{display:'flex', width: '100%', flexWrap: 'wrap'}}>
            <div style={{height: '100vh',width: '50%', backgroundColor: '#182568', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <h2>Azienda?</h2>
                <a style={{textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}} href='/homeAzienda'>Vai alla sezione <FaArrowRight /></a>
            </div>
            <div style={{height: '100vh', width: '50%', backgroundColor: '#F75F24', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <h2>Candidato?</h2>
                <a style={{textDecoration: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}} href='/'>Vai alla sezione <FaArrowRight /></a>
            </div> 
        </div>

    </div>
  )
}

export default ChoosePage