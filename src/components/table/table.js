import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './table.css';

function TableComponent({ data, dataPending }) {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
      variant="pills"
      transition
    >
      <Tab eventKey="home" title="Tarefas executadas">
        <div className="container">
          {data.map((item, index) => {
            return (
              <div id="tables">
                <Table striped bordered hover variant="primary" responsive="sm">
                  <thead>
                    <tr>
                      <th key={index}>Referência</th>
                      {Object.keys(item.summary).map((key) => (
                        <th>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.tableName}</td>
                      {Object.keys(item.summary).map((key) => (
                        <th>
                          <div className="container-number">
                            {key === 'total' || item.summary[key] === 0 ? (
                              item.summary[key]
                            ) : (
                              <InformationModal
                                children={item.values}
                                number={item.summary[key]}
                                classification={key}
                              />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
          {data.length === 0 && (
            <div class="alert alert-dark" role="alert">
              Nao ha tarefas executadas nessa data
            </div>
          )}
        </div>
      </Tab>
      <Tab eventKey="late" title="Pendentes">
        <div className="container">
          {dataPending.map((item, index) => {
            return (
              <div id="tables">
                <Table striped bordered hover variant="primary" responsive="sm">
                  <thead>
                    <tr>
                      <th key={index}>Referência</th>
                      {Object.keys(item.summary).map((key) => (
                        <th>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.tableName}</td>
                      {Object.keys(item.summary).map((key) => (
                        <th>
                          <InformationModal
                            children={item.values}
                            number={item.summary[key]}
                            classification={key}
                          />
                        </th>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
          {dataPending.length === 0 && (
            <div class="alert alert-dark" role="alert">
              Nao ha tarefas pendentes nessa data
            </div>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

function InformationModal({ children, number, classification }) {
  const [lgShow, setLgShow] = useState(false);
  const [dataModal, setDataModal] = useState(children);
  return (
    <>
      <Button variant="link" onClick={() => setLgShow(true)}>
        {number}
      </Button>
      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Informações
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Table striped bordered hover variant="primary" responsive="sm">
              <thead>
                <tr>
                  <th>Cidade</th>
                  <th>Endereco</th>
                  <th>Tipo</th>
                  <th>Numero de Servico</th>
                  <th>Status</th>
                  <th>Resultado</th>
                  <th>Classificacao</th>
                  <th>TSS</th>
                </tr>
              </thead>
              <tbody>
                {dataModal &&
                  dataModal
                    .filter((data) => data.classification === classification)
                    .map((item, i) => {
                      return (
                        <tr>
                          <td key={i}>{item.city}</td>
                          <td key={i}>{item.address}</td>
                          <td key={i}>{item.type}</td>
                          <td key={i}>{item.order_service}</td>
                          <td key={i}>{item.status}</td>
                          <td key={i}>{item.result}</td>
                          <td key={i}>{item.classification}</td>
                          <td key={i}>{item.tss}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableComponent;
