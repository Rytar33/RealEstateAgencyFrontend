import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Header from '../../header/header';
import Footer from '../../footer/footer';

const EditEmployee = () => {
  const location = useLocation();
  const [uuid, setUuid] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    fullName: '',
    jobTitle: '',
    numberPhone: ''
  });
  const [jobTitles, setJobTitles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uuidParam = params.get('uuid');
    if (uuidParam) {
      setUuid(uuidParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = Cookies.get('jwt');
        const res = await axios.get(`https://localhost:44329/api/v1.2/Team/${uuid}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const employeeData = res.data;
        setEmployeeId(employeeData.id);
        setFormData({
          ...employeeData,
          id: employeeData.id
        });
      } catch (err) {
        console.error('Error fetching employee data:', err);
      }
    };

    const fetchJobTitles = async () => {
      try {
        const token = Cookies.get('jwt');
        const res = await axios.get('https://localhost:44329/api/v1.2/jobTitles', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setJobTitles(res.data);
      } catch (err) {
        console.error('Error fetching job titles:', err);
      }
    };

    if (uuid) {
      fetchEmployee();
      fetchJobTitles();
    }
  }, [uuid]);

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

    const token = Cookies.get('jwt'); // Получаем токен из куков

    try {
      const { fullPathFile, ...dataToSend } = formData;
      const res = await axios.put(`https://localhost:44329/api/v1.2/Team`, dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 204)
        alert("Работник успешно изменен!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='wrapper'>
      <Header/>
      <h2>Изменение работника</h2>
      <form onSubmit={handleSubmit}>
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
            {jobTitles.map(jobTitle => (
              <option key={jobTitle} value={jobTitle}>{jobTitle}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Номер телефона:
          <input type="text" name="numberPhone" value={formData.numberPhone} onChange={handleChange} required />
        </label>
        <br />
        <input type="hidden" name="id" value={employeeId} />
        <button type="submit">Изменить</button>
      </form>
      {error && <div>Error: {error}</div>}
      <Footer/>
    </div>
  );
};

export default EditEmployee;
