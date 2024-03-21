import axios from 'axios';
import { useState } from 'react';
import './Login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
          'https://bubble-tea-cafe-api-production.up.railway.app/api/auth/login',
          {
            email: email,
            password: password,
          }
        )
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/';
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='title'>Login</div>
          <div className='input-box underline'>
            <input
              type='text'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
            <div className='underline'></div>
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Enter Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            <div className='underline'></div>
          </div>
          <div className='input-box button'>
            <input type='submit' name='' value='Login' />
          </div>
        </form>
      </div>
  );
}
