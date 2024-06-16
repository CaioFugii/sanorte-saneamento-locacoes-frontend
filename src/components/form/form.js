import React from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const USER = 'ADMIN';
  const password = process.env.REACT_APP_PASSWORD;

const [user, setUser] = React.useState('ADMIN');
  const [passwordLogin, setPasswordLogin] = React.useState('');
  const [isInvalid, setInvalid] = React.useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClick() {
    if (passwordLogin !== password) {
      
      setInvalid(true);     
    } else {
      fetch('https://sanorte-backend-cc7f6aa7a173.heroku.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:{
          user,
          password,
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((json) => {
          console.log(json);
          return json;
        });
      navigate('/file');
      localStorage.setItem('current_user','ADMIN')
    }
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
          <label htmlFor="nome">Usuário: {USER}</label>

          {/* <input
                    type="text"
                    id="nome"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                /> */}
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
