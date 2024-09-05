import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GarageEdit = ({ uuid }) => {
  const [formData, setFormData] = useState({
    district: '',
    street: '',
    description: '',
    price: '',
    idEmployee: '',
    locality: '',
    typeSale: '',
    garageCapacity: '',
    haveBasement: false,
    latitude: null,
    longitude: null,
    isActual: true
  });

  const [localities, setLocalities] = useState([]);
  const [typeSales, setTypeSales] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesRes = await axios.get('https://localhost:44329/api/v1.2/Teams/Short');
        const localitiesRes = await axios.get('https://localhost:44329/api/v1.2/Localities');
        const typeSalesRes = await axios.get('https://localhost:44329/api/v1.2/TypeSales');
        setEmployees(employeesRes.data);
        setLocalities(localitiesRes.data);
        setTypeSales(typeSalesRes.data);

        // Fetch garage data by UUID
        const garageRes = await axios.get(`https://localhost:44329/api/v1.2/Garage/${uuid}`);
        const garageData = garageRes.data;
        setFormData(garageData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [uuid]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'isActual' || name === 'haveBasement') {
      setFormData({
        ...formData,
        [name]: e.target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = Cookies.get('jwt'); // Получаем токен из куков

    try {
      const res = await axios.put(`https://localhost:44329/api/v1.2/Garage`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data);
      if (res.status === 204)
        alert("Гараж успешно изменен!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Изменение гаража</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Район:
          <input type="text" name="district" value={formData.district} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Улица:
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Описание:
          <textarea type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Цена:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Работник:
          <Select
            name="employeeId"
            options={employees.map(emp => ({ value: emp.idEmployee, label: emp.fullName }))}
            onChange={handleSelectChange}
            value={{ value: formData.idEmployee, label: formData.fullName }}
            selectedOption={employees.find(emp => emp.idEmployee === formData.idEmployee )}
            required
          />
        </label>
        <br />
        <label>
          Населённый пункт:
          <Select
            name="locality"
            options={localities.map(loc => ({ value: loc, label: loc }))}
            onChange={handleSelectChange}
            value={{ value: formData.locality, label: formData.locality }}
            required
          />
        </label>
        <br />
        <label>
          Тип продажи:
          <Select
            name="typeSale"
            options={typeSales.map(type => ({ value: type, label: type }))}
            onChange={handleSelectChange}
            value={{ value: formData.typeSale, label: formData.typeSale }}
            required
          />
        </label>
        <br />
        <label>
          Вместимость гаража:
          <input type="number" name="garageCapacity" value={formData.garageCapacity} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Подвал:
          <input type="checkbox" name="haveBasement" checked={formData.haveBasement} onChange={handleChange} />
        </label>
        <br />
        <label>
          Широта:
          <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Долгота:
          <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Актуален:
          <input type="checkbox" name="isActual" checked={formData.isActual} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Изменить</button>
      </form>
      <LoadScript googleMapsApiKey="AIzaSyAjBMItZHJYt-9NE5GWTjwr3Nrgybd84vc">
        <GoogleMap
          mapContainerStyle={{ width: '400px', height: '400px' }}
          center={{ lat: formData.latitude || 0, lng: formData.longitude || 0 }}
          zoom={10}
        >
          {formData.latitude && formData.longitude && (
            <Marker position={{ lat: formData.latitude, lng: formData.longitude }} />
          )}
        </GoogleMap>
      </LoadScript>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default GarageEdit;
