import React, {useState, useEffect, useContext} from 'react'
import { HeaderCandidatoWhite } from '../../components/Header'
import '../../assets/stylePages/profilo.css'
import ProfileContainer from '../../components/ProfileContainer'
import axios from 'axios'
import apiList from '../../components/apiList'
const Profilo = () => {

  const token = localStorage.getItem("token")


  return (
    <div className='profilo'>
      <HeaderCandidatoWhite />
      <div className='profile-container'>
        <ProfileContainer />
      </div>
    </div>
  )
}

export default Profilo