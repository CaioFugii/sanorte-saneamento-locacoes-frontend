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
          {data.length !== 0 && (
            <div className="scrollBar">
              {data.map((item, index) => {
                return (
                  <div id="tables" key={index}>
                    <Table
                      striped
                      bordered
                      hover
                      variant="primary"
                      responsive="sm"
                    >
                      <thead>
                        <tr>
                          <th key={index}>Referência</th>
                          {Object.keys(item.summary).map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td key={index}>{item.tableName}</td>
                          {Object.keys(item.summary).map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                key === 'Total' ||
                                item.summary[key] === 0 ? (
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
            </div>
          )}
          {data.length === 0 && (
            <div className="alert alert-dark" role="alert">
              Não há tarefas executadas nessa data
            </div>
          )}
        </div>
      </Tab>
      <Tab eventKey="late" title="Pendentes">
        <div className="container">
          {dataPending.length !== 0 && (
            <div className="scrollBar">
              {dataPending.map((item, index) => {
                return (
                  <div id="tables" key={index}>
                    <Table
                      striped
                      bordered
                      hover
                      variant="primary"
                      responsive="sm"
                    >
                      <thead>
                        <tr key={index}>
                          <th key={index}>Referência</th>
                          {Object.keys(item.summary).map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item.tableName}</td>
                          {Object.keys(item.summary).map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                key === 'Total' ||
                                item.summary[key] === 0 ? (
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
            </div>
          )}
          {dataPending.length === 0 && (
            <div className="alert alert-dark" role="alert">
              Não há tarefas pendentes nessa data
            </div>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

function InformationModal({ children, number, classification }) {
  const [lgShow, setLgShow] = useState(false);
  const dataModal = children;
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
                  <th>Endereço</th>
                  <th>Tipo</th>
                  <th>Nº de Serviço</th>
                  <th>Status</th>
                  <th>Resultado</th>
                  <th>Classificação</th>
                  <th>TSS</th>
                </tr>
              </thead>
              <tbody>
                {dataModal &&
                  dataModal
                    .filter((data) => data.classification === classification)
                    .map((item, i) => {
                      return (
                        <tr key={i}>
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
