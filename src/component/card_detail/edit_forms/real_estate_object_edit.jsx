import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import Footer from "../../footer/footer";
import Header from "../../header/header";
import Select from "react-select"
import ApartmentEdit from "./entities/apartment_edit";
import AreaEdit from "./entities/area_edit";
import ComertionEdit from "./entities/comertion_edit";
import GarageEdit from "./entities/garage_edit";
import HostelEdit from "./entities/hostel_edit";
import HouseEdit from "./entities/house_edit";
import RoomEdit from "./entities/room_edit";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function RealEstateObjectEdit() {
  const [items, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const query = useQuery();
  const uuid = query.get('uuid');
  const typeRealEstate = query.get('typeRealEstate');
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
  }, [location.search]);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (typeRealEstate) {
      case "Apartment":
        return <ApartmentEdit
          uuid={uuid}
         />;
      case "Area":
        return <AreaEdit
          uuid={uuid}
        />;
      case "Comertion":
        return <ComertionEdit
          uuid={uuid}
        />;
      case "Garage":
        return <GarageEdit
          uuid={uuid}
        />;
      case "Hostel":
        return <HostelEdit
          uuid={uuid}
         />;
      case "House":
        return <HouseEdit
          uuid={uuid}
        />;
      case "Room":
        return <RoomEdit
          uuid={uuid}
        />;
      default:
        return <div>Такого типа объекта не существует</div>;
    }
  };

  return (
    <div className='wrapper'>
        <Header/>
        {renderComponent()}
        <Footer/>
    </div>
  );
}

export default RealEstateObjectEdit;
