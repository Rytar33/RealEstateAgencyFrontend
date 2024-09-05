import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Header from "../header/header";
import Footer from "../footer/footer";
import GoogleMap from "./GoogleMap";
import axios from "axios"; 
import { BrowserRouter as Router, Route, Switch, useParams, useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function CardsDetails() {
  const [item, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  
  const [formData, setFormData] = useState({
    fullName: '',
    numberPhone: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const query = useQuery();
  const uuid = query.get('uuid');
  const typeRealEstate = query.get('typeRealEstate');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://localhost:44329/api/v1.2/" + typeRealEstate + "/" + uuid);
        setData(response.data);
        setLoad(true);
        setImages(response.data.fullPathsImage);
        console.log(response.data.fullPathsImage.length);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLocation();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:44329/api/v1.2/Sender/Email/Contact', formData);
      setFormSuccess('Сообщение успешно отправлено!');
      setFormError('');
    } catch (error) {
      setFormError('Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
      setFormSuccess('');
    }
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  if (!isLoad) return(
    <>
    <Header />
      <div className="w-[100%] text-center">
        Данные загружаются, пожалуйста подождите...
      </div>
    <Footer/>
    </>
  );

  return (
    <div className="wrapper">
    <Header />
    <div className="flex justify-center items-center px-16 py-20 bg-white max-md:px-5">
      <div className="flex flex-col mt-28 w-full max-w-[1120px] max-md:mt-10 max-md:max-w-full">
        <div className="mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                {images.length > 0 && (
                  <div>
                    <img
                      key={0}
                      src={"https://localhost:44329" + images[0]}
                      alt={`Image ${0 + 1}`}
                      className="w-full shadow-lg aspect-[2.04] max-md:max-w-full"
                      onClick={() => {
                        setPhotoIndex(0);
                        setIsOpen(true);
                      }}
                    />
                    <div className="mt-10 flex flex-col mt-5 p-10">
                      <Slider {...settings}>
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={"https://localhost:44329" + image}
                            alt={`Image ${index + 1}`}
                            className="square aspect-square w-[200px] p-3"
                            onClick={() => {
                              setPhotoIndex(index);
                              setIsOpen(true);
                            }}
                          />
                        ))}
                      </Slider>
                    </div>
                  </div>
                )}
                <div className="flex gap-5 justify-between self-center mt-12 max-w-full text-xl font-bold leading-7 text-slate-900 w-[586px] max-md:flex-wrap max-md:mt-10">
                  <div className="flex gap-5 justify-between">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/892558ba29a5ca5f92ab852bbf134e14ad7bd413d2796c2e539a3cf9cbb78a7e?"
                      className="shrink-0 w-12 aspect-square"
                    />
                    <p className="my-auto">{typeRealEstate}</p>
                  </div>
                  {/* <div className="flex gap-5 justify-between leading-7">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b44a4c316e82f4778b6afbb500b8eadb51430774775c1e361299245834aadb9a?"
                      className="shrink-0 w-12 aspect-square"
                    />
                    <p className="my-auto">
                      224m<span className="text-xl">2</span>
                    </p>
                  </div> */}
                  <div className="flex gap-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c64dd33c988ca4cc387495057afdad815689cdfee675b915da85eeda252e63f0?"
                      className="shrink-0 w-12 aspect-square"
                    />
                    <h2 className="flex-auto my-auto">{item.locality}</h2>
                  </div>
                </div>
                <div className="flex gap-5 self-center px-6 py-6 mt-11 max-w-full rounded bg-slate-100 w-[609px] max-md:flex-wrap max-md:px-5 max-md:mt-10">
                  <p className="text-lg leading-7 text-slate-900">
                    Цена: 
                    <span className="text-xl font-bold leading-7">
                      {item.price}$ {(item.typeSale === "Rental") && (
                      <span>/ в месяц</span>
                    )}
                    </span>
                  </p>
                  <div className="flex flex-col flex-1 justify-center text-base font-bold text-center text-white">
                    <button className="justify-center px-6 py-4 bg-blue-900 rounded max-md:px-5">
                      Get a mortgage
                    </button>
                  </div>
                </div>
                <p className="mx-16 mt-12 text-lg leading-7 text-slate-900 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                  {item.description}
                </p>
                
                {error && <p>{error}</p>}
        {item.latitude && item.longitude && (
          <GoogleMap latitude={item.latitude} longitude={item.longitude}/>
        )}                              </div>
            </div>
           

           
            <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col max-md:mt-8">
                <div className="flex flex-col px-6 py-9 w-full text-lg rounded bg-slate-100 text-slate-900 max-md:px-5">
                  <h1 className="text-3xl font-bold leading-9">Свяжитесь с нами</h1>
                 <form onSubmit={handleSubmit}>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ваше ФИО"
                        className="justify-center items-start px-4 py-6 mt-2.5 bg-white rounded border border-solid border-zinc-300 leading-[159%] text-slate-900 max-md:pr-5 w-[100%]"
                      />
                      <input
                        name="numberPhone"
                        value={formData.numberPhone}
                        onChange={handleInputChange}
                        placeholder="Номер телефона"
                        className="justify-center items-start px-4 py-6 mt-2.5 bg-white rounded border border-solid border-zinc-300 leading-[159%] text-slate-900 max-md:pr-5 w-[100%]"
                      />
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="justify-center items-start px-4 py-6 mt-2.5 bg-white rounded border border-solid border-zinc-300 leading-[159%] text-slate-900 max-md:pr-5 w-[100%]"
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Ваше сообщение"
                        className="justify-center items-start px-4 py-6 mt-2.5 h-40 bg-white rounded border border-solid border-zinc-300 leading-[159%] text-slate-900 max-md:pr-5 w-[100%]"
                      />
                      {formError && <p className="text-red-500">{formError}</p>}
                      {formSuccess && <p className="text-green-500">{formSuccess}</p>}
                      <div className="flex justify-center w-full text-white">
                        <button
                          type="submit"
                          className="flex justify-center self-center px-6 py-4 mt-6 rounded bg-blue-900 max-md:px-5"
                        >
                          Отправить
                        </button>
                      </div>
                    </form>
                </div>
                {item.employee !== null && (
                  <div className="flex flex-col items-center px-16 py-6 mt-10 text-lg text-center rounded bg-slate-100 max-md:px-5">
                    {(item.employee.fullPathFile !== null && item.employee.fullPathFile !== undefined) && (
                      <img
                        loading="lazy"
                        srcSet={"https://localhost:44329" + item.employee.fullPathFile}
                        className="max-w-full aspect-square w-[126px]"
                      />
                    )}
                    <h1 className="mt-7 text-xl font-bold leading-7 text-slate-900">
                      {item.employee.fullName}
                    </h1>
                    <p className="self-stretch mt-3.5 leading-7 text-slate-900">
                      {item.employee.jobTitle}
                      <br />
                      {item.employee.numberPhone}
                      <br />
                      {item.employee.email}
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-start py-8 pr-20 pl-6 mt-10 font-bold rounded bg-slate-100 text-slate-900 max-md:px-5 w-[120%]">
                  <h1 className="text-xl leading-7">Характеристики</h1>
                  <div className="mt-5 text-lg leading-7">
                    <div>
                      Населённый пункт: <span className="">{item.locality}</span>
                    </div>
                    <div>
                      Улица: <span className="">{item.street}</span>
                    </div>
                    <div>
                      Район: <span className="">{item.district}</span>
                    </div>
                    {(item.countRooms !== null && item.countRooms !== undefined) && (
                      <div>
                        <span>Количесто комнат: {item.countRooms}</span>
                      </div>
                    )}
                    {(item.countFloorsHouse !== null && item.countFloorsHouse !== undefined) && (
                      <div>
                        <span>Количесто этажей: {item.countFloorsHouse}</span>
                      </div>
                    )}
                    {(item.locatedFloorApartment !== null && item.locatedFloorApartment !== undefined) && (
                      <div>
                        <span>Находится на {item.locatedFloorApartment} этаже</span>
                      </div>
                    )}
                    {(item.isCorner !== null && item.isCorner !== undefined) && (
                      <div>
                        <span>Угловая: {item.isCorner ? "Да" : "Нет"}</span>
                      </div>
                    )}
                    {(item.materialHouse !== null && item.materialHouse !== undefined) && (
                      <div>
                        <span>Материал: {item.materialHouse}</span>
                      </div>
                    )}
                    {(item.numberProperty !== null && item.numberProperty !== undefined) && (
                      <div>
                        <span>Дом №{item.numberProperty}</span>
                      </div>
                    )}
                    {(item.livingSpace !== null && item.livingSpace !== undefined) && (
                      <div>
                        <span>Жилая площадь: {item.livingSpace} m2</span>
                      </div>
                    )}
                    {(item.totalArea !== null && item.totalArea !== undefined) && (
                      <div>
                        <span>Общая площадь: {item.totalArea} m2</span>
                      </div>
                    )}
                    {(item.kitchenArea !== null && item.kitchenArea !== undefined) && (
                      <div>
                        <span>Площадь кухни: {item.kitchenArea} m2</span>
                      </div>
                    )}
                    {(item.conditionHouse !== null && item.conditionHouse !== undefined) && (
                      <div>
                        <span>Состояние дома: {item.conditionHouse}</span>
                      </div>
                    )}
                    {(item.isBalcony !== null && item.isBalcony !== undefined) && (
                      <div>
                        <span>Балкон: {item.isBalcony ? "Да" : "Нет"}</span>
                      </div>
                    )}
                    {(item.numberApartment !== null && item.numberApartment !== undefined) && (
                      <div>
                        <span>Квартира №{item.numberApartment}</span>
                      </div>
                    )}
                    {(item.countBalcony !== null && item.countBalcony !== undefined) && (
                      <div>
                        <span>Количество балконов: {item.countBalcony}</span>
                      </div>
                    )}
                    {(item.landArea !== null && item.landArea !== undefined) && (
                      <div>
                        <span>Площадь участка: {item.landArea} сот.</span>
                      </div>
                    )}
                    {(item.roomArea !== null && item.roomArea !== undefined) && (
                      <div>
                        <span>Площадь помещения: {item.roomArea} m2</span>
                      </div>
                    )}
                    {(item.garageCapacity !== null && item.garageCapacity !== undefined) && (
                      <div>
                        <span>Вместимость гаража: {item.garageCapacity}</span>
                      </div>
                    )}
                    {(item.haveBasement !== null && item.haveBasement !== undefined) && (
                      <div>
                        <span>Подвал: {item.haveBasement ? "Есть" : "Отсутствует"}</span>
                      </div>
                    )}
                    {(item.area !== null && item.area !== undefined) && (
                      <div>
                        <span>Площадь участка: {item.area} m2</span>
                      </div>
                    )}
                    {(item.gardenSot !== null && item.gardenSot !== undefined) && (
                      <div>
                        <span>Площадь огорода: {item.gardenSot} сот.</span>
                      </div>
                    )}
                    <div>
                      Время публикации: <span className="">{item.dateTimePublished}</span>
                    </div>
                    <div>
                      <span>{item.isActual ? "Актуален" : "Не актуален"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default CardsDetails;