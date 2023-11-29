import React, {useState, useContext} from 'react';
import '../assets/styleComponents/header.css';
import logo from '../assets/images/Conversely_logo-05.png'
import { Link } from 'react-router-dom';
import homeIcon from '../assets/images/icons/Icon-home.png';
import homeIconOrange from '../assets/images/icons/Icon-home-orange.png';
import homeIconBlue from '../assets/images/icons/Icon-home-blu.png';
import userIcon from '../assets/images/icons/Icon-user.png';
import logo2 from '../assets/images/Conversely_logo-03.png';
import logo3 from '../assets/images/Conversely_logo-02.png';
import isAuth from './isAuth';
import axios from 'axios';
import apiList from './apiList';
import { SetPopupContext } from '../App';
import {useNavigate} from 'react-router-dom'

export const HeaderCandidato = () => {
  const history = useNavigate();
  const [loggedin, setLoggedin] = useState(isAuth());
  const setPopup = useContext(SetPopupContext);
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
    .post(apiList.logout, null, {
      headers: {
        Authorization: `Token ${token}`,
      },})
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setPopup({
        open: true,
        severity: "success",
        message: "Logout con successo",
      });
      console.log(response);
      history("/");
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
    });
  };

  const navigateChoose = () => {
    history("/choose");
  };
  return (
    <div className='header'>
        <div onClick={navigateChoose} className='left-header'>
            <img alt='logo-conversely' src={logo} />
        </div>
        <div className='right-header'>
          {loggedin && userRole == 'worker' ? 
          <>
            <Link to={'/profilo'} className='reg-button'>
              Profilo
             </Link>
            <Link className='acc-button' onClick={handleLogout}>
                 Logout
             </Link>
             <Link to={'/'}>
                <img className='icon-home' alt='icon-home' src={homeIcon} />
            </Link>
             </>
           :
            <>
            <Link to={'/registrati'} className='reg-button'>
              Registrati
            </Link>
            <Link to={'/accedi'} className='acc-button'>
                    <span><img alt='icon-home' src={userIcon} /></span>
                    Accedi
            </Link>
            <Link to={'/'}>
                <img className='icon-home' alt='icon-home' src={homeIcon} />
            </Link>
            {/*<Link to={'/homeAzienda'} className='azienda-button'>
                      Sei un azienda?
  </Link>*/}
            </>
           }
        </div>
    </div>
  )
}

export const HeaderAzienda = () => {
  const history = useNavigate();
  const [loggedin, setLoggedin] = useState(isAuth());
  const setPopup = useContext(SetPopupContext);
  const userRole = localStorage.getItem("role");

  const navigateChoose = () => {
    history("/choose");
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
    .post(apiList.logout, null, {
      headers: {
        Authorization: `Token ${token}`,
      },})
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setPopup({
        open: true,
        severity: "success",
        message: "Logout con successo",
      });
      console.log(response);
      history("/homeAzienda");
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
    });
  }
    return (
      <div className='header-azienda'>
          <div onClick={navigateChoose} className='left-header'>
              <img alt='logo-conversely' src={logo} />
          </div>
          <div className='right-header'>
          {loggedin && userRole == 'agency' ? 
          <>
            <Link to={'/dashboard'} className='reg-button'>
              Dashboard
             </Link>
            <Link className='acc-button' onClick={handleLogout}>
                 Logout
             </Link>
             <Link to={'/'}>
                <img className='icon-home' alt='icon-home' src={homeIcon} />
            </Link>
             </>
           :
            <>
              <Link to={'/registratiAzienda'} className='reg-button'>
                      Registrati
              </Link>
              <Link to={'/accediAzienda'} className='acc-button'>
                      <span><img alt='icon-home' src={userIcon} /></span>
                      Accedi
              </Link>
              <Link to={'/homeAzienda'}>
                  <img className='icon-home' alt='icon-home' src={homeIcon} />
              </Link>
            </>
           }
          </div>
      </div>
    )
  }

export const HeaderCandidatoWhite = () => {
  const history = useNavigate();
  const [loggedin, setLoggedin] = useState(isAuth());
  const setPopup = useContext(SetPopupContext);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
    .post(apiList.logout, null, {
      headers: {
        Authorization: `Token ${token}`,
      },})
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setPopup({
        open: true,
        severity: "success",
        message: "Logout con successo",
      });
      console.log(response);
      history("/");
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
    });
  }
    return (
      <div className='header-white'>
          <div className='left-header-white'>
              <img alt='logo-conversely' src={logo2} />
          </div>
          <div className='right-header-white'>
          {loggedin ? 
          <>
            <Link to={'/profilo'} className='reg-button' style={{color:"#F75F24", border:'1px solid #F75F24'}}>
              Profilo
             </Link>
            <Link className='acc-button' onClick={handleLogout} style={{color:"#F75F24"}}>
                 Logout
             </Link>
             <Link to={'/'}>
                <img className='icon-home' alt='icon-home' src={homeIconOrange} />
            </Link>
             </>
           :
            <>
              <Link to={'/'}>
                  <img className='icon-home' alt='icon-home' src={homeIconOrange} />
              </Link>
            </>
           }
          </div>
      </div>
    )
  } 

  export const HeaderAziendaWhite = () => {
    const history = useNavigate();
    const [loggedin, setLoggedin] = useState(isAuth());
  const setPopup = useContext(SetPopupContext);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
    .post(apiList.logout, null, {
      headers: {
        Authorization: `Token ${token}`,
      },})
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setPopup({
        open: true,
        severity: "success",
        message: "Logout con successo",
      });
      console.log(response);
      history("/");
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
    });
  }
    return (
      <div className='header-white'>
          <div className='left-header-white'>
              <img alt='logo-conversely' src={logo3} />
          </div>
          <div className='right-header-white'>
              <Link to={'/homeAzienda'}>
                  <img className='icon-home' alt='icon-home' src={homeIconBlue} />
              </Link>
          </div>
      </div>
    )
  } 

  export const HeaderAziendaWhiteLogin = () => {
    const history = useNavigate();
    const [loggedin, setLoggedin] = useState(isAuth());
  const setPopup = useContext(SetPopupContext);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
    .post(apiList.logout, null, {
      headers: {
        Authorization: `Token ${token}`,
      },})
    .then((response) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setPopup({
        open: true,
        severity: "success",
        message: "Logout con successo",
      });
      console.log(response);
      history("/");
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
    });
  }
    return (
      <div className='header-white'>
          <div className='left-header-white-azienda mobile-head-az'>
              <img alt='logo-conversely' src={logo3} />
              <Link to={'/dashboard'} className='link-header-azienda'>
                Dashboard
              </Link>
              <Link to={'/database'} className='link-header-azienda'>
                Database
              </Link>
              <Link to={'/gestione-profili'} className='link-header-azienda'>
                Gestione profili
              </Link>
          </div>
          <div className='right-header-white-azienda mobile-head-az'>
              <a href='/creaAnnuncio' className='button header-button'>Crea annuncio</a>             
              <Link to={'/homeAzienda'}>
                  <img className='icon-home' alt='icon-home' src={homeIconBlue} />
              </Link>
              <Link className='link-header-azienda' onClick={handleLogout}>
                 Logout
             </Link>
          </div>
      </div>
    )
  }
  
  
  export const HeaderChoose = () => {
  
    return (
      <div className='header-white'>
          <div className='left-header-white'>
              <img alt='logo-conversely' src={logo3} />
          </div>
          <div className='right-header'>

          </div>
      </div>
    )
  }
