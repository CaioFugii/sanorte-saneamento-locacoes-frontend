import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import './table.css';

function TableComponent({data}) {
  return(
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
      variant='pills'
      transition
    >
      <Tab eventKey="home" title="Visão Geral">
      <div className='container'>
    {data.map((item, index) => {
      return <div id='tables'><Table striped bordered hover variant="primary" responsive="sm">
      <thead>
        <tr>
          <th key={index}>Referência</th>
          {Object.keys(item.summary).map((key) => <th>{key}</th>)}
        </tr>
      </thead>
      <tbody>    
        <tr>
        <td>
        {item.tableName}
        </td>
        {Object.keys(item.summary).map((key) => <th><InformationModal children={item.values} number={item.summary[key]} classification={key}/></th>)}
        </tr>
      </tbody>
    </Table>
    </div>
    })}
  </div>
      </Tab>
      <Tab eventKey="late" title="Pendentes">
        Tab content for Profile
      </Tab>
    </Tabs> 
    
  )

}

function InformationModal({children, number, classification}) {
  const [lgShow, setLgShow] = useState(false);
  const [dataModal, setDataModal] = useState([]);

  setDataModal([children.find((i) => i.classification === classification)])


  return (
    <>
      <Button variant='link' onClick={() => setLgShow(true)}>{number}</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Informações
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {dataModal && dataModal.map((item,index)=>{
       return <p key={index}>   Cidade : {item.origin}</p>
           
              
              })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableComponent;