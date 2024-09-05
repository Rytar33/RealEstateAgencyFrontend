import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from "../header/header";
import Footer from '../footer/footer';

const LoginComponent = () => {
  const [emailOrName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:44329/api/v1.2/Moderator/Login', {
        emailOrName,
        password,
      });
      if (response.status === 200){
        const token = response.data.token;
        Cookies.set('jwt', token, { expires: 1 }); // Сохранение токена в куки на 1 день
        // Перенаправление или выполнение других действий после успешного входа
        alert("Вы успешно вошли!");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='wrapper'>
      <Header />
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
        <div>
          <label>Имя/почта:</label>
          <input
            type="text"
            value={emailOrName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Авторизоваться</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <Footer/>
    </div>
  );
};

export default LoginComponent;