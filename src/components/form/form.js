import React from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../jwt';

function Form() {
  const password = process.env.REACT_APP_PASSWORD;

  const [user, setUser] = React.useState('ADMIN');
  const [passwordLogin, setPasswordLogin] = React.useState('');
  const [isInvalid, setInvalid] = React.useState(false);
  const navigate = useNavigate();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbiI6IioiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg3NTUyMjQsImV4cCI6MTcxOTM2MDAyNH0.HsLodUMErm6zGdqW-LVwYE3njqc57h55MRtosLivuew';

  const decodedToken = decodeToken(token);
  console.log('Decoded Token:', decodedToken);
  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleClick() {
    console.log(user);
    console.log(password);
    // if (passwordLogin !== password) {
    //   setInvalid(true);
    // } else {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user,
            password,
          }),
        }
      );

      navigate('/file');
      localStorage.setItem('current_user', 'ADMIN');
    } catch (error) {
      setInvalid(true);
    }
    // }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-form">
        <img
          className="site-img-logo"
          id="image-logo"
          src="https://sanorte.com.br/wp-content/uploads/2021/03/logo_novo.png"
          alt="SANORTE"
        ></img>
        <div className="container-inputs">
          {/* <label htmlFor="nome">Usuário: {USER}</label> */}
          <input
            type="text"
            id="user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="&nbsp;&nbsp;USUÁRIO"
          />
          <input
            type="password"
            id="nome"
            value={passwordLogin}
            onChange={(event) => setPasswordLogin(event.target.value)}
            placeholder="&nbsp;&nbsp;SENHA"
          />
          {isInvalid ? (
            <label className="invalid-password">Senha inválida.</label>
          ) : null}

          <button className="btn-submit" onClick={handleClick}>
            Acessar
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
