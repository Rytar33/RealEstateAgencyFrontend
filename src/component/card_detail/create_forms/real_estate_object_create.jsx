import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Footer from "../../footer/footer";
import Header from "../../header/header";
import AreaCreate from "./entities/area_create";
import Select from "react-select"
import ApartmentCreate from "./entities/apartment_create";
import ComertionCreate from "./entities/comertion_create";
import GarageCreate from "./entities/garage_create";
import HostelCreate from "./entities/hostel_create";
import HouseCreate from "./entities/house_create";
import RoomCreate from "./entities/room_create";

function RealEstateObjectCreate() {
  const [items, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://localhost:44329/api/v1.2/Entities')
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, []);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption.value) {
      case "Apartment":
        return <ApartmentCreate />;
      case "Area":
        return <AreaCreate />;
      case "Comertion":
        return <ComertionCreate />;
      case "Garage":
        return <GarageCreate />;
      case "Hostel":
        return <HostelCreate />;
      case "House":
        return <HouseCreate />;
      case "Room":
        return <RoomCreate />;
      default:
        return <div>Вы выбрали не существующий объект</div>;
    }
  };

  return (
    <div className='wrapper'>
        <Header/>
        <Select
          options = {items.map( item => ({ value: item, label: item }))}
          name="typeRealEstateObject"
          id="choise-object"
          onChange={handleSelectChange}
        />
        {selectedOption && renderComponent()}
        <Footer/>
    </div>
  );
}

export default RealEstateObjectCreate;
