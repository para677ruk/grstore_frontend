import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"

const Register = () => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://https://grstore-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('Регистрация успешна!');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setMessage(result.message);
      }
    } catch (e) {
      setMessage('Ошибка сервера');
    }
  };

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {
        message && <div><h6>{message}</h6></div>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tittle">
          <div className='tittle-login-input'>
            <label className='login-input-label' htmlFor="email"></label>
            <input
              {...register("email", { required: true })}
              type="email" id="email" name='email' placeholder='Email' className='tittle-login-input-field' />
          </div>
          <div className='tittle-login-input'>
            <label className='login-input-label' htmlFor="password"></label>
            <input
              {...register("password", { required: true })}
              type="password" id="password" name='password' placeholder='Password' className='tittle-login-input-field' />
          </div>
        </div>

        <div>
          <button>создать аккаунт</button>
        </div>
      </form>
      <div className="information">
        <Link to="/login">если есть аккаунт</Link>
      </div>
      <div className="for-login">
        <p>Когда вы создаете учетную запись grstore, мы собираем вашу электронную почту и другие персональные данные, чтобы улучшить ваш опыт покупок и, при условии вашего согласия, предоставлять вам эксклюзивные обновления электронной почты, акции и уведомления. Мы также можем использовать сторонние поисковые системы и платформы социальных сетей, чтобы доставлять вам наши обновления, акции и уведомления.
          <br />
          <br />
          Вы можете отписаться в любое время.
          <br />
          <br />
          Чтобы узнать больше, посетите нашу Политику конфиденциальности.</p>
      </div>
    </motion.div>
  )
}

export default Register;
