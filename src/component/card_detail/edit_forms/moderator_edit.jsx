import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Footer from "../../footer/footer";
import Header from "../../header/header";

function ModeratorEdit() {
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [moderatorId, setModeratorId] = useState('');
  const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isSuperModerator: false
      });

      const [error, setError] = useState(null);
    
      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const uuidParam = params.get('uuid');
        if (uuidParam) {
          setUuid(uuidParam);
        }
      }, [location.search]);
    
      useEffect(() => {
        const fetchModerator = async () => {
          try {
            const token = Cookies.get('jwt');
            const res = await axios.get(`https://localhost:44329/api/v1.2/Moderator/${uuid}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            const moderatorData = res.data;
            setModeratorId(moderatorData.id);
            setFormData({
              ...moderatorData,
              id: moderatorData.id
            });
          } catch (err) {
            console.error('Error fetching employee data:', err);
          }
        };
    
        if (uuid) {
          fetchModerator();
        }
      }, [uuid]);


      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isSuperModerator') {
          setFormData({
            ...formData,
            isSuperModerator: e.target.checked
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
          const res = await axios.put('https://localhost:44329/api/v1.2/Moderator', formData, {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
          });
          if (res.status === 204)
            alert("Модератор успешно изменён!");
        } catch (err) {
          setError(err.message);
        }
      };
    
      return (
        <div className='wrapper'>
            <Header/>
          <h2>Изменение модератора</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Имя:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Почта:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Новый пароль:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Главный модератор:
              <input type="checkbox" name="isSuperModerator" checked={formData.isSuperModerator} onChange={handleChange} required />
            </label>
            <br />
            <input type="hidden" name="id" value={moderatorId} />
            <button type="submit">Изменить</button>
          </form>
          {error && <div>Error: {error}</div>}
          <Footer/>
        </div>
      );
}

export default ModeratorEdit