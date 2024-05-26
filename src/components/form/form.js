import React from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';

function Form() {
  const USER = 'ADMIN';
  const PASSWORD = process.env.REACT_APP_PASSWORD;

  // const [user, setUser] = React.useState('ADMIN');
  const [password, setPassword] = React.useState('');
  const [isInvalid, setInvalid] = React.useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleClick() {
    if (password !== PASSWORD) {
      setInvalid(true);     
    } else {
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
