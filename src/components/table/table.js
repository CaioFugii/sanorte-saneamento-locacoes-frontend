import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';
import { useState } from 'react';
import './table.css';

function TableComponent({
  data,
  dataPending,
  lastDatePending,
  lastDateCompleted,
}) {
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
          {lastDateCompleted != null ? (
            <div className="alert alert-warning" role="alert">
              Ultima data de inclusão:
              <span className="alert-link">
                {format(lastDateCompleted, 'dd/MM/yyyy HH:mm')}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          {data.length !== 0 && (
            <div className="scrollBar">
              {data.map((item, index) => {
                const completedHeaders = Object.keys(item.summary);
                completedHeaders.shift();
                completedHeaders.shift();
                completedHeaders.push('Atrasados', 'Atrasados - %');

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
                          {completedHeaders.map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td key={index}>{item.tableName}</td>
                          {completedHeaders.map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                key === 'Total' ||
                                item.summary[key] === 0 ? (
                                  <span
                                    className={
                                      index !== 0 &&
                                      index !== 1 &&
                                      index !== 2 &&
                                      item.summary[key] > '0' &&
                                      item.summary[key] > '0%'
                                        ? 'late'
                                        : 'dark'
                                    }
                                  >
                                    {item.summary[key]}
                                  </span>
                                ) : (
                                  <InformationModal
                                    children={item.values}
                                    number={item.summary[key]}
                                    classification={key}
                                    late={index}
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
              Não há tarefas executadas
            </div>
          )}
        </div>
      </Tab>
      <Tab eventKey="late" title="Pendentes">
        <div className="container">
          {dataPending.length !== 0 && (
            <div className="scrollBar">
              {dataPending.map((item, index) => {
                const pendingHeaders = Object.keys(item.summary);
                pendingHeaders.shift();
                pendingHeaders.shift();
                pendingHeaders.push('Atrasados', 'Atrasados - %');

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
                          {pendingHeaders.map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item.tableName}</td>
                          {pendingHeaders.map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                key === 'Total' ||
                                item.summary[key] === 0 ? (
                                  <span
                                    className={
                                      index !== 0 &&
                                      index !== 1 &&
                                      index !== 2 &&
                                      item.summary[key] > '0' &&
                                      item.summary[key] > '0%'
                                        ? 'late'
                                        : 'dark'
                                    }
                                  >
                                    {item.summary[key]}
                                  </span>
                                ) : (
                                  <InformationModal
                                    children={item.values}
                                    number={item.summary[key]}
                                    classification={key}
                                    late={index}
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
          {lastDatePending != null ? (
            <div>
              Ultima data de inclusão:
              <span className="alert-link">
                {format(lastDatePending, 'dd/MM/yyyy HH:mm')}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          {dataPending.length === 0 && (
            <div className="alert alert-dark" role="alert">
              Não há tarefas pendentes
            </div>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

function InformationModal({ children, number, classification, late }) {
  const [lgShow, setLgShow] = useState(false);
  const dataModal = children;

  return (
    <>
      <Button
        className={
          late !== 0 && late !== 1 && late !== 2 ? 'late-link' : 'dark-link'
        }
        variant="link"
        onClick={() => setLgShow(true)}
      >
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
          <Tabs
            defaultActiveKey="Relatório Geral"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
            variant="pills"
            transition
          >
            <Tab eventKey="home" title="Relatório Geral">
              <Table striped bordered hover variant="primary" responsive="sm">
                <thead>
                  <tr>
                    <th>Cidade</th>
                    <th>Endereço</th>
                    <th>Nº de Serviço</th>
                    <th>Status</th>
                    <th>Resultado</th>
                    <th>Data de Início</th>
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
                            <td key={i}>{item.order_service}</td>
                            <td key={i}>{item.status}</td>
                            <td key={i}>{item.result}</td>
                            <td key={i}>
                              {format(item.start_date, 'dd/MM/yyyy HH:mm')}
                            </td>
                            <td key={i}>{item.classification}</td>
                            <td key={i}>{item.tss}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="profile" title="Relatório de Controle">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <div></div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableComponent;
