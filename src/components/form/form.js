import React from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../jwt';

function Form() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInvalid, setInvalid] = React.useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleClick() {
    console.log(user, password);
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
      if (response.ok) {
        const token = await response.json();
        const decodedToken = decodeToken(token.token);
        console.log(decodedToken);
        localStorage.setItem('token', token.token);
        localStorage.setItem('location', decodedToken.location);
        localStorage.setItem('current_user', decodedToken.role);
        navigate('/file');
      }
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
