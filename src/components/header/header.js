import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }
  return (
    <header className="header-container">
      <img
        className="site-img-logo"
        src="https://sanorte.com.br/wp-content/uploads/2021/03/logo_novo.png"
        alt="SANORTE"
      ></img>
      <button onClick={handleClick} className="btn-logout">
        <img
          src="./img-logout.png"
          alt="botão de logout"
          className="img-logout"
        />
      </button>
    </header>
  );
}

export default Header;
