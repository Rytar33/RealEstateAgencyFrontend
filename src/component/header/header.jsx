import React, { useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const token = Cookies.get('jwt');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="animate__animated animate__fadeInLeft flex justify-between items-center px-4 pt-4 pb-8 bg-white relative z-10">
      <div className="hidden md:block mr-4 text-blue-900">
        <span>{token && typeof token === "string" && token.trim() !== "" && 
        (jwtDecode(token).IsSuperModerator === "True"
        ? "SM" 
        : jwtDecode(token).IsSuperModerator === "False" 
        ? "M"
        : "")}</span>
      </div>
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7baf5741f161556ad86324b1cc4add64bc5635bf2e71fc37283cf68fd57b4b27?"
          className="w-16 h-auto"
          alt="Logo"
        />
        <nav className="hidden md:flex ml-8 space-x-6">
          <Link to="/" className="text-gray-800 hover:text-gray-600 transition duration-300">Главная</Link>
          <Link to="/team" className="text-gray-800 hover:text-gray-600 transition duration-300" >Команда</Link>
          <Link to="/main" className="text-gray-800 hover:text-gray-600 transition duration-300">Каталог</Link>
          {token !== undefined && (
            <Link to="/moderators" className="text-gray-800 hover:text-gray-600 transition duration-300">Модераторы</Link>
          )}
          {token ? (<span style={{ cursor: "pointer" }} onClick={() => {
                      if (window.confirm("Вы хотите выйти из аккаунта?"))
                        Cookies.remove('jwt');
                     }}>
                      Выход
                      </span>) 
            : (<Link to="/moderator" className="text-gray-800 hover:text-gray-600 transition duration-300">
                Вход
              </Link>)
          }
        </nav>
      </div>
      <div className="ml-auto hidden md:block">
        <Link to="/contact_form" className="button px-6 py-3.5 font-bold text-white bg-blue-900 rounded max-md:px-5" style={{ marginRight: '50px' }}>
          Контакты
        </Link>
      </div>
      <div className="md:hidden absolute top-0 right-0">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6 text-gray-800 hover:text-gray-600 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`fixed inset-0 bg-white z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col space-y-6">
          <Link to="/" className="text-gray-800 hover:text-gray-600 transition duration-300" href="#">Главная</Link>
          <Link to="/about" className="text-gray-800 hover:text-gray-600 transition duration-300" href="#">О компании</Link>
            <a className="text-gray-800 hover:text-gray-600 transition duration-300" href="#">Услуги</a>
            <a className="text-gray-800 hover:text-gray-600 transition duration-300" href="#">Команда</a>
            <Link to="/main" className="text-gray-800 hover:text-gray-600 transition duration-300">Фильтр</Link>
            <Link to="/contact_form" className="text-gray-800 hover:text-gray-600 transition duration-300">Контакты</Link>
          </nav>
          <Link to="/contact_form" className="px-8 py-3 text-white bg-blue-900 rounded-lg mt-8 hover:bg-blue-800 transition duration-300">Contact us</Link>
        </div>
        <button onClick={toggleMenu} className="absolute top-4 right-4 focus:outline-none">
          <svg className="w-6 h-6 text-gray-800 hover:text-gray-600 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
