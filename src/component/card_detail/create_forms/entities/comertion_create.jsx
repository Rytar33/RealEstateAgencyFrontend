import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ComertionCreate = () => {
  const [formData, setFormData] = useState({
    district: '',
    street: '',
    description: '',
    price: '',
    employeeId: '',
    countRooms: '',
    locatedFloorApartment: '',
    countFloorsHouse: '',
    isCorner: false,
    materialHouse: '',
    roomArea: '',
    typeSale: '',
    locality: '',
    numberProperty: '',
    latitude: null,
    longitude: null,
    files: []
  });

  const [employees, setEmployees] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [typeSales, setTypeSales] = useState([]);
  const [materialHouses, setMaterialHouses] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesRes = await axios.get('https://localhost:44329/api/v1.2/Teams/Short');
        const localitiesRes = await axios.get('https://localhost:44329/api/v1.2/Localities');
        const typeSalesRes = await axios.get('https://localhost:44329/api/v1.2/TypeSales');
        const materialHousesRes = await axios.get('https://localhost:44329/api/v1.2/MaterialHouses');
        setEmployees(employeesRes.data);
        setLocalities(localitiesRes.data);
        setTypeSales(typeSalesRes.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      setFormData({
        ...formData,
        files: [...formData.files, ...files]
      });
    } else if (name === 'isCorner') {
      setFormData({
        ...formData,
        isCorner: e.target.checked
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

  const handleMapClick = (event) => {
    setFormData({
      ...formData,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = Cookies.get('jwt'); // Получаем токен из куков

    const data = new FormData();
    for (const key in formData) {
      if (key === 'files') {
        formData[key].forEach(file => {
          data.append(`files`, file);
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post('https://abcofrealestatewebapi.onrender.com/api/v1.2/Comertion', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data);
      if (res.status === 201)
        alert("Объект под комерцию успешно создан!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Создание объекта под комерцию</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <textarea name="description" value={formData.description} onChange={handleChange} required />
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
            required
          />
        </label>
        <br />
        <label>
          Количество комнат:
          <input type="number" name="countRooms" value={formData.countRooms} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Объект находится на этаже:
          <input type="number" name="locatedFloorApartment" value={formData.locatedFloorApartment} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Этажность здания:
          <input type="number" name="countFloorsHouse" value={formData.countFloorsHouse} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Угловая:
          <input type="checkbox" name="isCorner" checked={formData.isCorner} onChange={handleChange} />
        </label>
        <br />
        <label>
          Материал дома:
          <input type="text" name="materialHouse" value={formData.materialHouse} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Площадь помещения:
          <input type="text" name="roomArea" value={formData.roomArea} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Тип продажи:
          <Select
            name="typeSale"
            options={typeSales.map(type => ({ value: type, label: type }))}
            onChange={handleSelectChange}
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
            required
          />
        </label>
        <br />
        <label>
          Номер здания:
          <input type="text" name="numberProperty" value={formData.numberProperty} onChange={handleChange} required />
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
          Изображении:
          <input type="file" name="files" multiple onChange={handleChange} />
          {formData.files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </label>
        <br />
        <button type="submit">Создать</button>
      </form>
      <LoadScript googleMapsApiKey="AIzaSyAjBMItZHJYt-9NE5GWTjwr3Nrgybd84vc">
        <GoogleMap
          mapContainerStyle={{ width: '400px', height: '400px' }}
          center={{ lat: formData.latitude || 0, lng: formData.longitude || 0 }}
          zoom={10}
          onClick={handleMapClick}
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

export default ComertionCreate;