import './button-file-execute.css';
import React from 'react';
import ContainerPage from '../../pages/container-page/container-page';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonFileExecute() {
  const [modalShow, setModalShow] = React.useState(false);
  const [isData, setIsData] = React.useState(false);
  const navigate = useNavigate();

  const tokenJwt = localStorage.getItem('token');

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    setIsData(true);
    if (
      file &&
      (file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/completed-services`,
        {
          method: 'POST',
          headers: {
            Authorization: tokenJwt,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setModalShow(true);
        setIsData(false);
        navigate('/error-execute');
      } else {
        setIsData(false);
        navigate('/success-execute');
      }
    } else {
      setIsData(false);
      setModalShow(true);
    }
  }

  return (
    <>
      <ContainerPage>
        {isData === true && (
          <div>
            <ReactLoading
              type={'spin'}
              color={'#ffffff'}
              height={50}
              width={50}
            />
          </div>
        )}
        {isData === false && (
          <div className="text-content">
            <h1 className="title">Carregamento de tarefas executadas:</h1>
            <label htmlFor="input-button" id="label-input">
              <img src="./icon-file.png" alt="icon-file" />
              Arquivo
            </label>
          </div>
        )}
        <input
          type="file"
          multiple={false}
          id="input-button"
          onChange={handleFileUpload}
          name="input-button"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </ContainerPage>
      <Modal
        show={modalShow}
        onHide={!modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>'Por favor, envie um arquivo Excel.'</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
              navigate('/error-execute');
            }}
          >
            Entendi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonFileExecute;
