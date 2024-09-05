import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const HouseEdit = ({ uuid }) => {
  const [formData, setFormData] = useState({
    district: '',
    street: '',
    description: '',
    price: 0,
    employeeId: '',
    countRooms: 0,
    locatedFloorApartment: 0,
    countFloorsHouse: 0,
    isCorner: true,
    materialHouse: 'Kotelec',
    conditionHouse: 'NeedsRenovation',
    livingSpace: 0,
    totalArea: 0,
    kitchenArea: 0,
    area: 0,
    gardenSot: 0,
    typeSale: 'Rental',
    locality: 'Tiraspol',
    numberProperty: 'string',
    latitude: 0,
    longitude: 0,
    isActual: true
  });

  const [employees, setEmployees] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [typeSales, setTypeSales] = useState([]);
  const [conditionsHouse, setConditionsHouse] = useState([]);
  const [materialHouses, setMaterialHouses] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesRes = await axios.get('https://localhost:44329/api/v1.2/Teams/Short');
        const localitiesRes = await axios.get('https://localhost:44329/api/v1.2/Localities');
        const typeSalesRes = await axios.get('https://localhost:44329/api/v1.2/TypeSales');
        const conditionsHouseRes = await axios.get('https://localhost:44329/api/v1.2/ConditionHouses');
        const materialHousesRes = await axios.get('https://localhost:44329/api/v1.2/MaterialHouses');
        setEmployees(employeesRes.data);
        setLocalities(localitiesRes.data);
        setTypeSales(typeSalesRes.data);
        setConditionsHouse(conditionsHouseRes.data);
        setMaterialHouses(materialHousesRes.data);

        // Получение данных объекта по UUID и установка значений в форму
        const objectRes = await axios.get(`https://localhost:44329/api/v1.2/House/${uuid}`);
        const objectData = objectRes.data;
        setFormData(objectData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [uuid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isCorner' || name === 'isActual') {
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

    const token = Cookies.get('jwt');

    try {
      const res = await axios.put(`https://localhost:44329/api/v1.2/House`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data);
      if (res.status === 204)
        alert("Дом успешно изменен!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Изменение дома</h2>
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
            value={{ value: formData.employeeId, label: formData.employeeId }}
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
          Дом находится на этаже:
          <input type="number" name="locatedFloorApartment" value={formData.locatedFloorApartment} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Этажность дома:
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
          <Select
            name="materialHouse"
            options={materialHouses.map(materialHouse => ({ value: materialHouse, label: materialHouse }))}
            onChange={handleSelectChange}
            value={{ value: formData.materialHouse, label: formData.materialHouse }}
            required
          />
        </label>
        <br />
        <label>
          Состояние дома:
          <Select
            name="conditionHouse"
            options={conditionsHouse.map(conditionHouse => ({ value: conditionHouse, label: conditionHouse }))}
            onChange={handleSelectChange}
            value={{ value: formData.conditionHouse, label: formData.conditionHouse }}
            required
          />
        </label>
        <br />
        <label>
          Жилая площадь:
          <input type="number" name="livingSpace" value={formData.livingSpace} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Общая площадь:
          <input type="number" name="totalArea" value={formData.totalArea} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Площадь кухни:
          <input type="number" name="kitchenArea" value={formData.kitchenArea} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Площадь участка:
          <input type="number" name="area" value={formData.area} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Огород в сотах:
          <input type="number" name="gardenSot" value={formData.gardenSot} onChange={handleChange} required />
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

export default HouseEdit;