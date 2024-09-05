import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

function Cards() {
  const [items, setData] = useState([]);

  const location = useLocation();

  const fetchData = async () => {
    const params = new URLSearchParams(location.search);
    await axios.get('https://localhost:44329/api/v1.2/Catalog', { params })
      .then(response => {
        console.log(response.data.items);
        setData(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const deleteElement = async (typeRealEstateObject, uuid) => {

    try {
      const token = Cookies.get('jwt');
      const response = await axios.delete(`https://localhost:44329/api/v1.2/${typeRealEstateObject}/${uuid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 204)
      {
        alert("Элемент удалён");
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between">
            {items.map(item => (
                <div key={item.idRealEstateObject} className="card" style={{ marginBottom: "20px", marginTop: "20px" }}>
                {typeof Cookies.get('jwt') !== "undefined" && (
                  <div>
                    <button
                     className="card-button bg-red-900 rounded text-white absolute p-1"
                     onClick={() => {
                      if (window.confirm("Вы хотите удалить объект?"))
                        deleteElement(item.typeObject, item.idRealEstateObject)
                     }}
                    >
                      X
                    </button>
                    <Link to={"/entities/edit?typeRealEstate=" + item.typeObject + "&uuid=" + item.idRealEstateObject} className="card-button bg-yellow-900 rounded text-white absolute p-1 ml-6">...</Link>
                  </div>
                )}
                  <Link to={"/detail?uuid=" + item.idRealEstateObject + "&typeRealEstate=" + item.typeObject} >
                    <img
                      loading="lazy"
                      srcSet={"https://localhost:44329" + item.imagePath}
                      className="card-image"
                      alt="Apartment"
                    />
                    <div className="card-content">
                      <div className="card-title">{item.typeSale}</div>
                      <div className="card-price">{item.price}$</div>
                      <div className="card-location">{item.locality}</div>
                    </div>
                  </Link>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Cards;
