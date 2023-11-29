import React, {useState, useEffect} from 'react'
import { HeaderAziendaWhiteLogin } from '../../components/Header'
import '../../assets/stylePages/gestioneProfili.css';
import apiList from '../../components/apiList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import it from 'date-fns/locale/it';
import toast from 'react-hot-toast';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const GestioneProfili = () => {
    const token = localStorage.getItem("token");
    const [proDis, setProDis] = useState([]);
    const [proInt, setProInt] = useState([]);
    const [proStand, setProStand] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('interviews');
    const [selectWorker, setSelectWorker] = useState(null);
    const [selectWork, setSelectWork] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleTodayClick = () => {
      setSelectedDate(new Date());
    };

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
    
    const handleGetInterviews = () => {
      axios.post(apiList.getInterview, null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      .then(response => {
        const profile = response.data;
        console.log(profile);
        setProInt(profile.interview);
        setProDis(profile.discarded);
        setProStand(profile.standby)
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    setIsLoading(true);
    handleGetInterviews();
  }, []);
  console.log(proInt);

  const selectedProfileArray = () => {
    switch (selectedOption) {
      case 'interviews':
        return proInt;
      case 'standby':
        return proStand;
      case 'discarded':
        return proDis;
      default:
        return [];
    }
  };

  const profilesToShow = selectedProfileArray();

  const handleSetDate = (id) => {
    const isoDate = new Date(selectedDate);
    const formattedDate = isoDate.toISOString().split('T')[0];
    if(isoDate){
          axios.post(apiList.setInterviewDate, {date: formattedDate, id:id}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      console.log(response);
      toast.success('Data assegnata correttamente');
      setSelectWork(false);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    })
    }

  };

  const handleSelectWork = () => {
    if(selectWork == true){
      setSelectWork(false)
    } else {
      setSelectWork(true);
    }
  }

  return (
    <>
    {isLoading ? (
        <div>...</div>
    ) : (
    <div className='candidatiAnnuncio'>
      <HeaderAziendaWhiteLogin />
      <div className='gestione-profili-container'>
        <div className='left-gestione-profili'>
            <select value={selectedOption} onChange={handleChange}>
                <option value="interviews">Profili da colloquiare</option>
                <option value="standby">Profili standby</option>
                <option value="discarded">Profili scartati</option>
            </select>

            <div>
            {profilesToShow && profilesToShow.map((pro) => {
                return (
                <Link to={`/gestione-profili/candidati/${pro.profile.id}`} className='scheda-profili-item' key={pro.profile.id}>
                    <p>{pro.profile.nome + ' ' + pro.profile.cognome}</p>
                    <span>|</span>
                    {pro.date && pro.date !== null && <p>{pro.date}</p>}
                </Link>
                );
            })}
        </div>
        </div>
        <div className='right-gestione-profili' style={{position: 'relative'}}>
        <CustomInput handleSelectWork={handleSelectWork} value={moment(selectedDate).format('YYYY-MM-GG')} />
            <Calendar 
                onChange={(date) => {
                  handleDateChange(date);
            }} 
            className="custom-calendar" 
            value={selectedDate} />
          {selectWork && (
            <div className='select-users'>
              <select onChange={(e) => handleSetDate(e.target.value)}>
              <option value="">Seleziona un utente</option>
              {profilesToShow && profilesToShow.map((user) => (
                <option key={user.profile.id} value={user.profile.id}>
                  {user.profile.nome + ' ' + user.profile.cognome}
                </option>
              ))}
            </select>
          </div>
          )}
        </div>
      </div>
   </div> 
    )}
    </>

  )
};

function CustomInput({ value, handleSelectWork }) {
  return (
    <>
    <h3>Clicca sul bottone per scegliere l'utente da colloquiare in questa data</h3>
    <button style={{marginTop: '50px'}} className="custom-input" onClick={handleSelectWork}>
      {value}
    </button>
    </>

  );
}

export default GestioneProfili