import React, { useState, useContext, useEffect } from 'react'
import {HeaderCandidato, HeaderCandidatoWhite} from '../components/Header';
import '../assets/stylePages/home.css';
import fotoHome from '../assets/images/visual 1.png';
import { FaSearch, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import apiList from '../components/apiList';
import { Navigate } from 'react-router-dom';
import isAuth from '../components/isAuth';

const Home = () => {

  const [query, setJobTitle] = useState("");
  const [city, setJobLocation] = useState("");
  const token = localStorage.getItem("token");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [loggedin, setLoggedin] = useState(isAuth());

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleJobLocationChange = (event) => {
    setJobLocation(event.target.value);
  };

  let searchDetail = {
    city,
    query,
  }

  const handleGetprofile = () => {
    axios.post(apiList.getWorker, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      const profile = response.data;
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("profile", JSON.stringify(profile));
    })
    .catch(error => {
      console.log(error);
    });
}

useEffect(() => {
  if(token) {
    handleGetprofile();
  }
}, [])

  const handleSubmit = () => {
    console.log(searchDetail);
    const handleSearchJob = () => {
        axios.post(apiList.searchJob, searchDetail, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
        .then(response => {
            const job = response.data.list;
            console.log(response.data.list);
            localStorage.setItem('annunci', JSON.stringify(job));
            setShouldNavigate(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
    handleSearchJob();
    // Aggiungi qui la logica per la ricerca effettiva
  };

  return shouldNavigate ? (
    <Navigate to="/cerca" />
  ) : (
    <div className='home'>
        <HeaderCandidato />
        <div className='main'>
          <div className='left-home'>
            <h1>Trovare lavoro è un gioco!</h1>
            <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.</p>
              <form className="search-container" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="jobTitleInput">
                    <FaSearch color='#C4C4C4' />
                  </label>
                  <input
                    type="text"
                    id="jobTitleInput"
                    placeholder="Che lavoro cerchi?"
                    value={query}
                    onChange={handleJobTitleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobLocationInput">
                    <FaMapMarkerAlt color='#C4C4C4' />
                  </label>
                  <input
                    type="text"
                    id="jobLocationInput"
                    placeholder="Dove stai cercando?"
                    value={city}
                    onChange={handleJobLocationChange}
                  />
                </div>
                <a className='search-button' type="submit" onClick={handleSubmit}>
                  TROVA LAVORO <span><FaArrowRight color='#FFFFFF' /></span>
                </a>
              </form>
          </div>
          <div className='right-home'>
            <img alt='foto-home-conversely-cerca-lavoro' src={fotoHome} />
          </div>
        </div>
    </div>
  )
}

export default Home