import './header.css';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
  return (
    <header className="header-container">
      <Menu />
      <img
        className="site-img-logo"
        src="https://sanorte.com.br/wp-content/uploads/2021/03/logo_novo.png"
        alt="SANORTE"
      ></img>
    </header>
  );
}

function Menu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img src="./icone-menu.png" alt="Menu" />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              className="site-img-logo"
              src="https://sanorte.com.br/wp-content/uploads/2021/03/logo_novo.png"
              alt="SANORTE"
            ></img>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm>
                <ListGroup>
                  <ListGroup.Item action href="/file">
                    Formatador de arquivo executados
                  </ListGroup.Item>
                  <ListGroup.Item action href="/city">
                    Tabelas
                  </ListGroup.Item>
                  <ListGroup.Item action href="/file-execute">
                    Arquivo Executados
                  </ListGroup.Item>
                  <ListGroup.Item action href="/file-pendente">
                    Arquivo Pendentes
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="/"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    Sair
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Tab.Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
