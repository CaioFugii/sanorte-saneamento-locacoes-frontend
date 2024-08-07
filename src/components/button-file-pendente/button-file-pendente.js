import './button-file-pendente.css';
import React from 'react';
import ContainerPage from '../../pages/container-page/container-page';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ButtonFilePendente() {
  const [modalShow, setModalShow] = React.useState(false);
  const tokenJwt = localStorage.getItem('token');
  const [isData, setIsData] = React.useState(false);
  const [isSelectedCity, setIsSelectedCity] = React.useState('#');
  const city = localStorage.getItem('location').split(',');
  const navigate = useNavigate();

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    setIsData(true);
    const availableLocations = {
      Santos: 'STS',
      Cubatão: 'CBT',
      'São Sebastião': 'SSB',
      'Ilha bela': 'ILB',
      'São Vicente': 'SVT',
      Guarujá: 'GUJ',
      Bertioga: 'BTG',
    };

    const location = availableLocations[isSelectedCity];
    if (file.size === 0) {
      navigate('/error-file-pending');
    }
    if (
      file &&
      (file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/pending-services?location=${location}`,
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
        navigate('/error-pending');
      } else {
        setIsData(false);
        navigate('/success-pending');
      }
    } else {
      setIsData(false);
      setModalShow(true);
    }
  }
  const changeCity = (e) => {
    setIsSelectedCity(e.target.value);
  };

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
            <h1 className="title">Carregamento de tarefas pendentes:</h1>
            <div className="container-city">
              <h4>Referente a cidade de:</h4>
              <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={(e) => changeCity(e)}
              >
                <option value="#" defaultValue>
                  Selecionar
                </option>
                {city.map((city, index) => {
                  return (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>

            <label
              htmlFor="input-button"
              id="label-input"
              className={isSelectedCity === '#' ? 'disabledLabel' : ''}
            >
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
          disabled={isSelectedCity === '#'}
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
              navigate('/error-pending');
            }}
          >
            Entendi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonFilePendente;
