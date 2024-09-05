import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Cookies from 'js-cookie';
import Footer from "../../footer/footer";
import Header from "../../header/header";

function ModeratorCreate() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });

      const [error, setError] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
          const res = await axios.post('https://localhost:44329/api/v1.2/Moderator', formData, {
            headers: {
                "Authorization": `Bearer ${Cookies.get('jwt')}`
            }
          });
          if (res.status === 201)
            alert("Модератор успешно создан!");
        } catch (err) {
          setError(err.message);
        }
      };
    
      return (
        <div className='wrapper'>
            <Header/>
          <h2>Регистрация модератора</h2>
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
              Пароль:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <br />
            <button type="submit">Создать</button>
          </form>
          {error && <div>Error: {error}</div>}
          <Footer/>
        </div>
      );
}

export default ModeratorCreate