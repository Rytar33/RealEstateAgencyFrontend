import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../footer/footer";
import Header from "../../header/header";
import Cookies from 'js-cookie';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    numberPhone: '',
    file: null
  });

  const [jobTitles, setJobTitles] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const token = Cookies.get('jwt');
        const res = await axios.get('https://localhost:44329/api/v1.2/JobTitles', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setJobTitles(res.data);
      } catch (err) {
        console.error('Error fetching job titles:', err);
      }
    };

    fetchJobTitles();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
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

    const token = Cookies.get('jwt'); // Получаем токен из куков

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('jobTitle', formData.jobTitle);
    data.append('numberPhone', formData.numberPhone);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const res = await axios.post('https://localhost:44329/api/v1.2/team', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data);
      if (res.status === 201)
        alert("Работник успешно создан!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='wrapper'>
      <Header/>
      <h2>Создание работника</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Почта:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          ФИО:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Должность:
          <select name="jobTitle" value={formData.jobTitle} onChange={handleChange} required>
            <option value="">Select Job Title</option>
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Номер телефона:
          <input type="text" name="numberPhone" value={formData.numberPhone} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Изображение:
          <input type="file" name="file" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Создать</button>
      </form>
      {error && <div>Error: {error}</div>}
      <Footer/>
    </div>
  );
};

export default CreateEmployee;
