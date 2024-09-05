import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInView } from "react-intersection-observer";

const SliderItem = ({ imageSrc, typeRealEstate, title, price, location, id }) => (
  <div className="flex justify-center">
      <div className="max-w-sm w-full">
        <Link to={"/detail?uuid=" + id + "&typeRealEstate=" + typeRealEstate} >
          <div className="rounded overflow-hidden shadow-lg">
            <img
              className="card-image"
              src={imageSrc}
              alt={typeRealEstate}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{title}</div>
              <p className="text-gray-700 text-base">{price}</p>
              <p className="text-gray-700 text-base">{location}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
);

const CustomSlider = () => {
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [items, setData] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (isVisible) {
      sliderRef.current.slickGoTo(0);
    }
  }, [isVisible]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://localhost:44329/api/v1.2/Catalog')
        .then(response => {
          console.log(response.data.items);
          setData(response.data.items);
          setLoad(true);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (!isLoad) return (
    <div id="team" className="w-[100%] text-center">
      Данные об недвижимости загружаются, пожалуйста подождите...
    </div>
  )

  return (
    <div>
      <div
        ref={ref}
        className="flex justify-center items-center px-16 py-20"
      >
        <div>
          <h1 className="text-5xl font-bold text-gray-900">
            Лучшие предложения
          </h1>
          <p className="mt-6 text-xl text-gray-700">
          Осуществите свои карьерные мечты, наслаждайтесь всеми достижениями города
            центр и элитное жилье в полной мере.
          </p>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings} className="px-4">
        {items.map(item => (
          <SliderItem
            imageSrc={"https://localhost:44329" + item.imagePath}
            typeRealEstate = {item.typeObject}
            title = {item.typeSale}
            price = {item.price}
            location = {item.locality}
            id = {item.idRealEstateObject}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
