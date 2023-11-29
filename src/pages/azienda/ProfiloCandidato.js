import React from 'react'
import { HeaderAziendaWhiteLogin } from '../../components/Header'
import ProfileContainerAzienda from '../../components/ProfileContainerAzienda'

const ProfiloCandidato = () => {
  return (
    <div>
        <HeaderAziendaWhiteLogin />
        <div className='profile-container'>
          <ProfileContainerAzienda />
        </div>
    </div>
  )
}

export default ProfiloCandidato