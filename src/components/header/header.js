import './header.css';
import { useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';


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
      <div className='container-nav'>
     
      <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/file">Formatador de arquivo</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/table-analyses">Tabelas</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/file-execute">Arquivo Executados</Nav.Link>
      </Nav.Item>
    </Nav>
      
      <button onClick={handleClick} className="btn-logout">
        <img
          src="./img-logout.png"
          alt="botão de logout"
          className="img-logout"
        />
      </button>
      </div>
    </header>
  );
}

export default Header;
