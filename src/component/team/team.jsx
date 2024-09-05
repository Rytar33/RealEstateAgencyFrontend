import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import Cookies from 'js-cookie';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Team() {
  const [employees, setData] = useState([]);
  const [countItems, getCountItems] = useState(0);
  const [isLoad, setLoad] = useState(false);

  const fetchData = async () => {
    await axios.get('https://localhost:44329/api/v1.2/Teams')
      .then(response => {
        setData(response.data.items);
        getCountItems(response.data.page.count);
        setLoad(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteElement = async (uuid) => {

    try {
      const token = Cookies.get('jwt');
      const response = await axios.delete(`https://localhost:44329/api/v1.2/Team/${uuid}`, {
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

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: true,
        },
      },
    ],
  };

  if (!isLoad) return (
    <div id="team" className="w-[100%] text-center">
      Данные о команде загружаются, пожалуйста подождите...
    </div>
  )
  
  return (
    <div id="team" className="mt-10 flex flex-col mt-5 p-10">
      <Slider {...settings}>
        {employees.map(employee => (
          <div className="flex w-[33%] max-md:ml-0 max-md:w-full card">
            {typeof Cookies.get('jwt') !== "undefined" && (
              <div>
                <button
                  className="card-button bg-red-900 rounded text-white absolute p-1"
                  onClick={() => {
                  if (window.confirm("Вы хотите удалить работника?"))
                    deleteElement(employee.id)
                  }}
                >
                  X
                </button>
                    <Link to={"/employee/edit?uuid=" + employee.id} className="card-button bg-yellow-900 rounded text-white absolute p-1 ml-6">...</Link>
                  </div>
                )}
            <div className="flex flex-col grow items-center px-20 py-12 w-full text-center bg-white rounded border border-solid border-slate-100 text-slate-900 max-md:px-5 max-md:mt-3">
              <img
                loading="lazy"
                srcSet={"https://localhost:44329" + employee.fullPathFile}
                className="rounded-full aspect-square w-[200px]"
              />
              <div className="mt-6 text-xl font-bold leading-7">{employee.fullName}</div>
              <div className="mt-3 text-lg">{employee.jobTitle}</div>
              <div className="mt-1 text-lg">{employee.numberPhone}</div>
              <div className="mt-1 text-lg">{employee.email}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    )
}

export default Team;
